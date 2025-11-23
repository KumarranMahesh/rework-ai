import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronRight, BarChart2, Loader2, ArrowRight } from 'lucide-react';
import config from '../config';

const SkillAnalysis = () => {
    const [formData, setFormData] = useState({ role: '', skills: '' });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Simulate network delay for effect
        setTimeout(async () => {
        try {
            const skillsArray = formData.skills.split(',').map(s => s.trim());
            const response = await axios.post(`${config.API_URL}/api/analyze-skills`, {
            role: formData.role,
            currentSkills: skillsArray
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error analyzing skills", error);
        } finally {
            setLoading(false);
        }
        }, 1500);
    };

    return (
        <section className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">
            The <span className="text-indigo-600">Gap Bridge</span> Engine
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
            Input your target and your history. Our AI maps the specific bridge you need to cross to get hired.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: Input Form */}
            <div className="lg:col-span-5">
            <div className="glass-card p-8 rounded-3xl sticky top-32">
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Target Role</label>
                    <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                    >
                    <option value="" disabled>Select a role...</option>
                    <option value="data-analyst">Data Analyst</option>
                    <option value="ux-designer">UX Designer</option>
                    <option value="digital-marketer">Digital Marketer</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Current Skills</label>
                    <textarea 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[120px]"
                    placeholder="e.g. Excel, Communication, Project Management..."
                    value={formData.skills}
                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    required
                    />
                    <p className="text-xs text-slate-400 mt-2">Tip: Comma separated values.</p>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Analyze Gaps'}
                    {!loading && <ChevronRight />}
                </button>
                </form>
            </div>
            </div>

            {/* RIGHT: Analysis Results */}
            <div className="lg:col-span-7 min-h-[400px]">
            <AnimatePresence>
                {!result && !loading && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-3xl p-10"
                >
                    <BarChart2 size={64} className="mb-4 text-slate-200" />
                    <p className="font-display text-xl">Waiting for data...</p>
                </motion.div>
                )}

                {loading && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center"
                >
                    <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Scanning Market Data...</p>
                    </div>
                </motion.div>
                )}

                {result && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Score Header */}
                    <div className="p-6 rounded-2xl flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-200/50 relative overflow-hidden">
                    {/* Optional: Add a subtle decoration to make it pop even more */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <p className="text-indigo-100 text-sm font-medium mb-1">Overall Match Score</p>
                            <h3 className="text-4xl font-display font-bold">{result.matchScore}%</h3>
                        </div>
                        <div className="text-right relative z-10">
                            <p className="text-indigo-100 text-xs uppercase tracking-wider font-bold mb-1">Salary Potential</p>
                            <p className="text-2xl font-bold">{result.marketData.salary}</p>
                            <span className="inline-block bg-green-400/20 text-green-100 text-xs px-2 py-1 rounded-full border border-green-400/30">
                                {result.marketData.growth} Growth
                            </span>
                        </div>
                    </div>

                    {/* Skill List */}
                    <div className="space-y-3">
                    {result.skillAnalysis.map((item, index) => (
                        <motion.div 
                        key={item.skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                        >
                        <div className={`p-3 rounded-xl ${item.status === 'acquired' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                            {item.status === 'acquired' ? <CheckCircle size={24} /> : <XCircle size={24} />}
                        </div>
                        
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                            <h4 className="font-bold text-slate-800">{item.skill}</h4>
                            <span className={`text-sm font-medium ${item.status === 'acquired' ? 'text-green-600' : 'text-orange-500'}`}>
                                {item.status === 'acquired' ? 'Mastered' : 'Gap Detected'}
                            </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.score}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full rounded-full ${item.status === 'acquired' ? 'bg-green-500' : 'bg-orange-400'}`}
                            />
                            </div>

                            {item.recommendation && (
                            <div className="mt-3 flex items-center justify-between bg-orange-50 p-3 rounded-lg border border-orange-100">
                                <p className="text-xs text-orange-700 font-medium">
                                {item.recommendation}
                                </p>
                                <button className="text-xs bg-white text-orange-600 px-3 py-1.5 rounded-md border border-orange-200 font-bold hover:bg-orange-50 transition-colors flex items-center gap-1">
                                Start <ArrowRight size={12} />
                                </button>
                            </div>
                            )}
                        </div>
                        </motion.div>
                    ))}
                    </div>

                </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>
        </section>
    );
};

export default SkillAnalysis;