import React from 'react';
import { Target, Users, BookOpen, TrendingUp } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="group relative bg-white rounded-3xl p-8 border border-slate-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100/50">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{description}</p>
        
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
        </div>
        </div>
    </div>
);

const Features = () => {
    const features = [
        {
        icon: Target,
        title: "Predictive Job Matching",
        description: "Our AI ignores chronological gaps and focuses on competency. We match you with employers who value your specific transferable skills.",
        color: "bg-indigo-500"
        },
        {
        icon: BookOpen,
        title: "Adaptive Upskilling",
        description: "Don't waste time on generic courses. Get a personalized curriculum that bridges the specific gap between your current skills and your target role.",
        color: "bg-pink-500"
        },
        {
        icon: Users,
        title: "Digital Mentorship",
        description: "24/7 behavioral nudging and sentiment analysis to keep your confidence high and impostor syndrome at bay during your journey.",
        color: "bg-teal-500"
        },
        {
        icon: TrendingUp,
        title: "Market Trend Analysis",
        description: "Real-time insights into salary benchmarks and emerging roles, ensuring you are pivoting into a high-growth career path.",
        color: "bg-orange-500"
        }
    ];

    return (
        <section id="features" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Technology designed for <span className="text-indigo-600">human potential.</span>
            </h2>
            <p className="text-slate-500 text-lg">
                We've built a comprehensive ecosystem to handle every aspect of the return-to-work journey.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
            ))}
            </div>
        </div>
        </section>
    );
};

export default Features;