const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Mock Database of Market Requirements (In a real app, this comes from an LLM/DB)
const ROLE_REQUIREMENTS = {
    "data-analyst": {
        title: "Data Analyst",
        requiredSkills: [
        { name: "Excel", weight: 20, description: "Advanced Pivot Tables & Macros" },
        { name: "SQL", weight: 30, description: "Querying complex databases" },
        { name: "Power BI", weight: 25, description: "Dashboard visualization" },
        { name: "Python", weight: 25, description: "Data manipulation with Pandas" }
        ],
        avgSalary: "₹6 - 9 LPA",
        growthPotential: "+35%"
    },
    "ux-designer": {
        title: "UX Designer",
        requiredSkills: [
        { name: "Figma", weight: 35, description: "Prototyping & Systems" },
        { name: "User Research", weight: 25, description: "Interviews & Personas" },
        { name: "Wireframing", weight: 20, description: "Low-fidelity layouts" },
        { name: "Prototyping", weight: 20, description: "Interaction design" }
        ],
        avgSalary: "₹8 - 12 LPA",
        growthPotential: "+40%"
    },
    "digital-marketer": {
        title: "Digital Marketer",
        requiredSkills: [
        { name: "SEO", weight: 30, description: "On-page & Off-page optimization" },
        { name: "Google Analytics", weight: 25, description: "Traffic analysis" },
        { name: "Content Strategy", weight: 25, description: "Planning & Distribution" },
        { name: "Social Media Ads", weight: 20, description: "Campaign management" }
        ],
        avgSalary: "₹5 - 8 LPA",
        growthPotential: "+30%"
    }
};

app.post('/api/analyze-skills', (req, res) => {
    const { role, currentSkills } = req.body; // currentSkills is an array of strings
    
    const targetRole = ROLE_REQUIREMENTS[role];
    
    if (!targetRole) {
        return res.status(404).json({ message: "Role data not found" });
    }

    // logic to calculate gaps
    const analysis = targetRole.requiredSkills.map(reqSkill => {
        // Check if user has this skill (simple fuzzy match simulation)
        const hasSkill = currentSkills.some(userSkill => 
        userSkill.toLowerCase().includes(reqSkill.name.toLowerCase()) || 
        reqSkill.name.toLowerCase().includes(userSkill.toLowerCase())
        );

        return {
        skill: reqSkill.name,
        status: hasSkill ? "acquired" : "missing",
        score: hasSkill ? 100 : Math.floor(Math.random() * 30), // Random low score if missing
        weight: reqSkill.weight,
        recommendation: hasSkill ? null : `Recommended: ${reqSkill.name} Bootcamp (4 weeks)`
        };
    });

    // Calculate overall match score
    const acquiredWeight = analysis.reduce((acc, item) => 
        item.status === 'acquired' ? acc + item.weight : acc, 0
    );

    res.json({
        roleTitle: targetRole.title,
        matchScore: acquiredWeight,
        marketData: {
        salary: targetRole.avgSalary,
        growth: targetRole.growthPotential
        },
        skillAnalysis: analysis
    });
});

app.get('/api/dashboard/:userId', (req, res) => {
    // Simulating a user who has completed the "Data Analyst" gap analysis
    res.json({
        user: { name: "Priya", role: "Aspiring Data Analyst" },
        stats: {
        matchScore: 65, // Current score (before upskilling)
        projectedScore: 94, // Score after completing path
        daysActive: 12
        },
        learningPath: [
        { id: 1, title: "Excel: Pivot Tables Mastery", status: "completed", type: "video" },
        { id: 2, title: "SQL for Beginners", status: "in-progress", progress: 45, type: "interactive" },
        { id: 3, title: "Power BI Fundamentals", status: "locked", type: "project" },
        { id: 4, title: "Capstone: Sales Dashboard", status: "locked", type: "capstone" }
        ],
        jobMatches: [
        { 
            id: 1, 
            role: "Junior Data Analyst", 
            company: "TechFlow India", 
            match: 78, 
            logo: "https://logo.clearbit.com/stripe.com",
            tags: ["Bengaluru", "Remote Friendly"]
        },
        { 
            id: 2, 
            role: "Marketing Analyst", 
            company: "Growth.io", 
            match: 65, 
            logo: "https://logo.clearbit.com/airbnb.com",
            tags: ["Mumbai (Hybrid)"]
        }
        ],
        mentorNudge: {
        text: "You've crushed the Excel module! 🚀 Don't let the SQL syntax scare you—it's just like asking a question in English.",
        author: "Kai, AI Mentor"
        }
    });
});

app.listen(port, () => {
    console.log(`ReWorkAI Server running on port ${port}`);
});