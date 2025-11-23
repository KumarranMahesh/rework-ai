import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Briefcase, Settings, LogOut, Flower2 } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to, active }) => (
    <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-white hover:text-indigo-600'}`}>
        <Icon size={20} className={active ? 'text-white' : 'group-hover:text-indigo-600'} />
        <span className="font-medium text-sm">{label}</span>
    </Link>
);

const DashboardLayout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-slate-50 flex">
        {/* Glass Sidebar */}
        <aside className="w-64 fixed h-screen p-6 hidden lg:block">
            <div className="h-full bg-white/70 backdrop-blur-md border border-white/50 rounded-3xl p-6 flex flex-col">
            
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10 px-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Flower2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-lg text-slate-900">
                ReWork<span className="text-indigo-600">AI</span>
                </span>
            </div>

            {/* Nav */}
            <nav className="space-y-2 flex-1">
                <SidebarItem icon={LayoutDashboard} label="Overview" to="/dashboard" active={location.pathname === '/dashboard'} />
                <SidebarItem icon={BookOpen} label="Learning Path" to="/learning" active={location.pathname === '/learning'} />
                <SidebarItem icon={Briefcase} label="Job Matches" to="/jobs" active={location.pathname === '/jobs'} />
                <SidebarItem icon={Settings} label="Settings" to="/settings" />
            </nav>

            {/* User Profile */}
            <div className="mt-auto pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                <div>
                    <p className="text-sm font-bold text-slate-800">Priya S.</p>
                    <p className="text-xs text-slate-400">Pro Member</p>
                </div>
                <LogOut size={16} className="ml-auto text-slate-400 cursor-pointer hover:text-red-500" />
                </div>
            </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6 lg:p-10">
            <div className="max-w-6xl mx-auto">
            {children}
            </div>
        </main>
        </div>
    );
};

export default DashboardLayout;