# NextGen AI: Autonomous Intelligence Platform

This project implements a web application showcasing various Artificial Intelligence capabilities, including an interactive AI chat, diverse AI services, industry-specific solutions, and real-time analytics. The application is built with a decoupled frontend and backend, orchestrated using Docker Compose for local development and deployed via a Jenkins CI/CD pipeline.

## 📁 Project Structure

```
nextgen-ai/
├── backend/          # API services for AI model interaction
├── db/               # Database configuration and storage
├── frontend/         # React app (UI)
├── Jenkinsfile       # CI/CD pipeline
└── docker-compose.yml
```

## 🛠 Technologies Used

- **Frontend:** React, Tailwind CSS, Lucide React, Recharts  
- **Backend:** Node.js / Express.js  
- **Database:** MySQL  
- **AI Integration:** Google Gemini API  
- **Containerization:** Docker, Docker Compose  
- **CI/CD:** Jenkins  

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone [YOUR_REPOSITORY_URL]
cd nextgen-ai
```

### 2. Environment Configuration

Create a `.env` file inside `backend/`:

```
PORT=5000

DB_HOST=db
DB_USER=db_user
DB_PASSWORD=db_password
DB_NAME=nextgen_ai
MYSQL_ROOT_PASSWORD=root_password

VITE_API_TARGET=http://backend:5000
GEMINI_API_KEY=PLACE_YOU_GEMINI_API_KEY
```

### Important Notes
- Replace **PLACE_YOU_GEMINI_API_KEY** with your real key.
- `DB_HOST=db` and internal URLs are configured for Docker Compose networking.

---

## 🐳 Local Development with Docker Compose

To build and run all services:

```bash
docker compose -p nextgen-ai-app up -d --build
```

### Flags:
- `-d` → run in background  
- `--build` → rebuild images  
- `-p nextgen-ai-app` → assign project name  

---

## 🌐 Accessing the Application

| Service | URL |
|--------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |

Internal frontend → backend communication uses:  
`http://backend:5000`

---

# 🔧 CI/CD with Jenkins

This project includes an automated deployment pipeline.

## 1. Jenkins Setup
Ensure Jenkins has:
- Docker installed  
- Permission to run Docker commands  

## 2. Add .env to Jenkins Credentials

Upload your backend `.env` file as a **Secret file**:

- Dashboard → Manage Jenkins → Manage Credentials  
- Add Credentials → **Secret file**  
- ID: `backend-env`  
- Upload the file  

## 3. Jenkins Pipeline Stages

- **Checkout** repository  
- **Restore Environment** via `backend-env`  
- **Build Frontend**  
- **Build Backend**  
- **Docker Build + Push**  
- **Deploy** using Docker Compose  

The Jenkinsfile uses `withCredentials` to place the `.env` file correctly.

---

# 🤝 Contributing

1. Fork  
2. Create feature branch  
3. Commit changes  
4. Open pull request  

---

# 📄 License

This project is open-source. See the `LICENSE` file for details.
