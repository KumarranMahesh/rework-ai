import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import ModuleCard from './LearningPath';
import { TrendingUp, Briefcase, Bell } from 'lucide-react';
import config from '../config';

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch mock data
        axios.get(`${config.API_URL}/api/dashboard/1`)
        .then(res => setData(res.data));
    }, []);

    if (!data) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div></div>;

    return (
        <DashboardLayout>
        <header className="flex justify-between items-end mb-10">
            <div>
            <h1 className="font-display text-3xl font-bold text-slate-900">Welcome back, {data.user.name} 👋</h1>
            <p className="text-slate-500">You are on track to become a <span className="font-semibold text-indigo-600">{data.user.role}</span>.</p>
            </div>
            <div className="hidden sm:block text-right">
            <p className="text-sm text-slate-400 font-medium">Current Match Score</p>
            <div className="text-4xl font-display font-bold text-indigo-600">{data.stats.matchScore}%</div>
            </div>
        </header>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COL 1 & 2: Main Learning Path */}
            <div className="lg:col-span-2 space-y-8">
            
            {/* Mentor Nudge Widget */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
                <div className="relative z-10 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                    <Bell size={20} />
                </div>
                <div>
                    <p className="font-medium text-indigo-50 text-sm mb-1">{data.mentorNudge.author} says:</p>
                    <p className="font-display text-lg font-bold leading-snug">"{data.mentorNudge.text}"</p>
                </div>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            </div>

            {/* Learning Path Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp size={20} className="text-indigo-600" /> Your Bridge Path
                </h2>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Level 2</span>
                </div>
                
                <div className="bg-white/50 border border-white p-6 rounded-3xl shadow-sm">
                {data.learningPath.map((module, idx) => (
                    <ModuleCard key={module.id} module={module} index={idx} />
                ))}
                </div>
            </div>
            </div>

            {/* COL 3: Side Widgets (Jobs) */}
            <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h2 className="font-display text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-pink-500" /> Job Pulse
                </h2>
                
                <div className="space-y-4">
                {data.jobMatches.map(job => (
                    <div key={job.id} className="group p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-white">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center">
                        {/* Placeholder for Logo */}
                        <span className="font-bold text-slate-800 text-xs">{job.company[0]}</span>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${job.match >= 70 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {job.match}% Match
                        </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{job.role}</h3>
                    <p className="text-xs text-slate-500 mb-3">{job.company}</p>
                    <div className="flex flex-wrap gap-2">
                        {job.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                            {tag}
                        </span>
                        ))}
                    </div>
                    </div>
                ))}
                </div>
                
                <button className="w-full mt-4 py-3 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors">
                View All Opportunities
                </button>
            </div>
            </div>

        </div>
        </DashboardLayout>
    );
};

export default Dashboard;