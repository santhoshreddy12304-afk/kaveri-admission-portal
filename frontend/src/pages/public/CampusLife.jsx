import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiHome, FiBook, FiCheckCircle, FiStar, FiUsers, FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Globe, Heart, Zap, Coffee } from 'lucide-react';

const CampusLife = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-white perspective-view overflow-x-hidden">
            {/* ─────────── HERO ─────────── */}
            <section className="relative py-48 overflow-hidden border-b border-white/10 shadow-4xl">
                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img src="/assets/images/gallery_125.jpeg" alt="Campus Atmosphere" className="w-full h-full object-cover opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#020617]/80 to-transparent backdrop-blur-3xl"></div>
                </motion.div>
                
                {/* Spatial HUD elements */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-ku-gold/10 rounded-full animate-pulse-slow"></div>
                    <div className="absolute top-10 right-10 flex flex-col items-end gap-1">
                        <div className="text-[8px] font-mono text-ku-gold uppercase tracking-[0.5em]">Sector: Life_Matrix</div>
                        <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">Coord: 44.2N / 12.8E</div>
                    </div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-10"
                    >
                        <span className="bg-ku-gold/10 text-ku-gold border border-ku-gold/30 font-black px-12 py-4 rounded-full text-xs uppercase tracking-[0.6em] shadow-glow-sm">
                            Vibrant Ecosystem
                        </span>
                    </motion.div>
                    <h1 className="text-8xl md:text-[10rem] font-black mb-10 leading-none tracking-tighter uppercase italic">The Human <span className="text-ku-gold">Element.</span></h1>
                    <p className="text-2xl md:text-3xl text-blue-100/60 max-w-3xl mx-auto font-medium leading-relaxed italic border-l-2 border-ku-gold/20 pl-8">
                        Life at Kaveri is more than an academic residency. It is a vibrant ecosystem where culture synthesizes with advanced technology.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-40 relative">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden lg:block">
                    <FiStar size={300} className="text-ku-gold" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start relative z-10">
                    <Tilt perspective={2000} scale={1.02} glareEnable={true} glareMaxOpacity={0.1}>
                        <div className="glass-dark rounded-[4rem] overflow-hidden group border border-white/10 shadow-4xl depth-shadow relative">
                            <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-ku-gold/20 text-ku-gold text-[10px] font-black uppercase px-4 py-1.5 rounded-full border border-ku-gold/30 backdrop-blur-md">Node: Learning_Hub</span>
                            </div>
                            <div className="h-[500px] overflow-hidden relative">
                                <img src="/assets/images/gallery_115.jpeg" alt="Interactive Classrooms" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-10 left-10">
                                     <div className="text-ku-gold mb-6 drop-shadow-glow"><FiBook size={56} /></div>
                                     <h3 className="text-5xl font-black uppercase tracking-tighter italic">Smart Hubs</h3>
                                </div>
                            </div>
                            <div className="p-14">
                                <p className="text-gray-400 text-xl font-medium leading-relaxed italic">Engage in technology-led learning within our smart classrooms, designed for maximum student-teacher interaction and 3D visualization of complex concepts.</p>
                            </div>
                        </div>
                    </Tilt>

                    <Tilt perspective={2000} scale={1.02} glareEnable={true} glareMaxOpacity={0.1}>
                        <div className="glass-dark rounded-[4rem] overflow-hidden group border border-white/10 shadow-4xl depth-shadow relative">
                            <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-ku-gold/20 text-ku-gold text-[10px] font-black uppercase px-4 py-1.5 rounded-full border border-ku-gold/30 backdrop-blur-md">Node: Living_Sector</span>
                            </div>
                            <div className="h-[500px] overflow-hidden relative">
                                <img src="/assets/images/gallery_124.jpeg" alt="Academic Infrastructure" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-10 left-10">
                                     <div className="text-ku-gold mb-6 drop-shadow-glow"><FiHome size={56} /></div>
                                     <h3 className="text-5xl font-black uppercase tracking-tighter italic">Living Matrix</h3>
                                </div>
                            </div>
                            <div className="p-14">
                                <p className="text-gray-400 text-xl font-medium leading-relaxed italic">Our 150-acre campus architecture blends aesthetics with functionality, providing a majestic environment for higher education and personal reflection.</p>
                            </div>
                        </div>
                    </Tilt>
                </div>

                {/* ─────────── QUICK STATS HUB ─────────── */}
                <div className="mt-48 grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { label: 'Autonomous Hubs', val: '20+', icon: <Zap size={24} /> },
                        { label: 'Global Convergence', val: '15+', icon: <Globe size={24} /> },
                        { label: 'Athletic Nodes', val: '10+', icon: <FiActivity size={24} /> },
                        { label: 'Bio-Sustenance', val: '60%', icon: <Heart size={24} /> },
                    ].map((s, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ scale: 1.1, y: -15 }}
                            className="glass-dark rounded-[3.5rem] p-12 text-center border border-white/10 shadow-3xl depth-shadow relative group overflow-hidden"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-ku-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="text-ku-gold mb-8 flex justify-center opacity-40 group-hover:opacity-100 transition-all duration-500 scale-125">{s.icon}</div>
                            <div className="text-6xl font-black text-white mb-3 tracking-tighter group-hover:text-ku-gold transition-colors italic">{s.val}</div>
                            <div className="text-gray-600 font-black text-[10px] uppercase tracking-[0.5em]">{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* ─────────── CTA ─────────── */}
                <div className="text-center mt-48 pb-40">
                    <Tilt scale={1.05}>
                        <Link to="/gallery" className="group flex items-center gap-8 bg-white text-ku-blue px-20 py-10 rounded-[4rem] font-black text-3xl transition-all shadow-glow hover:bg-ku-gold mx-auto w-fit uppercase tracking-tighter italic">
                            Explore Visual Archives <FiArrowRight size={32} className="group-hover:translate-x-4 transition-transform" />
                        </Link>
                    </Tilt>
                </div>
            </div>
        </div>
    );
}

export default CampusLife;
