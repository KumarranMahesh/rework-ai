import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Zap, MessageCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 text-center lg:text-left"
            >
                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide mb-6">
                REIMAGINE YOUR RETURN
                </div>
                <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.1] text-slate-900 mb-6">
                Your Career Gap is a <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Growth Strategy.
                </span>
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                ReWorkAI uses intelligent algorithms to translate your life experience into market-ready skills, matching you with employers who value potential over timeline continuity.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                {/* UPDATE THIS BUTTON */}
                <Link to="/analyze" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group">
                    Analyze My Skills
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold hover:bg-slate-50 transition-all">
                    View Demo
                </button>
                </div>

                <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="user" />
                    </div>
                    ))}
                </div>
                <p>Trusted by 2,000+ returners</p>
                </div>
            </motion.div>

            {/* Right Visual - The "App Preview" in Bento Style */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full relative"
            >
                <div className="relative z-10 grid grid-cols-2 gap-4">
                
                {/* Card 1: Skill Analysis */}
                <div className="glass-card p-6 rounded-3xl col-span-2 transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Zap size={20} /></div>
                    <h3 className="font-display font-bold text-slate-800">Skill Gap Detected</h3>
                    </div>
                    <div className="space-y-3">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-blue-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                        <span>Excel Mastery</span>
                        <span>85% (Great!)</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[30%] bg-orange-400 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                        <span>Power BI</span>
                        <span className="text-orange-500">Recommended Course</span>
                    </div>
                    </div>
                </div>

                {/* Card 2: Job Match */}
                <div className="glass-card p-6 rounded-3xl col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 text-white transform translate-y-8 hover:-translate-y-1 transition-transform duration-300">
                    <div className="mb-4 opacity-80"><Search size={20} /></div>
                    <div className="text-3xl font-display font-bold mb-1">94%</div>
                    <div className="text-sm opacity-90">Match Score</div>
                    <div className="mt-4 text-xs bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    Role: Data Analyst
                    </div>
                </div>

                {/* Card 3: Mentor Nudge */}
                <div className="glass-card p-6 rounded-3xl col-span-1 transform translate-y-4 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><MessageCircle size={20} /></div>
                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">NOW</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700 leading-snug">
                    "Don't worry about the gap. Your project management experience is gold."
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-300 overflow-hidden">
                        <img src="https://i.pravatar.cc/100?img=5" alt="mentor" />
                    </div>
                    <span className="text-xs text-slate-500">Sarah, AI Mentor</span>
                    </div>
                </div>

                </div>
                
                {/* Decorative blob behind cards */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 blur-3xl -z-10 rounded-full" />
            </motion.div>
            </div>
        </div>
        </section>
    );
};

export default Hero;