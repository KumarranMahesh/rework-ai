import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To support "Log Out" or navigation
import DashboardLayout from '../DashboardLayout';
import config from '../../config'; // Import your API config
import { Send, Smile, User, Bot, BarChart2, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi Priya! I'm Kai. I'm analyzing your responses in real-time to help you stay confident. How are you feeling about your progress today?", sender: "bot", sentiment: "neutral" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    
    // Real-time Sentiment State
    const [sentimentData, setSentimentData] = useState({
        score: 0,
        mood: 'Neutral',
        confidence: 72, // baseline
        stress: 12      // baseline
    });

    const scrollRef = useRef(null);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // 1. Add User Message immediately
        const userMsg = { id: Date.now(), text: input, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
        // 2. Call the REAL Backend API
        const response = await axios.post(`${config.API_URL}/api/analyze-sentiment`, {
            text: userMsg.text
        });

        const { mood, score, advice } = response.data;

        // 3. Update the Dashboard Visuals based on real data
        // We simulate "Confidence" moving based on the sentiment score
        setSentimentData(prev => ({
            score: score,
            mood: mood,
            confidence: Math.min(100, Math.max(0, prev.confidence + (score * 5))), // Dynamic adjustment
            stress: Math.min(100, Math.max(0, prev.stress - (score * 5)))
        }));

        // 4. Generate AI Response
        setTimeout(() => {
            const botResponse = {
            id: Date.now() + 1,
            sender: "bot",
            sentiment: mood.toLowerCase(), // 'positive', 'negative', 'neutral'
            text: advice // The backend tells us what to say!
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000); // Slight delay for realism

        } catch (error) {
        console.error("Sentiment Analysis Failed", error);
        setIsTyping(false);
        }
    };

    // Helper to pick color based on current mood
    const getMoodColor = () => {
        if (sentimentData.mood === 'Positive') return 'text-green-500';
        if (sentimentData.mood === 'Negative') return 'text-pink-500';
        return 'text-indigo-500'; // Neutral
    };

    const getMoodGradient = () => {
        if (sentimentData.mood === 'Positive') return 'from-green-400 to-emerald-600';
        if (sentimentData.mood === 'Negative') return 'from-pink-500 to-rose-600';
        return 'from-indigo-400 to-purple-600';
    };

    return (
        <DashboardLayout>
        <div className="h-[calc(100vh-140px)] flex gap-6">
            
            {/* LEFT: Chat Area */}
            <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Bot className="text-indigo-600" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                    <h3 className="font-display font-bold text-slate-900">Kai (AI Mentor)</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Activity size={12} className="text-indigo-500" /> 
                    Analyzing Tone...
                    </p>
                </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50" ref={scrollRef}>
                {messages.map((msg) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-slate-200' : 'bg-indigo-100'}`}>
                    {msg.sender === 'user' ? <User size={18} className="text-slate-600" /> : <Bot size={18} className="text-indigo-600" />}
                    </div>
                    
                    <div className={`max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed
                    ${msg.sender === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-600 rounded-tl-none shadow-sm'}
                    ${msg.sentiment === 'negative' ? 'border-l-4 border-l-pink-400' : ''}
                    `}>
                    {msg.text}
                    </div>
                </motion.div>
                ))}
                {isTyping && (
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0"><Bot size={18} className="text-indigo-600" /></div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 m-4 mt-0 bg-white rounded-2xl border border-slate-200 flex items-center gap-4 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-lg shadow-slate-200/50">
                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"><Smile size={20} /></button>
                <input 
                type="text" 
                className="flex-1 bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                onClick={handleSend}
                className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!input.trim()}
                >
                <Send size={18} />
                </button>
            </div>
            </div>

            {/* RIGHT: Live Sentiment Viz */}
            <div className="w-80 hidden xl:flex flex-col gap-6">
            {/* The Neo-Gauge Card */}
            <div className="glass-card p-6 rounded-3xl flex-1 relative overflow-hidden flex flex-col justify-center">
                
                {/* Dynamic Background Mesh */}
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${getMoodGradient()} transition-all duration-1000`}></div>
                
                <h3 className="font-display font-bold text-slate-800 mb-8 flex items-center gap-2">
                <Zap size={18} className={getMoodColor()} /> Real-Time Analysis
                </h3>
                
                {/* The Animated Gauge */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
                
                {/* Inner Spinner (Visualizing Processing) */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-2 border-dashed border-slate-200 rounded-full"
                />

                {/* Mood Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div 
                    key={sentimentData.mood} // Triggers animation on change
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`text-4xl font-display font-bold ${getMoodColor()}`}
                    >
                    {sentimentData.mood}
                    </motion.div>
                    <p className="text-xs text-slate-400 mt-1 font-medium uppercase tracking-wider">Current Tone</p>
                </div>
                </div>

                {/* Data Bars */}
                <div className="space-y-5">
                <div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Confidence Index</span>
                    <span>{Math.round(sentimentData.confidence)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${sentimentData.confidence}%` }}
                        className="h-full bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                    />
                    </div>
                </div>
                
                <div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Detected Stress</span>
                    <span>{Math.round(sentimentData.stress)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${sentimentData.stress}%` }}
                        className="h-full bg-pink-400 rounded-full shadow-[0_0_10px_rgba(244,114,182,0.5)]"
                    />
                    </div>
                </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed">
                <span className="font-bold text-slate-700">AI Note:</span> Changes in syntax and word choice are analyzed to predict your interview readiness.
                </div>

            </div>
            </div>

        </div>
        </DashboardLayout>
    );
};

export default ChatInterface;