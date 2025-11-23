import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2 } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
        <div className="glass rounded-full px-6 py-4 flex items-center justify-between shadow-sm">
            <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg ...">
                <Flower2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                ReWork<span className="text-indigo-600">AI</span>
            </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#mentorship" className="hover:text-indigo-600 transition-colors">Mentorship</a>
            <a href="#stories" className="hover:text-indigo-600 transition-colors">Success Stories</a>
            </div>

            <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-indigo-600">
                Log in
            </Link>
            <Link to="/dashboard" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95">
                Get Started
            </Link>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;