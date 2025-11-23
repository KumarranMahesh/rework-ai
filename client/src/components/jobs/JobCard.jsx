import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Clock, ChevronRight, Star } from 'lucide-react';

const JobCard = ({ job, onApply }) => {
    return (
        <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all group relative overflow-hidden"
        >
        {/* Match Score Badge - Absolute Position */}
        <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl font-bold text-sm flex items-center gap-1
            ${job.matchScore >= 90 ? 'bg-indigo-600 text-white' : 
            job.matchScore >= 75 ? 'bg-teal-500 text-white' : 'bg-orange-400 text-white'}`}>
            <Star size={14} fill="currentColor" />
            {job.matchScore}% Match
        </div>

        <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-bold text-slate-700">
            {job.company[0]}
            </div>
            <div>
            <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {job.title}
            </h3>
            <p className="text-slate-500 font-medium">{job.company}</p>
            </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
            <MapPin size={14} /> {job.location}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
            <Briefcase size={14} /> {job.type}
            </div>
            {job.returnerFriendly && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1.5 rounded-full">
                <Clock size={14} /> Returner Friendly
            </div>
            )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
            <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Salary Range</p>
            <p className="font-bold text-slate-700">{job.salary}</p>
            </div>
            <button 
            onClick={() => onApply(job)}
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-colors flex items-center gap-2"
            >
            Apply Now <ChevronRight size={16} />
            </button>
        </div>
        </motion.div>
    );
};

export default JobCard;