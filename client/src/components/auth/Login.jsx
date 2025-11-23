import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Mail, Lock } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
        {/* Visual Side */}
        <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12 text-white">
            <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[100px]" />
            </div>
            
            <div className="relative z-10 max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                <Sparkles size={16} className="text-indigo-400" />
                <span className="text-sm font-medium">AI-Powered Career Returns</span>
            </div>
            <h1 className="font-display text-5xl font-bold mb-6 leading-tight">
                Welcome back to your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">future.</span>
            </h1>
            <p className="text-slate-400 text-lg">
                Your gap is not a stop sign. It's a pivot point. Log in to access your personalized learning bridge.
            </p>
            </div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
            <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-md space-y-8"
            >
            <div className="text-center lg:text-left">
                <h2 className="font-display text-3xl font-bold text-slate-900">Sign in</h2>
                <p className="text-slate-500 mt-2">Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Join free</Link></p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                    <input type="email" placeholder="you@example.com" className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                </div>
                </div>

                <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                    <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                </div>
                <div className="text-right">
                    <a href="#" className="text-xs font-bold text-slate-500 hover:text-indigo-600">Forgot password?</a>
                </div>
                </div>

                <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                {loading ? 'Signing in...' : 'Sign In'} 
                {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />}
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-slate-50 text-slate-400">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-white hover:shadow-md transition-all font-medium text-slate-600 bg-white">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" /> Google
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl hover:bg-white hover:shadow-md transition-all font-medium text-slate-600 bg-white">
                <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="w-5 h-5" alt="LinkedIn" /> LinkedIn
                </button>
            </div>
            </motion.div>
        </div>
        </div>
    );
};

export default Login;