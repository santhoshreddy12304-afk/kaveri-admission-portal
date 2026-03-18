import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiBookOpen, FiCpu, FiDribbble, FiShield, FiWifi, FiCoffee, FiTruck, FiActivity, FiArrowRight, FiZap } from 'react-icons/fi';
import { GraduationCap, Microscope, Trophy, Zap, Map, Wind, Layers } from 'lucide-react';
import drone3d from '../../assets/images/drone_academy_3d.png';

const facilitiesData = [
    {
        category: 'Academic Infrastructure',
        icon: <Layers size={40} />,
        items: [
            { name: 'Cognitive Classrooms', desc: 'Hybrid learning environments with holographic integration, bio-metric attendance, and 4K spatial audio.', img: '/assets/images/lecture_hall.png' },
            { name: 'Omni-Channel Library', desc: 'Beyond 50,000 volumes, access a neural-link to global research indices and AI-assisted citation tools.', img: '/assets/images/gallery_122.jpeg' },
        ]
    },
    {
        category: 'Edge Research Labs',
        icon: <Microscope size={40} />,
        items: [
            { name: 'Bio-Genetics Lab', desc: 'Advanced CRISPR sequencing and synthetic biology suites for next-gen agricultural breakthroughs.', img: '/assets/images/science_lab.png' },
            { name: 'AI & Robotics Hub', desc: 'India-first robotics foundry with 6-axis cobots, drone swarms, and high-performance computing clusters.', img: '/assets/images/robotics_lab.png' },
        ]
    },
    {
        category: 'Elite Athletics',
        icon: <Trophy size={40} />,
        items: [
            { name: 'Synthesized Sports Complex', desc: 'Olympic-grade indoor arenas and floodlit cricket grounds with advanced performance tracking.', img: '/assets/images/gallery_125.jpeg' },
            { name: 'Eco-System Grounds', desc: '150 acres of carbon-negative green space, designed for mental peak performance and well-being.', img: '/assets/images/campus_main.png' },
        ]
    },
];

const Facilities = () => {
    return (
        <div className="min-h-screen bg-slate-900 perspective-view overflow-x-hidden text-white">
            {/* ─────────── HERO ─────────── */}
            <section className="relative py-40 overflow-hidden border-b border-white/10 shadow-4xl">
                <motion.div 
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img src="/assets/images/gallery_120.jpeg" alt="Campus" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-ku-blue/90 via-slate-950/80 to-transparent"></div>
                </motion.div>
                
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8"
                    >
                        <span className="bg-ku-gold/20 text-ku-gold border border-ku-gold/40 font-black px-10 py-3 rounded-full text-xs uppercase tracking-[0.6em] reflection-effect">
                            Infrastructure Excellence
                        </span>
                    </motion.div>
                    <h1 className="text-7xl md:text-9xl font-black mb-10 leading-none tracking-tighter">Campus for the <br/><span className="text-ku-gold italic font-black text-8xl md:text-10xl">Vanguard.</span></h1>
                    <p className="text-2xl md:text-3xl text-blue-100/70 max-w-3xl mx-auto font-medium leading-relaxed font-italic italic">A 150-acre masterplan designed to synthesize nature with high-technology.</p>
                </div>
            </section>

            {/* ─────────── CORE METRICS ─────────── */}
            <section className="bg-gradient-to-r from-ku-blue to-blue-900 py-20 relative overflow-hidden shadow-Inner">
                <div className="absolute inset-0 opacity-10 blur-3xl bg-ku-gold translate-x-1/2 translate-y-1/2 rounded-full w-[600px] h-[600px]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            { val: '150', unit: 'Acres', label: 'Tech-Eco Matrix' },
                            { val: '45+', unit: 'Labs', label: 'Precision Research' },
                            { val: '65K+', unit: 'Datapoints', label: 'E-Resource Library' },
                            { val: '24/7', unit: 'Secure', label: 'Hostel Shield' },
                        ].map((s, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                className="group"
                            >
                                <div className="text-6xl font-black text-ku-gold tracking-tighter mb-2 group-hover:drop-shadow-[0_0_15px_rgba(255,191,0,0.6)] transition-all transform-gpu">{s.val}<span className="text-2xl ml-1 text-white/50">{s.unit}</span></div>
                                <div className="text-blue-200 text-xs font-black uppercase tracking-[0.3em] font-mono opacity-80">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── FACILITY BLUEPRINTS ─────────── */}
            {facilitiesData.map((cat, catIdx) => (
                <section key={catIdx} className={`py-32 relative overflow-hidden ${catIdx % 2 === 1 ? 'bg-[#0f172a]' : 'bg-[#020617]'}`}>
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ku-gold/20 to-transparent"></div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col items-center mb-24">
                            <motion.div 
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                className="text-ku-gold mb-6 p-6 rounded-[2rem] bg-white/5 border border-white/10 shadow-glow-sm"
                            >
                                {cat.icon}
                            </motion.div>
                            <h2 className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase italic">{cat.category}</h2>
                            <p className="text-ku-gold font-black text-[10px] uppercase tracking-[0.4em] mt-4 opacity-50 italic">System Protocol / Level 03 Access</p>
                        </div>
 
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            {cat.items.map((item, i) => (
                                <Tilt key={i} perspective={2000} scale={1.02} glareEnable={true} glareMaxOpacity={0.15}>
                                    <div className="glass-dark rounded-[4rem] overflow-hidden group border border-white/5 shadow-4xl hover:border-ku-gold/40 transition-all depth-shadow relative">
                                        {/* Corner HUD Flairs */}
                                        <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-ku-gold/30 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-ku-gold/30 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="h-[450px] overflow-hidden relative">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
                                            
                                            {/* Spatial Data HUD */}
                                            <div className="absolute bottom-10 left-10 space-y-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                                    <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">Facility Status: Operational</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-ku-gold rounded-full"></div>
                                                    <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">Precision Level: Grade A</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-16 relative bg-[#020617]/40 backdrop-blur-3xl">
                                            <div className="mb-6 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ku-gold">
                                                    <FiZap />
                                                </div>
                                                <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase group-hover:text-ku-gold transition-colors">{item.name}</h3>
                                            </div>
                                            <p className="text-gray-400 text-xl font-medium leading-relaxed italic">{item.desc}</p>
                                        </div>
                                    </div>
                                </Tilt>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* ─────────── RESIDENTIAL PROTOCOLS ─────────── */}
            <section className="py-40 relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage:'url(/assets/images/gallery_125.jpeg)', backgroundSize:'cover', backgroundAttachment:'fixed'}}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <span className="bg-ku-gold/20 text-ku-gold border border-ku-gold/40 font-black px-8 py-2 rounded-full text-xs uppercase tracking-widest mb-8 inline-block">Habitation Matrix</span>
                            <h2 className="text-6xl md:text-7xl font-black mb-10 leading-none uppercase tracking-tighter">Premium <span className="text-ku-gold italic">Livit-Unit</span> Ecosystems</h2>
                            <p className="text-xl text-blue-100/70 font-medium mb-12 leading-relaxed max-w-xl">Fully automated residential blocks for all genders, featuring pervasive security, neural-link Wi-Fi, and hyper-hygienic lifestyle support.</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {[
                                    'Biometric Access Core',
                                    'CCTV Neural Mesh 24/7',
                                    'Global Fusion Messing',
                                    'High-Bandwidth Nodes',
                                    'Zen Recreation Zones',
                                    'Automated Care Matrix'
                                ].map(f => (
                                    <div key={f} className="flex items-center gap-4 text-white font-black uppercase text-xs tracking-widest group">
                                        <div className="w-8 h-8 rounded-2xl bg-ku-gold/20 border border-ku-gold/40 flex items-center justify-center text-ku-gold group-hover:bg-ku-gold group-hover:text-ku-blue transition-all">
                                            <Zap size={14} />
                                        </div>
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <motion.div 
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-ku-gold/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <div className="rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-4xl depth-shadow-lg relative">
                                <img src="/assets/images/gallery_119.jpeg" alt="Residential Block" className="w-full h-[600px] object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-slate-950 to-transparent">
                                    <p className="text-white font-black text-3xl italic tracking-tighter uppercase">Living Hub Alpha</p>
                                    <div className="h-1 w-20 bg-ku-gold mt-4"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─────────── DRONE COMMAND ACADEMY ─────────── */}
            <section className="py-40 container mx-auto px-4 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <motion.div 
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="rounded-[4rem] overflow-hidden shadow-4xl group depth-shadow hover:shadow-ku-gold/20 transition-all border border-white/5"
                    >
                        <img src={drone3d} alt="Drone Academy" className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="p-12 bg-slate-800">
                             <div className="flex items-center justify-between">
                                 <div>
                                     <p className="text-ku-gold font-black uppercase tracking-widest text-xs mb-2">Facility Status</p>
                                     <p className="text-white font-black text-2xl uppercase italic tracking-tighter">Operational: Phase 1</p>
                                 </div>
                                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                                     <Wind className="text-ku-gold opacity-50" size={40} />
                                 </motion.div>
                             </div>
                        </div>
                    </motion.div>
                    
                    <div>
                        <span className="bg-red-500 text-white font-black px-6 py-2 rounded-full text-xs uppercase tracking-[0.4em] mb-8 inline-block shadow-lg animate-pulse">
                            Pioneer Infrastructure
                        </span>
                        <h2 className="text-6xl md:text-7xl font-black text-white mb-10 leading-none uppercase tracking-tighter italic">Kaveri <span className="text-ku-gold">UAV Command</span> Center</h2>
                        <p className="text-2xl text-gray-400 font-medium mb-12 leading-relaxed">India's first holistic Drone Academy integrated within a university campus—empowering the next generation of aerial specialists.</p>
                        
                        <div className="space-y-6 mb-12">
                            {[
                                'DGCA Certified Flight Simulation',
                                'Precision Agri-Spraying Systems',
                                'UAV Hardware Prototyping Lab',
                                'Autonomous Navigation Mapping'
                            ].map(f => (
                                <div key={f} className="flex items-center gap-6 group">
                                    <div className="w-4 h-4 rounded-full border-2 border-ku-gold flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-ku-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <span className="text-white font-black uppercase text-sm tracking-[0.2em] group-hover:text-ku-gold transition-colors">{f}</span>
                                </div>
                            ))}
                        </div>
                        
                        <Link to="/apply" className="group flex items-center gap-6 bg-white text-ku-blue px-14 py-6 rounded-[2.5rem] font-black text-2xl transition-all shadow-[0_20px_40px_rgba(255,191,0,0.3)] hover:bg-ku-gold hover:-translate-y-2 uppercase tracking-tighter">
                            Aviation Induction <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─────────── CTA HUB ─────────── */}
            <section className="container mx-auto px-4 py-20 pb-40">
                <Tilt perspective={3000} scale={1.02} glareEnable={true} glareMaxOpacity={0.1}>
                    <div className="glass-dark rounded-[5rem] p-24 text-center border border-white/10 relative overflow-hidden shadow-4xl depth-shadow">
                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-transparent via-ku-gold to-transparent opacity-50"></div>
                        <h2 className="text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">Experience <span className="text-ku-gold italic">Convergence.</span></h2>
                        <p className="text-2xl text-gray-400 max-w-3xl mx-auto font-medium mb-16 italic">Initiate a physical campus interface tour or secure your node in the upcoming batch.</p>
                        <div className="flex gap-8 justify-center flex-wrap">
                            <Link to="/apply" className="bg-gradient-to-r from-ku-gold to-yellow-400 text-ku-blue px-16 py-6 rounded-[2.5rem] font-black text-2xl hover:shadow-[0_25px_60px_rgba(255,191,0,0.5)] transition-all uppercase tracking-tighter active:scale-95">Enroll Now</Link>
                            <Link to="/gallery" className="border-2 border-white/20 text-white px-16 py-6 rounded-[2.5rem] font-black text-2xl hover:bg-white/10 transition-all uppercase tracking-tighter active:scale-95">Digital Gallery</Link>
                        </div>
                    </div>
                </Tilt>
            </section>
        </div>
    );
};

export default Facilities;
