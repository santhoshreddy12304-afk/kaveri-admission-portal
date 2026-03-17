import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiArrowRight, FiCpu, FiBook, FiAward, FiGlobe } from 'react-icons/fi';
import { Search, Zap, Microscope, Landmark, Activity, Sparkles } from 'lucide-react';

const Courses = () => {
    const programs = [
        {
            faculty: "School of Engineering & Technology",
            icon: <FiCpu />,
            color: "from-blue-600 to-blue-900",
            light: "blue",
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
            icon: <Microscope />,
            color: "from-green-600 to-green-900",
            light: "green",
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
            icon: <Landmark />,
            color: "from-purple-600 to-purple-900",
            light: "purple",
            courses: [
                { name: "BBA General", duration: "3 Years", seats: 120 },
                { name: "MBA General", duration: "2 Years", seats: 120, highlight: true },
                { name: "MBA Finance", duration: "2 Years", seats: 60 },
                { name: "MBA Marketing", duration: "2 Years", seats: 60 },
                { name: "MBA HRM", duration: "2 Years", seats: 60 },
            ]
        }
    ];

    return (
        <div className="bg-[#020617] min-h-screen perspective-view overflow-x-hidden text-white">
            {/* ─────────── HEADER ─────────── */}
            <section className="relative py-40 overflow-hidden border-b border-white/10 shadow-4xl">
                <div className="absolute inset-0 opacity-10 scale-110" style={{backgroundImage:'url(/assets/images/gallery_125.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-3xl"></div>
                
                {/* Spatial HUD elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-40 h-40 border-t-2 border-l-2 border-ku-gold/20 rounded-tl-[3rem] opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 border-b-2 border-r-2 border-ku-gold/20 rounded-br-[3rem] opacity-30 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-ku-gold/10 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-8"
                    >
                        <span className="bg-ku-gold/10 text-ku-gold border border-ku-gold/30 font-black px-8 py-3 rounded-full text-xs uppercase tracking-[0.5em] shadow-glow-sm">
                            Catalog Index: v2026.4
                        </span>
                    </motion.div>
                    <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter uppercase italic">Elite <span className="text-ku-gold">Programs.</span></h1>
                    <p className="text-2xl text-blue-100/60 max-w-2xl mx-auto font-medium italic leading-relaxed">Advanced academic pathways engineered for global operational leadership.</p>
                </div>
            </section>

            {/* ─────────── COURSES GRID ─────────── */}
            <section className="container mx-auto px-4 py-32 max-w-7xl relative">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <div className="text-[10px] font-mono text-ku-gold space-y-1">
                        <p>SECTOR: ACADEMICA</p>
                        <p>NODE: COURSE_MATRIX_01</p>
                        <p>STATUS: VERIFIED</p>
                    </div>
                </div>

                <div className="space-y-40">
                    {programs.map((school, idx) => (
                        <div key={idx} className="relative">
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-8 mb-16"
                            >
                                <div className="p-6 bg-gradient-to-br from-ku-gold to-yellow-600 rounded-[2.5rem] text-ku-blue text-5xl shadow-glow transform -rotate-2">
                                    {school.icon}
                                </div>
                                <div>
                                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">{school.faculty}</h2>
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="h-0.5 w-12 bg-ku-gold/40"></div>
                                        <p className="text-ku-gold font-black tracking-[0.4em] text-[10px] uppercase">{school.courses.length} Certified Pathways / v3.0</p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {school.courses.map((course, cIdx) => (
                                    <Tilt key={cIdx} perspective={2000} scale={1.05} glareEnable={true} glareMaxOpacity={0.15}>
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: cIdx * 0.05 }}
                                            viewport={{ once: true }}
                                            className={`h-full glass-dark rounded-[3.5rem] p-10 border border-white/10 hover-tilt group flex flex-col justify-between depth-shadow relative overflow-hidden ${course.highlight ? 'ring-2 ring-ku-gold/30 bg-ku-gold/5 shadow-glow-sm' : ''}`}
                                        >
                                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                                            
                                            {course.highlight && (
                                                <div className="absolute top-8 right-8 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-ku-gold rounded-full animate-ping"></div>
                                                    <span className="text-[10px] font-black text-ku-gold uppercase tracking-widest bg-ku-gold/10 px-4 py-1.5 rounded-full border border-ku-gold/20">Alpha Node</span>
                                                </div>
                                            )}
                                            
                                            <div>
                                                <h3 className="text-3xl font-black text-white mb-8 leading-tight group-hover:text-ku-gold transition-colors tracking-tighter uppercase italic">{course.name}</h3>
                                                <div className="space-y-6 mb-10">
                                                    <div className="flex items-center gap-4 text-gray-500 font-bold group-hover:text-gray-300 transition-colors">
                                                        <div className="p-2 bg-white/5 rounded-lg"><FiBook className="text-ku-gold" /></div>
                                                        <span className="text-sm uppercase tracking-widest">Duration: {course.duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-gray-500 font-bold group-hover:text-gray-300 transition-colors">
                                                        <div className="p-2 bg-white/5 rounded-lg"><FiAward className="text-ku-gold" /></div>
                                                        <span className="text-sm uppercase tracking-widest">Global Cert Level-4</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                                                <div>
                                                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] block mb-1">Projected Intake</span>
                                                    <span className="text-white font-black text-2xl tracking-tighter">{course.seats} <span className="text-xs text-gray-600">CAP</span></span>
                                                </div>
                                                <motion.div whileHover={{ scale: 1.1, rotate: 15 }}>
                                                    <Link to="/apply" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-ku-gold hover:text-ku-blue transition-all shadow-4xl group-hover:shadow-glow-sm">
                                                        <FiArrowRight size={24} />
                                                    </Link>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </Tilt>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────── CTA ─────────── */}
            <section className="container mx-auto px-4 py-24 pb-32">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="relative rounded-[4rem] overflow-hidden p-16 md:p-24 text-center bg-gradient-to-br from-ku-gold/10 to-transparent border border-ku-gold/20 depth-shadow"
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ku-gold to-transparent opacity-50"></div>
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter">Found Your <span className="text-ku-gold italic font-black">Future?</span></h2>
                        <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">Seats for the 2026 cohort are filling at an unprecedented rate. Merit scholarships apply to all listed programs.</p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/apply" className="bg-gradient-to-r from-ku-gold to-yellow-400 text-ku-blue px-16 py-7 rounded-[2.5rem] font-black text-2xl shadow-[0_20px_40px_rgba(255,191,0,0.5)] transition-all inline-block hover:shadow-[0_25px_60px_rgba(255,191,0,0.7)]">
                                Begin Application Process
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Courses;
