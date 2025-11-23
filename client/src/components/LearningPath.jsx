import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, PlayCircle, Code } from 'lucide-react';

const ModuleCard = ({ module, index }) => {
    const isCompleted = module.status === 'completed';
    const isLocked = module.status === 'locked';
    const isInProgress = module.status === 'in-progress';

    return (
        <div className="relative pl-12 pb-12 last:pb-0">
        {/* Timeline Line */}
        <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-slate-200 last:hidden" />
        
        {/* Status Node */}
        <div className={`absolute left-0 top-0 w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 bg-white transition-colors
            ${isCompleted ? 'border-green-500 text-green-500' : 
            isInProgress ? 'border-indigo-500 text-indigo-500' : 'border-slate-200 text-slate-300'}`}>
            {isCompleted ? <Check size={18} strokeWidth={3} /> : 
            isLocked ? <Lock size={16} /> : <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
        </div>

        {/* Card Content */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-5 rounded-2xl border transition-all hover:shadow-md
            ${isInProgress ? 'border-indigo-200 bg-white shadow-lg ring-1 ring-indigo-100' : 'border-white bg-white/60'}`}
        >
            <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Module 0{index + 1}</span>
            {isInProgress && <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">In Progress</span>}
            </div>
            
            <h3 className={`font-display font-bold text-lg mb-2 ${isLocked ? 'text-slate-400' : 'text-slate-800'}`}>
            {module.title}
            </h3>

            {isInProgress && (
            <div className="mt-4">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Progress</span>
                <span>{module.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${module.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-indigo-500 rounded-full"
                />
                </div>
                <button className="mt-4 w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <PlayCircle size={16} /> Continue Learning
                </button>
            </div>
            )}
        </motion.div>
        </div>
    );
};

export default ModuleCard;