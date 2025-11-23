import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl shadow-2xl shadow-slate-900/20"
        >
        {type === 'success' ? <CheckCircle className="text-green-400" size={20} /> : <AlertCircle className="text-red-400" size={20} />}
        <span className="font-medium text-sm">{message}</span>
        </motion.div>
    );
};