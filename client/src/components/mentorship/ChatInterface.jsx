import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Send, Smile, User, Bot, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi Priya! I noticed you completed the Excel module. How are you feeling about starting SQL today?", sender: "bot", sentiment: "neutral" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Add User Message
        const userMsg = { id: Date.now(), text: input, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI Response & Sentiment Analysis
        setTimeout(() => {
        const isNegative = userMsg.text.toLowerCase().match(/(hard|scared|can't|tough|fail)/);
        
        let botResponse = {
            id: Date.now() + 1,
            sender: "bot",
            sentiment: isNegative ? "empathetic" : "positive",
            text: isNegative 
            ? "I hear you. It's completely normal to feel that way when learning syntax. Remember, 89% of our returners felt the same way at this stage. Let's break it down into small steps." 
            : "That's the spirit! Your confidence is tracking 20% higher than last week. Let's keep this momentum going!"
        };

        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
        }, 1500);
    };

    return (
        <DashboardLayout>
        <div className="h-[calc(100vh-140px)] flex gap-6">
            
            {/* Main Chat Area */}
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
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
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
                    ${msg.sentiment === 'empathetic' ? 'border-l-4 border-l-pink-400' : ''}
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

            {/* Right Panel: Sentiment Analysis Viz */}
            <div className="w-80 hidden xl:flex flex-col gap-6">
            {/* Emotion Detection Card */}
            <div className="glass-card p-6 rounded-3xl flex-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-indigo-500 to-green-500"></div>
                <h3 className="font-display font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart2 size={18} className="text-indigo-500" /> Live Sentiment
                </h3>
                
                <div className="space-y-6 text-center">
                <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
                    {/* Decorative Circles */}
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin duration-[3s]"></div>
                    <div className="text-3xl font-bold text-slate-800">Neutral</div>
                </div>
                <p className="text-sm text-slate-500">
                    Kai is analyzing your tone to adjust the mentorship style in real-time.
                </p>
                </div>

                <div className="mt-8 space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Confidence</span>
                    <span>72%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-green-400 rounded-full"></div>
                </div>
                
                <div className="flex justify-between text-xs font-bold text-slate-500 mt-4">
                    <span>Stress Level</span>
                    <span>12%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[12%] bg-blue-400 rounded-full"></div>
                </div>
                </div>
            </div>
            </div>

        </div>
        </DashboardLayout>
    );
};

export default ChatInterface;