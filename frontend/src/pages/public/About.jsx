import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiTarget, FiZap, FiGlobe, FiMapPin, FiAnchor } from 'react-icons/fi';
import { Flag, GraduationCap, Sparkles, Zap, ShieldCheck } from 'lucide-react';

const About = () => {
    const timeline = [
        { year: '2012', title: 'University Established', desc: 'Kaveri University founded with engineering and agriculture schools.' },
        { year: '2015', title: 'Global Partnerships', desc: 'Collaboration signed with University of Florida USA and ICRISAT.' },
        { year: '2018', title: 'Campus Expansion', desc: '150-acre campus development initiated. Iconic main block completed.' },
        { year: '2021', title: 'Drone Academy Launch', desc: 'India\'s first university-level Drone Training Academy inaugurated.' },
        { year: '2024', title: 'AI & Robotics Hub', desc: 'State-of-the-art AI Robotics Research Lab opened in campus.' },
        { year: '2026', title: 'Admissions Open', desc: 'New academic year 2026-27 with scholarships and expanded programs.' },
    ];

    const leadership = [
        { name: 'Shri G.V. Bhaskar Rao', role: 'Founder Chancellor', img: '/assets/images/gallery_114.jpeg', desc: 'Visionary leader and agriculturist who established Kaveri University to bridge technology and agriculture.' },
        { name: 'Dr. V. Praveen Rao', role: 'Vice-Chancellor', img: '/assets/images/gallery_122.jpeg', desc: 'Distinguished agricultural scientist and former VC of PJTSAU, bringing global research standards to our campus.' },
    ];

    const collaborations = [
        { name: 'University of Florida', country: 'USA', icon: <FiGlobe />, desc: 'Joint research programs in agriculture and biotechnology.' },
        { name: 'ICRISAT', country: 'International', icon: <FiAnchor />, desc: 'International Crops Research Institute partnership for agricultural innovation.' },
        { name: 'Fraunhofer Institute', country: 'Germany', icon: <FiMapPin />, desc: 'Technology transfer and engineering research collaboration.' },
    ];

    return (
        <div className="min-h-screen perspective-view overflow-x-hidden">
            {/* ─────────── HERO ─────────── */}
            <section className="relative py-32 overflow-hidden bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900 border-b border-white/10">
                <div className="absolute inset-0 opacity-20 scale-110" style={{backgroundImage:'url(/assets/images/gallery_121.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-ku-blue/60 backdrop-blur-sm"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8"
                    >
                        <span className="bg-ku-gold/20 text-ku-gold border border-ku-gold/40 font-black px-6 py-2 rounded-full text-xs uppercase tracking-[0.4em] reflection-effect">
                            The Kaveri Legacy
                        </span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter shadow-ku-blue drop-shadow-2xl">
                        Shaping <span className="text-ku-gold italic">Generations.</span>
                    </h1>
                    <p className="text-2xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                        Where India's traditional agricultural wisdom meets the next frontier of Digital Engineering.
                    </p>
                </div>
            </section>

            {/* ─────────── VISION & MISSION ─────────── */}
            <section className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <Tilt perspective={1500} glareEnable={true} glareMaxOpacity={0.2} scale={1.02}>
                        <div className="rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,41,87,0.3)] relative group">
                            <img src="/assets/images/gallery_120.jpeg" alt="Kaveri University Campus" className="w-full h-[500px] object-cover transition-transform duration-[2s] group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-ku-blue via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-10 left-10 right-10">
                                <span className="text-white font-black text-2xl tracking-tight bg-ku-blue/40 backdrop-blur-md px-6 py-2 rounded-2xl block">Gowraram Eco-Campus, Hyderabad</span>
                            </div>
                        </div>
                    </Tilt>
                    <div>
                        <motion.p 
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="text-ku-gold font-black uppercase tracking-[0.4em] text-xs mb-6"
                        >
                            The Foundation
                        </motion.p>
                        <h2 className="text-5xl font-black text-ku-blue mb-8 tracking-tighter">Our Eternal <span className="gradient-text">Odyssey</span></h2>
                        <blockquote className="border-l-8 border-ku-gold pl-8 mb-10 italic text-gray-700 text-3xl font-bold leading-tight">
                            "To be a global innovator in sustainable education, fusing the soil with the silicon."
                        </blockquote>
                        <div className="space-y-6 text-gray-600 text-xl leading-relaxed font-medium">
                            <p>Established by the visionary <strong>Shri G.V. Bhaskar Rao</strong>, Kaveri University was born out of a necessity to create technical experts who don't lose touch with the roots of our nation.</p>
                            <p>Under <strong>Dr. V. Praveen Rao</strong>, we have transformed into a 150-acre digital hub where every lab and classroom is a portal to the global industry.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────── PIXELS & PHILOSOPHY ─────────── */}
            <section className="bg-slate-900 py-24 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { icon: <FiTarget size={50} />, title: 'Grand Vision', text: 'To be the globally recognized epicenter for intersectional research in Agriculture and Technology.', color: 'from-blue-600 to-blue-900' },
                            { icon: <Flag size={50} />, title: 'The Mission', text: 'To build ethical leaders who can operate drones as easily as they understand crop genomics.', color: 'from-ku-gold to-yellow-600' },
                            { icon: <FiZap size={50} />, title: 'The Core', text: 'Holistic character architecture combined with high-performance industry twinning programs.', color: 'from-ku-blue to-slate-800' },
                        ].map((item, i) => (
                            <Tilt key={i} perspective={1000} glareEnable={true} glareMaxOpacity={0.1}>
                                <div className={`glass-card rounded-[3rem] p-12 text-white h-full border-white/10 group`}>
                                    <div className="mb-8 text-ku-gold group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                                    <h3 className="text-3xl font-black mb-6 tracking-tight uppercase">{item.title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed font-medium">{item.text}</p>
                                </div>
                            </Tilt>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── TIMELINE ─────────── */}
            <section className="container mx-auto px-4 py-32 relative overflow-hidden bg-[#020617]">
                <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,191,0,0.4) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
                <div className="text-center mb-24 relative z-10">
                    <p className="text-ku-gold font-black uppercase tracking-[0.5em] text-xs mb-6">Historical Protocol</p>
                    <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic">The Kaveri <span className="text-ku-gold">Matrix.</span></h2>
                </div>
                
                <div className="relative max-w-6xl mx-auto px-4">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-ku-gold/50 to-transparent transform -translate-x-1/2"></div>
                    
                    {timeline.map((item, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 50, rotateX: -20 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`flex flex-col md:flex-row items-center gap-12 mb-32 relative z-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            <div className={`flex-1 w-full ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                <Tilt perspective={2000} scale={1.05} glareEnable={true} glareMaxOpacity={0.2}>
                                    <div className="glass-dark rounded-[3rem] p-12 border border-white/10 shadow-4xl group hover:border-ku-gold/40 transition-all depth-shadow">
                                        <div className="flex items-center gap-4 mb-6 justify-end flex-row-reverse md:flex-row">
                                            <div className="h-px flex-grow bg-gradient-to-r from-transparent to-ku-gold/30"></div>
                                            <span className="text-ku-gold font-black text-xl tracking-widest">{item.year}</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight italic group-hover:text-ku-gold transition-colors">{item.title}</h3>
                                        <p className="text-gray-400 text-lg leading-relaxed font-medium italic">{item.desc}</p>
                                    </div>
                                </Tilt>
                            </div>
                            
                            <div className="relative group">
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                    className="w-24 h-24 rounded-[2rem] bg-ku-gold/10 border border-ku-gold/40 flex items-center justify-center text-ku-gold font-black text-2xl z-10 shadow-glow-sm relative"
                                >
                                    <FiZap size={32} />
                                </motion.div>
                                <div className="absolute inset-0 bg-ku-gold/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            
                            <div className="flex-1 hidden md:block"></div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─────────── LEADERSHIP ─────────── */}
            <section className="bg-slate-50 py-24 border-y border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <p className="text-ku-gold font-black uppercase tracking-[0.4em] text-xs mb-6">Architects of Change</p>
                        <h2 className="text-6xl font-black text-ku-blue tracking-tighter">The <span className="gradient-text">Leadership</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {leadership.map((l, i) => (
                            <Tilt key={i} perspective={1500} scale={1.02} glareEnable={true} glareMaxOpacity={0.1}>
                                <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] overflow-hidden group border border-gray-100 h-full">
                                    <div className="h-72 overflow-hidden relative">
                                        <img src={l.img} alt={l.name} className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-ku-blue/40 to-transparent"></div>
                                    </div>
                                    <div className="p-12 border-t-8 border-ku-gold">
                                        <h3 className="text-3xl font-black text-ku-blue mb-2 tracking-tight uppercase">{l.name}</h3>
                                        <p className="text-ku-gold font-black mb-6 text-xs uppercase tracking-[0.3em]">{l.role}</p>
                                        <p className="text-gray-600 leading-relaxed text-lg font-medium">{l.desc}</p>
                                    </div>
                                </div>
                            </Tilt>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── GLOBAL COLLABORATIONS ─────────── */}
            <section className="container mx-auto px-4 py-24">
                <div className="text-center mb-20">
                    <p className="text-ku-gold font-black uppercase tracking-[0.4em] text-xs mb-6">Technological Twinning</p>
                    <h2 className="text-6xl font-black text-ku-blue tracking-tighter">Global <span className="gradient-text">Alliances</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {collaborations.map((c, i) => (
                        <Tilt key={i} perspective={1000} scale={1.05} glareEnable={true} glareMaxOpacity={0.2}>
                            <div className="glass-card rounded-[3rem] p-12 text-center border-t-white/50 h-full depth-shadow group">
                                <div className="text-7xl text-ku-gold mb-8 transition-transform group-hover:scale-110 flex justify-center">{c.icon}</div>
                                <h3 className="text-2xl font-black text-ku-blue mb-4 tracking-tight uppercase">{c.name}</h3>
                                <div className="bg-blue-100 text-ku-blue font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-widest mb-6 inline-block">{c.country}</div>
                                <p className="text-gray-600 leading-relaxed font-medium text-lg">{c.desc}</p>
                            </div>
                        </Tilt>
                    ))}
                </div>
            </section>

            {/* ─────────── CTA ─────────── */}
            <section className="container mx-auto px-4 py-16 pb-32">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-br from-ku-blue to-slate-900 rounded-[4rem] p-20 text-center text-white relative overflow-hidden shadow-3xl depth-shadow"
                >
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url(/assets/images/gallery_113.jpeg)', backgroundSize:'cover'}}></div>
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ku-gold blur-[150px] opacity-20"></div>
                    <div className="relative z-10">
                        <h2 className="text-6xl font-black mb-8 leading-none tracking-tighter">Be Part of the <br/><span className="text-ku-gold italic font-black">History.</span></h2>
                        <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">Join the world's most innovative academic eco-system. Admissions filling fast.</p>
                        <div className="flex gap-8 justify-center flex-wrap">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/apply" className="bg-gradient-to-r from-ku-gold to-yellow-400 text-ku-blue px-14 py-6 rounded-[2rem] font-black text-xl shadow-[0_20px_40px_rgba(255,191,0,0.4)] transition-all inline-block">Secure Admission Now</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Link to="/gallery" className="glass-card border border-white/30 text-white px-14 py-6 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all backdrop-blur-3xl inline-block">Experience Campus</Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default About;
