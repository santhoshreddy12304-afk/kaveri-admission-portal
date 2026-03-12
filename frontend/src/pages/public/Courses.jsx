import React from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
    const programs = [
        {
            faculty: "School of Engineering & Technology",
            icon: "⚙️",
            color: "from-blue-600 to-blue-800",
            courses: [
                { name: "B.Tech CSE (Core)", duration: "4 Years", seats: 120, highlight: true },
                { name: "B.Tech CSE - AI & ML", duration: "4 Years", seats: 120, highlight: true },
                { name: "B.Tech CSE - Data Science", duration: "4 Years", seats: 60 },
                { name: "B.Tech CSE - Robotics & Automation", duration: "4 Years", seats: 60 },
                { name: "B.Tech CSE - Cyber Security", duration: "4 Years", seats: 60 },
                { name: "B.Tech CSE - Internet of Technology", duration: "4 Years", seats: 60 },
                { name: "B.Tech ECE (Core)", duration: "4 Years", seats: 60 },
                { name: "M.Tech CSE", duration: "2 Years", seats: 30 },
                { name: "M.Tech AI & ML", duration: "2 Years", seats: 30 },
                { name: "Ph.D. (CSE)", duration: "3+ Years", seats: "Variable" }
            ]
        },
        {
            faculty: "School of Agriculture",
            icon: "🌾",
            color: "from-green-600 to-green-800",
            courses: [
                { name: "B.Sc (Hons.) Agriculture", duration: "4 Years", seats: 120, highlight: true },
                { name: "B.Sc (Hons.) Horticulture", duration: "4 Years", seats: 60 },
                { name: "M.Sc Agronomy", duration: "2 Years", seats: 30 },
                { name: "M.Sc Genetics & Plant Breeding", duration: "2 Years", seats: 30 },
                { name: "M.Sc Entomology", duration: "2 Years", seats: 30 },
                { name: "Ph.D. Agriculture", duration: "3+ Years", seats: "Variable" }
            ]
        },
        {
            faculty: "School of Management Studies",
            icon: "📊",
            color: "from-purple-600 to-purple-800",
            courses: [
                { name: "BBA General", duration: "3 Years", seats: 120 },
                { name: "MBA General", duration: "2 Years", seats: 120, highlight: true },
                { name: "MBA Finance", duration: "2 Years", seats: 60 },
                { name: "MBA Marketing", duration: "2 Years", seats: 60 },
                { name: "MBA HRM", duration: "2 Years", seats: 60 },
            ]
        },
        {
            faculty: "School of Allied Health Sciences",
            icon: "🏥",
            color: "from-red-500 to-red-700",
            courses: [
                { name: "B.Sc Nursing", duration: "4 Years", seats: 60, highlight: true },
                { name: "B.Sc Paramedical", duration: "4 Years", seats: 60 },
                { name: "B.Sc Nutrition & Dietetics", duration: "4 Years", seats: 60 },
                { name: "M.Sc Nursing", duration: "2 Years", seats: 30 }
            ]
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url(/assets/images/gallery_125.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-ku-blue/60"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Admissions 2026-27</p>
                    <h1 className="text-6xl md:text-7xl font-black mb-6">Academic <span className="text-ku-gold">Programs</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">Explore 20+ comprehensive undergraduate and postgraduate programs across 4 elite schools.</p>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="container mx-auto px-4 py-20 max-w-6xl">
                <div className="space-y-16">
                    {programs.map((school, idx) => (
                        <div key={idx} className="bg-white rounded-3xl shadow-xl border-t-8 filter hover:shadow-2xl transition-all duration-300 overflow-hidden" style={{ borderColor: school.color.includes('blue') ? '#2563eb' : school.color.includes('green') ? '#16a34a' : school.color.includes('purple') ? '#9333ea' : '#dc2626' }}>
                            <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{school.icon}</div>
                                    <h2 className="text-3xl font-black text-gray-800">{school.faculty}</h2>
                                </div>
                                <div className="bg-white px-4 py-2 rounded-xl text-sm font-bold text-gray-500 shadow-sm border border-gray-100">
                                    {school.courses.length} Programs Available
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {school.courses.map((course, cIdx) => (
                                        <div key={cIdx} className={`rounded-2xl p-5 border-2 transition-all hover:bg-gray-50 ${course.highlight ? 'border-ku-gold shadow-md relative' : 'border-gray-100 hover:border-gray-200'}`}>
                                            {course.highlight && (
                                                <span className="absolute -top-3 right-4 bg-ku-gold text-ku-blue text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full z-10">High Demand</span>
                                            )}
                                            <h3 className="text-lg font-black text-ku-blue mb-3">{course.name}</h3>
                                            <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                                                <div className="text-sm font-bold text-gray-600"><span className="text-gray-400 font-medium">Duration:</span> {course.duration}</div>
                                                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-bold">{course.seats} Seats</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-ku-blue to-blue-800 py-16">
                <div className="container mx-auto px-4 text-center text-white">
                    <h2 className="text-4xl font-black mb-6">Found Your Dream Program?</h2>
                    <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">Our admissions for 2026-27 are now open. Apply early to secure your seat and up to 75% merit scholarship.</p>
                    <Link to="/apply" className="bg-ku-gold text-ku-blue px-12 py-5 rounded-2xl font-black text-xl hover:shadow-[0_15px_30px_rgba(255,191,0,0.4)] transition-all transform hover:-translate-y-2 inline-block">
                        Apply Now — Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Courses;
