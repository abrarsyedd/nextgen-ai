const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai"); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Configuration ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Keep using 2.5 Flash, but we will add retry logic
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// --- Database Connection ---
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'nextgen_ai',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- Helper: Retry Logic for AI ---
async function generateWithRetry(prompt, retries = 3, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            // Check if it's a 503 (Overloaded) error
            if (error.message.includes("503") && i < retries - 1) {
                console.log(`⚠️ Model overloaded. Retrying in ${delay/1000}s... (Attempt ${i + 1}/${retries})`);
                await new Promise(res => setTimeout(res, delay));
                delay *= 2; // Exponential backoff (wait longer each time)
            } else {
                throw error; // If it's not a 503, or we ran out of retries, fail.
            }
        }
    }
}

// --- 1. Chat API ---
app.post('/api/chat', async (req, res) => {
    const { message, userId } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    console.log(`User ${userId} sent: ${message}`);

    try {
        // Step A: Save USER message
        await new Promise((resolve, reject) => {
            db.query('INSERT INTO chat_history (user_id, message, is_bot) VALUES (?, ?, ?)', 
            [userId, message, false], (err) => {
                if (err) reject(err); else resolve();
            });
        });

        // Step B: Call Gemini API (With Retry)
        let botResponseText = "";
        
        if (process.env.GEMINI_API_KEY) {
            try {
                console.log("Sending request to Gemini...");
                botResponseText = await generateWithRetry(message);
                console.log("Gemini responded successfully.");
            } catch (apiError) {
                console.error("Gemini API Failed after retries:", apiError.message);
                botResponseText = "I'm currently experiencing high traffic. Please try again in a moment.";
            }
        } else {
            botResponseText = "Simulated Response: No API Key found.";
        }

        // Step C: Save BOT response
        db.query('INSERT INTO chat_history (user_id, message, is_bot) VALUES (?, ?, ?)', 
        [userId, botResponseText, true], (err) => {
            if (err) console.error("DB Error:", err);
            res.json({ response: botResponseText });
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// --- Other APIs (Keep existing ones) ---
app.get('/api/services', (req, res) => { db.query('SELECT * FROM services', (e, r) => res.json(e ? [] : r)); });
app.get('/api/solutions', (req, res) => { db.query('SELECT * FROM solutions', (e, r) => res.json(e ? [] : r)); });
app.get('/api/analytics', (req, res) => { db.query('SELECT * FROM analytics_data', (e, r) => res.json(e ? [] : r)); });
app.post('/api/contact', (req, res) => { 
    const { name, email, message } = req.body;
    db.query('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)', [name, email, message], (e, r) => {
        res.json({ success: !e });
    }); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(process.env.GEMINI_API_KEY ? "Mode: Connected to (Gemini 2.5 Flash)" : "Mode: Simulated");
});