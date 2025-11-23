import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import JobCard from './JobCard';
import { Search, SlidersHorizontal, Filter } from 'lucide-react';
import { Toast } from '../ui/Toast';

// Mock Data
const MOCK_JOBS = [
    { id: 1, title: "Data Analyst", company: "TechFlow India", location: "Bengaluru (Remote)", type: "Full-time", salary: "₹7 - 10 LPA", matchScore: 94, returnerFriendly: true },
    { id: 2, title: "Product Manager", company: "Innovate Inc", location: "Gurugram (Hybrid)", type: "Full-time", salary: "₹18 - 25 LPA", matchScore: 88, returnerFriendly: true },
    { id: 3, title: "UX Researcher", company: "Creative Labs", location: "Mumbai", type: "Part-time", salary: "₹5 - 8 LPA", matchScore: 72, returnerFriendly: false },
    { id: 4, title: "Marketing Lead", company: "Growth.io", location: "Pune", type: "On-site", salary: "₹12 - 15 LPA", matchScore: 65, returnerFriendly: true },
    { id: 5, title: "Junior Developer", company: "SoftSys", location: "Hyderabad", type: "Contract", salary: "₹6 - 9 LPA", matchScore: 91, returnerFriendly: true },
    { id: 6, title: "HR Specialist", company: "PeopleFirst", location: "Chennai", type: "Full-time", salary: "₹5 - 7 LPA", matchScore: 55, returnerFriendly: false },
];

const Jobs = () => {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState(null);

    const handleApply = (job) => {
        setToast({ message: `Application sent to ${job.company}!`, type: 'success' });
    };

    const filteredJobs = MOCK_JOBS.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || 
                            (filter === 'Remote' && job.location === 'Remote') ||
                            (filter === 'Returner Friendly' && job.returnerFriendly);
        return matchesSearch && matchesFilter;
    });

    return (
        <DashboardLayout>
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
            <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Predictive Job Market</h1>
            <p className="text-slate-500"> Opportunities curated based on your <span className="font-bold text-indigo-600">Skill Bridge</span> analysis.</p>
            </div>
            
            {/* Search & Filter Bar */}
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                type="text" 
                placeholder="Search roles..." 
                className="w-full pl-10 pr-4 py-2.5 bg-transparent outline-none text-sm font-medium text-slate-700"
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="h-8 w-[1px] bg-slate-100" />
            <div className="flex gap-1">
                {['All', 'Remote', 'Returner Friendly'].map(f => (
                <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === f ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-500'}`}
                >
                    {f}
                </button>
                ))}
            </div>
            </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
        </div>

        {filteredJobs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">No jobs found matching your criteria.</p>
            </div>
        )}

        {/* Toast Notification */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </DashboardLayout>
    );
};

export default Jobs;