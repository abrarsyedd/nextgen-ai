import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  BarChart2, 
  Cpu, 
  Globe, 
  Zap, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Menu, 
  X,
  Bot,
  Database,
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  Activity,
  Server,
  Code,
  Check,
  Lock,
  Loader2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- MOCK DATA ---
const MOCK_ANALYTICS = [
  { name: 'Jan', users: 4000, calls: 2400, latency: 120, revenue: 2400 },
  { name: 'Feb', users: 3000, calls: 1398, latency: 110, revenue: 2210 },
  { name: 'Mar', users: 2000, calls: 9800, latency: 90, revenue: 2290 },
  { name: 'Apr', users: 2780, calls: 3908, latency: 85, revenue: 2000 },
  { name: 'May', users: 1890, calls: 4800, latency: 95, revenue: 2181 },
  { name: 'Jun', users: 2390, calls: 3800, latency: 80, revenue: 2500 },
  { name: 'Jul', users: 3490, calls: 4300, latency: 75, revenue: 2100 },
];

const PIE_DATA = [
  { name: 'NLP', value: 400 },
  { name: 'Computer Vision', value: 300 },
  { name: 'Predictive', value: 300 },
  { name: 'Robotics', value: 200 },
];

const SOLUTIONS_DATA = [
  { id: 1, industry: 'Healthcare', title: 'AI-Driven Diagnostic Imaging', impact_metric: '98% Accuracy', description: 'Early detection of anomalies in X-ray and MRI scans using deep learning.' },
  { id: 2, industry: 'Finance', title: 'Real-Time Fraud Detection', impact_metric: '$50M Saved', description: 'Analyzing transaction patterns to block fraudulent activities instantly.' },
  { id: 3, industry: 'Retail', title: 'Hyper-Personalized Recommendations', impact_metric: '35% Sales Lift', description: 'Customer behavior modeling to suggest products they actually want.' },
  { id: 4, industry: 'Manufacturing', title: 'Predictive Maintenance Bots', impact_metric: '0% Downtime', description: 'IoT sensor analysis to predict machinery failure before it happens.' },
  { id: 5, industry: 'Logistics', title: 'Autonomous Route Optimization', impact_metric: '20% Fuel Cut', description: 'Dynamic routing based on traffic, weather, and vehicle load.' },
  { id: 6, industry: 'Customer Service', title: 'Sentient Support Agents', impact_metric: '24/7 Uptime', description: 'Handling complex queries with human-like empathy and speed.' },
];

const COLORS = ['#00ffaa', '#00cbd4', '#007b8f', '#004e5c'];

// --- COMPONENTS ---

const Navbar = ({ activePage, setPage, mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-teal-900/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.5)]">
            <BrainCircuit className="text-black w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-300 tracking-tighter">
            NextGen AI
          </span>
        </div>
        
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-8">
            {['Home', 'Chat', 'Services', 'Solutions', 'Analytics', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => setPage(item.toLowerCase())}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activePage === item.toLowerCase()
                    ? 'text-teal-400 bg-teal-900/20 shadow-[0_0_10px_rgba(45,212,191,0.2)]'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="-mr-2 flex md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-teal-400 hover:text-white">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </div>
    
    {mobileMenuOpen && (
      <div className="md:hidden bg-black border-b border-teal-900">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['Home', 'Chat', 'Services', 'Solutions', 'Analytics', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => { setPage(item.toLowerCase()); setMobileMenuOpen(false); }}
              className="text-gray-300 hover:text-teal-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    )}
  </nav>
);

// --- HOME PAGE (With Pricing & Features) ---
const Home = ({ setPage }) => (
  <div className="pt-20 min-h-screen overflow-hidden">
    
    {/* HERO SECTION */}
    <div className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block px-4 py-1 rounded-full border border-teal-500/30 bg-teal-900/10 mb-6 animate-bounce">
            <span className="text-teal-400 text-sm font-semibold tracking-wide uppercase">Evolution of Intelligence</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight mb-6">
            The Future is <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
            Autonomous
            </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
            Experience the next generation of artificial intelligence. 
            Generative, predictive, and infinitely scalable solutions for the enterprise of tomorrow.
        </p>
        <div className="flex justify-center gap-4">
            <button onClick={() => setPage('chat')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(45,212,191,0.6)] transition-all transform hover:scale-105 flex items-center gap-2">
            Launch AI <Zap size={20} />
            </button>
            <button onClick={() => setPage('solutions')} className="px-8 py-4 border border-teal-500/50 text-teal-400 font-bold rounded-full hover:bg-teal-900/20 transition-all">
            Explore Solutions
            </button>
        </div>
        </div>
    </div>

    {/* TRUSTED BY */}
    <div className="border-y border-gray-900 bg-black/50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-8">Trusted by 500+ Forward Thinking Companies</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 text-xl font-bold text-white"><Globe className="text-teal-500"/> GlobalTech</div>
                <div className="flex items-center gap-2 text-xl font-bold text-white"><Cpu className="text-cyan-500"/> CortexSystem</div>
                <div className="flex items-center gap-2 text-xl font-bold text-white"><Database className="text-blue-500"/> DataFlow</div>
                <div className="flex items-center gap-2 text-xl font-bold text-white"><Activity className="text-emerald-500"/> PulseHealth</div>
                <div className="flex items-center gap-2 text-xl font-bold text-white"><ShieldCheck className="text-purple-500"/> SecureNet</div>
            </div>
        </div>
    </div>

    {/* FEATURES GRID */}
    <div className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white">Why NextGen AI?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-teal-500/50 transition-all">
                    <div className="w-12 h-12 bg-teal-900/30 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="text-teal-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Lightning Fast Inference</h3>
                    <p className="text-gray-400">Our proprietary edge-computing nodes deliver sub-100ms latency worldwide.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-cyan-500/50 transition-all">
                    <div className="w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4">
                        <Lock className="text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Enterprise Grade Security</h3>
                    <p className="text-gray-400">SOC2 Type II certified. Your data is encrypted at rest and in transit.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all">
                    <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                        <Server className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Infinite Scalability</h3>
                    <p className="text-gray-400">Auto-scaling architecture handles millions of requests without breaking a sweat.</p>
                </div>
            </div>
        </div>
    </div>

    {/* PRICING SECTION */}
    <div className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent <span className="text-teal-400">Pricing</span></h2>
            <p className="text-gray-400">Start free, upgrade as you grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* STARTER */}
            <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 h-fit">
                <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                <div className="text-4xl font-bold text-white mb-6">$0 <span className="text-sm text-gray-500 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-400"><Check size={18} className="mr-2 text-teal-500"/> 10k Tokens / month</li>
                    <li className="flex items-center text-gray-400"><Check size={18} className="mr-2 text-teal-500"/> Basic Models (GPT-3.5 eq)</li>
                    <li className="flex items-center text-gray-400"><Check size={18} className="mr-2 text-teal-500"/> Community Support</li>
                </ul>
                <button className="w-full py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors">Get Started</button>
            </div>

            {/* PROFESSIONAL */}
            <div className="p-8 bg-black rounded-2xl border-2 border-teal-500 shadow-[0_0_30px_rgba(45,212,191,0.2)] transform scale-105 relative">
                <div className="absolute top-0 right-0 bg-teal-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase">Most Popular</div>
                <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                <div className="text-4xl font-bold text-white mb-6">$99 <span className="text-sm text-gray-500 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-white"><Check size={18} className="mr-2 text-teal-400"/> 1M Tokens / month</li>
                    <li className="flex items-center text-white"><Check size={18} className="mr-2 text-teal-400"/> Advanced Models (GPT-4 eq)</li>
                    <li className="flex items-center text-white"><Check size={18} className="mr-2 text-teal-400"/> Priority Email Support</li>
                    <li className="flex items-center text-white"><Check size={18} className="mr-2 text-teal-400"/> Fine-tuning Capability</li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-black font-bold hover:shadow-lg transition-all">Upgrade Now</button>
            </div>

            {/* ENTERPRISE */}
            <div className="p-8 bg-gray-900 rounded-2xl border border-gray-800 h-fit">
                <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-white mb-6">Custom</div>
                <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-gray-400"><Check size={18} className="mr-2 text-teal-500"/> Unlimited Tokens</li>
                    <li className="flex items-center text-gray-400"><Check size={18} className="mr-2 text-teal-500"/> Dedicated GPU Instances</li>
                    <li className="flex items-center text-gray-400"><Check size={18} className="mr-2 text-teal-500"/> 24/7 Phone Support</li>
                    <li className="flex items-center text-gray-400"><Check size={18} className="mr-2 text-teal-500"/> On-premise Deployment</li>
                </ul>
                <button className="w-full py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors">Contact Sales</button>
            </div>
        </div>
    </div>

    {/* CALL TO ACTION */}
    <div className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-teal-900/20 to-cyan-900/20 border border-teal-500/30 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your business?</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of developers and enterprises building the future with NextGen AI.</p>
                <button onClick={() => setPage('contact')} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                    Start Building Free
                </button>
            </div>
        </div>
    </div>

  </div>
);

// --- CHAT COMPONENT (REAL API + LOADING) ---
const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm NextGen AI. How can I assist you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            message: userMessage.text,
            userId: 1
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: data.response,
        isBot: true 
      }]);

    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Error: Unable to connect to the backend.", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 px-4 h-screen flex flex-col max-w-5xl mx-auto">
      <div className="flex-1 bg-gray-900/50 border border-gray-800 rounded-2xl p-6 overflow-y-auto mb-6 backdrop-blur-sm shadow-2xl">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex mb-4 ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
            {msg.isBot && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center mr-3 shadow-lg">
                <Bot size={16} className="text-black" />
              </div>
            )}
            <div className={`max-w-[70%] p-4 rounded-2xl ${
              msg.isBot 
                ? 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700' 
                : 'bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-tr-none shadow-[0_0_15px_rgba(45,212,191,0.2)]'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center mr-3 shadow-lg">
                    <Bot size={16} className="text-black" />
                </div>
                <div className="bg-gray-800 text-gray-200 rounded-2xl rounded-tl-none border border-gray-700 p-4 flex items-center">
                    <Loader2 className="animate-spin mr-2 text-teal-400" size={16} />
                    Thinking...
                </div>
            </div>
        )}
      </div>
      <div className="mb-6 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
          placeholder={isLoading ? "Waiting for response..." : "Ask NextGen anything..."}
          className="w-full bg-gray-900 text-white border border-teal-900/50 rounded-full py-4 px-6 pr-16 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all disabled:opacity-50"
        />
        <button onClick={handleSend} disabled={isLoading} className="absolute right-2 top-2 bg-teal-500 p-2 rounded-full hover:bg-teal-400 transition-colors disabled:opacity-50">
          <ArrowRight className="text-black" />
        </button>
      </div>
    </div>
  );
};

const Services = () => (
  <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white mb-4">Our <span className="text-teal-400">Services</span></h2>
      <p className="text-gray-400">Enterprise-grade AI capabilities accessible via simple APIs.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "Natural Language", icon: MessageSquare, desc: "Advanced LLMs capable of reasoning, summarization, and creative writing." },
        { title: "Computer Vision", icon: Zap, desc: "Real-time object detection and facial recognition systems for security." },
        { title: "Predictive Analytics", icon: BarChart2, desc: "Turn raw data into actionable future insights using regression models." },
        { title: "Neural Translation", icon: Globe, desc: "Instant, culturally aware translation across 100+ languages." },
        { title: "Robotic Automation", icon: Cpu, desc: "AI agents that can control software and hardware interfaces autonomously." },
        { title: "Data Synthesis", icon: Database, desc: "Generate high-fidelity synthetic datasets for training privacy-sensitive models." }
      ].map((service, idx) => (
        <div key={idx} className="group p-8 bg-gray-900/50 border border-gray-800 hover:border-teal-500/50 rounded-2xl transition-all hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(45,212,191,0.1)]">
          <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors">
            <service.icon className="text-teal-400 w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
          <p className="text-gray-400 leading-relaxed">{service.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const Solutions = () => (
  <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
    <div className="mb-16 text-center">
      <h2 className="text-5xl font-bold text-white mb-6">Industry <span className="text-cyan-400">Solutions</span></h2>
      <p className="text-gray-400 text-xl max-w-3xl mx-auto">
        We don't just build models; we solve industry-specific problems. 
        Explore our database of proven success stories and implementation metrics.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {SOLUTIONS_DATA.map((solution) => (
        <div key={solution.id} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative p-8 bg-black border border-gray-800 rounded-2xl h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-900/30 text-teal-300 border border-teal-500/20">
                {solution.industry}
              </span>
              <TrendingUp className="text-gray-600 group-hover:text-teal-400 transition-colors" size={20} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-teal-50 transition-colors">
              {solution.title}
            </h3>
            
            <p className="text-gray-400 mb-6 flex-grow">
              {solution.description}
            </p>
            
            <div className="border-t border-gray-800 pt-6 mt-auto flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Impact Metric</p>
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                  {solution.impact_metric}
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                <ArrowRight className="text-teal-500 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-20 bg-gray-900/50 border border-gray-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 backdrop-blur-sm">
      <div className="flex-1">
        <h3 className="text-3xl font-bold text-white mb-4">Ready to deploy?</h3>
        <p className="text-gray-400 text-lg mb-6">
          Our solution architects can help you integrate these models into your existing infrastructure in less than 48 hours.
        </p>
        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-teal-50 transition-colors flex items-center gap-2">
          Book Consultation <ArrowRight size={18} />
        </button>
      </div>
      <div className="flex-1 flex gap-4">
        <div className="flex-1 bg-black p-6 rounded-2xl border border-gray-800 text-center">
          <ShieldCheck className="text-teal-500 mx-auto mb-3" size={32} />
          <div className="text-2xl font-bold text-white">ISO 27001</div>
          <div className="text-sm text-gray-500">Certified Security</div>
        </div>
        <div className="flex-1 bg-black p-6 rounded-2xl border border-gray-800 text-center transform translate-y-4">
          <Server className="text-cyan-500 mx-auto mb-3" size={32} />
          <div className="text-2xl font-bold text-white">99.99%</div>
          <div className="text-sm text-gray-500">SLA Uptime</div>
        </div>
      </div>
    </div>
  </div>
);

// --- ANALYTICS (FIXED 2-COL LAYOUT) ---
const Analytics = () => (
  <div className="pt-24 px-4 max-w-[90rem] mx-auto min-h-screen">
    <div className="mb-10 flex justify-between items-end">
      <div>
        <h2 className="text-4xl font-bold text-white">System <span className="text-teal-400">Analytics</span></h2>
        <p className="text-gray-400 mt-2">Real-time monitoring of your AI infrastructure.</p>
      </div>
      <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
        <Activity size={16} /> Live Status
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
      
      {/* GRAPH 1 */}
      <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 shadow-xl">
        <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
          <Users size={16} className="text-teal-400" /> User Growth
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_ANALYTICS}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" fontSize={10} />
              <YAxis stroke="#666" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff', fontSize: '12px' }} />
              <Area type="monotone" dataKey="users" stroke="#2dd4bf" fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRAPH 2 */}
      <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 shadow-xl">
        <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
          <Zap size={16} className="text-teal-400" /> Latency (ms)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_ANALYTICS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" fontSize={10} />
              <YAxis stroke="#666" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff', fontSize: '12px' }} />
              <Line type="monotone" dataKey="latency" stroke="#f472b6" strokeWidth={3} dot={{r: 3}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 1 */}
      <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 shadow-xl">
        <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-teal-400" /> Revenue
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_ANALYTICS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" fontSize={10} />
              <YAxis stroke="#666" fontSize={10} />
              <Tooltip cursor={{fill: '#222'}} contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2 */}
      <div className="bg-gray-900/60 p-5 rounded-2xl border border-gray-800 shadow-xl">
        <h3 className="text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
          <Code size={16} className="text-teal-400" /> Usage Split
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {PIE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  </div>
);

const About = () => (
  <div className="pt-24 px-4 max-w-5xl mx-auto min-h-screen">
    <div className="text-center mb-20">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
        Pioneering the <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
          Intelligence Age
        </span>
      </h1>
      <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
        NextGen AI was founded in 2025 with a singular, audacious mission: to democratize access to Artificial General Intelligence. 
        We believe in a future where silicon and carbon intelligence coexist to solve humanity's greatest challenges, from curing diseases to exploring the stars.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
      {[
        { label: 'Engineers', value: '500+' },
        { label: 'Patents', value: '120' },
        { label: 'Global Offices', value: '12' },
        { label: 'Uptime', value: '99.9%' }
      ].map((stat, idx) => (
        <div key={idx} className="p-6 border border-teal-500/20 rounded-2xl bg-teal-900/5 text-center">
          <h4 className="text-3xl font-bold text-white mb-2">{stat.value}</h4>
          <span className="text-teal-400 text-sm uppercase tracking-wider">{stat.label}</span>
        </div>
      ))}
    </div>

    <div className="space-y-20">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-white mb-6">Our Origins</h3>
          <p className="text-gray-400 leading-loose text-lg">
             It started in a small garage in Silicon Valley, where a team of three neuroscientists and two ML engineers asked a simple question: "What if machines could dream?"
             <br/><br/>
             Five years later, NextGen AI has evolved from a research project into a global powerhouse. We moved beyond simple pattern recognition to true cognitive reasoning. 
             Our proprietary "Neural-Synapse" architecture mimics the plasticity of the human brain, allowing our models to learn with 100x less data than traditional transformers.
          </p>
        </div>
        <div className="flex-1 bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-3xl h-80 flex items-center justify-center">
          <BrainCircuit size={120} className="text-teal-500/20 animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center gap-12">
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-white mb-6">Ethical AI First</h3>
          <p className="text-gray-400 leading-loose text-lg">
             We don't just build powerful AI; we build safe AI. The "NextGen Safety Protocol" is our commitment to transparency and alignment. 
             Every model we release undergoes 5,000 hours of adversarial testing to ensure it adheres to human values.
             <br/><br/>
             We are the first AI company to implement a "Kill-Switch" protocol at the kernel level, ensuring that human operators always maintain ultimate control over autonomous agents.
          </p>
        </div>
        <div className="flex-1 bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-3xl h-80 flex items-center justify-center">
          <ShieldCheck size={120} className="text-cyan-500/20" />
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-white mb-10 text-center">Our Leadership</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              name: "Abrar Syed", 
              role: "CEO & Founder", 
              bio: "Former Lead AI Researcher at DeepMind.",
              // Change this to your local path
              image: "/images/abrar.jpg" 
            },
            { 
              name: "James Sterling", 
              role: "CTO", 
              bio: "Pioneer of the transformer-XL architecture.",
              // Change this to your local path
              image: "/images/james.jpg"
            },
            { 
              name: "Elena Rodriguez", 
              role: "Head of Ethics", 
              bio: "PhD in Philosophy and Computational Logic.",
              // Change this to your local path
              image: "/images/elena.jpg"
            }
          ].map((leader, idx) => (
            <div key={idx} className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-teal-500/50 transition-colors text-center group">
              <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-6 overflow-hidden border-2 border-transparent group-hover:border-teal-500 transition-all">
                <img 
                  src={leader.image} 
                  // Add an onError fallback in case the file isn't found yet
                  onError={(e) => {e.target.src = 'https://via.placeholder.com/150?text=User'}}
                  alt={leader.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h4 className="text-xl font-bold text-white">{leader.name}</h4>
              <p className="text-teal-400 text-sm mb-3">{leader.role}</p>
              <p className="text-gray-500 text-sm">{leader.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="pt-24 px-4 max-w-2xl mx-auto min-h-screen">
     <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
       <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
       <p className="text-gray-400 mb-8">Ready to start your AI journey? Send us a message.</p>
       
       <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
         <div>
           <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
           <input type="text" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none" />
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
           <input type="email" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none" />
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
           <textarea rows="4" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"></textarea>
         </div>
         <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-black font-bold py-4 rounded-lg hover:opacity-90 transition-opacity">
           Send Message
         </button>
       </form>
     </div>
  </div>
);

const Footer = ({ setPage }) => (
  <footer className="border-t border-gray-900 bg-black py-12 mt-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <span className="text-xl font-bold text-white flex items-center gap-2">
          <BrainCircuit className="text-teal-400" /> NextGen AI
        </span>
        <p className="text-gray-600 text-sm mt-2">© 2025 NextGen AI Inc. All rights reserved.</p>
      </div>
      <div className="flex space-x-6">
        {['Privacy', 'Terms', 'Contact'].map(item => (
          <a key={item} href="#" className="text-gray-500 hover:text-teal-400 text-sm transition-colors">{item}</a>
        ))}
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT (With LocalStorage Persistence) ---

const App = () => {
  // FIX 1: Initialize state from localStorage (or default to 'home')
  const [activePage, setPage] = useState(() => {
    return localStorage.getItem('nextgen_active_page') || 'home';
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FIX 2: Save to localStorage whenever the page changes
  useEffect(() => {
    localStorage.setItem('nextgen_active_page', activePage);
    // Optional: Scroll to top when page changes
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <Home setPage={setPage} />;
      case 'chat': return <Chat />;
      case 'services': return <Services />;
      case 'solutions': return <Solutions />;
      case 'analytics': return <Analytics />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-teal-500 selection:text-black">
      <Navbar 
        activePage={activePage} 
        setPage={setPage} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      {/* Added key to force re-render animation on page change */}
      <main key={activePage} className="animate-in fade-in duration-500">
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
    </div>
  );
};

export default App;