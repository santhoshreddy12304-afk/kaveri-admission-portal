import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiFileText, FiPhoneCall, FiCheckCircle, FiEdit3, FiArrowRight, FiActivity } from 'react-icons/fi';
import { ClipboardList, Terminal, ShieldCheck, Zap } from 'lucide-react';

const AdmissionProcess = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { 
            step: "Phase 01", 
            title: "Digital Induction", 
            desc: "Initialize your data profile via our high-bandwidth enquiry stream. We capture your academic trajectory and professional aspirations.",
            icon: <FiEdit3 />,
            action: "Initiate Induction",
            link: "/apply"
        },
        { 
            step: "Phase 02", 
            title: "Strategic Consulting", 
            desc: "A direct transmission from our expert consultants to verify your eligibility matrix and align you with elite scholarship tiers.",
            icon: <FiPhoneCall />,
            action: "Direct Comms",
            link: "https://wa.me/919666041795"
        },
        { 
            step: "Phase 03", 
            title: "Credential Analysis", 
            desc: "Upload your academic ledgers (10th/12th) for proprietary merit-score computation and scholarship validation.",
            icon: <FiFileText />
        },
        { 
            step: "Phase 04", 
            title: "Node Confirmation", 
            desc: "Secure your allocation with a baseline commitment of ₹25,000. Welcome to the future of education.",
            icon: <FiCheckCircle />
        }
    ];

    const requirements = [
        "10th Class Academic Ledger",
        "12th Class / IPE Merit Records",
        "Transfer Certificate (TC)",
        "Migration Identity (if outside state)",
        "Aadhar / Biometric ID Proof",
        "Recent Visual Captures (Photos)"
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white perspective-view overflow-x-hidden">
            {/* ─────────── HERO ─────────── */}
            <section className="relative py-48 overflow-hidden border-b border-white/10 shadow-4xl">
                <motion.div 
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img src="/assets/images/gallery_113.jpeg" alt="Campus Network" className="w-full h-full object-cover opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#020617]/80 to-transparent backdrop-blur-3xl"></div>
                </motion.div>
                
                {/* Spatial HUD elements */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-10 left-10 flex flex-col gap-1">
                        <div className="text-[8px] font-mono text-ku-gold uppercase tracking-[0.5em]">Protocol: ADM_v2.0</div>
                        <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">Sector: INDUCTION</div>
                    </div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-10"
                    >
                        <span className="bg-ku-gold/10 text-ku-gold border border-ku-gold/30 font-black px-12 py-4 rounded-full text-xs uppercase tracking-[0.6em] shadow-glow-sm">
                            Induction Protocol
                        </span>
                    </motion.div>
                    <h1 className="text-8xl md:text-[10rem] font-black mb-10 leading-none tracking-tighter uppercase italic">Your <span className="text-ku-gold">Trajectory.</span></h1>
                    <p className="text-2xl md:text-3xl text-blue-100/60 max-w-3xl mx-auto font-medium leading-relaxed italic border-l-2 border-ku-gold/20 pl-8">
                        A streamlined, digital-first admission pipeline designed for the modern scholar.
                    </p>
                </div>
            </section>

            {/* ─────────── INTERACTIVE PIPELINE ─────────── */}
            <section className="container mx-auto px-4 py-40 max-w-7xl relative">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <div className="text-[10px] font-mono text-ku-gold space-y-1">
                        <p>PHASE: ANALYSIS</p>
                        <p>SYNC: PERSISTENT</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    {/* Step Navigation Stack */}
                    <div className="space-y-8 relative">
                        <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block"></div>
                        {steps.map((item, idx) => (
                            <motion.div 
                                key={idx} 
                                onClick={() => setActiveStep(idx)}
                                whileHover={{ x: 15 }}
                                className={`cursor-pointer rounded-[3.5rem] p-10 transition-all duration-500 border relative group overflow-hidden ${activeStep === idx ? 'bg-white shadow-glow-sm border-ku-gold scale-105 z-10' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                            >
                                {activeStep === idx && (
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-ku-gold"></div>
                                )}
                                <div className="flex items-start gap-10 relative z-10">
                                    <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl font-black shadow-4xl flex-shrink-0 transition-all duration-500 ${activeStep === idx ? 'bg-ku-gold text-ku-blue rotate-[10deg]' : 'bg-white/5 text-gray-700'}`}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-3 ${activeStep === idx ? 'text-ku-gold' : 'text-gray-600'}`}>{item.step}</div>
                                        <h3 className={`text-4xl font-black uppercase tracking-tighter italic ${activeStep === idx ? 'text-ku-blue' : 'text-white'}`}>{item.title}</h3>
                                        
                                        <AnimatePresence>
                                            {activeStep === idx && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-slate-600 font-medium text-xl leading-relaxed mt-8 mb-10 italic">{item.desc}</p>
                                                    {item.action && (
                                                        <div className="flex gap-6">
                                                            {item.link.startsWith('http') ? (
                                                                <a href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-ku-blue text-white px-10 py-5 rounded-2xl font-black text-xs hover:shadow-glow-sm transition-all uppercase tracking-widest">{item.action} <FiArrowRight size={18} /></a>
                                                            ) : (
                                                                <Link to={item.link} className="flex items-center gap-4 bg-ku-blue text-white px-10 py-5 rounded-2xl font-black text-xs hover:shadow-glow-sm transition-all uppercase tracking-widest">{item.action} <FiArrowRight size={18} /></Link>
                                                            )}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Dynamic Visual Terminal */}
                    <div className="relative group perspective-view">
                        <div className="absolute -inset-10 bg-ku-gold/10 blur-[100px] opacity-30 group-hover:opacity-60 transition-opacity"></div>
                        <Tilt perspective={2000} scale={1.05} glareEnable={true} glareMaxOpacity={0.1}>
                            <div className="glass-dark rounded-[5rem] p-24 border border-white/10 shadow-4xl depth-shadow-lg min-h-[600px] flex flex-col justify-center text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-ku-gold/40 to-transparent"></div>
                                <motion.div 
                                    key={activeStep}
                                    initial={{ scale: 0.8, opacity: 0, y: 30 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    className="relative z-10"
                                >
                                    <div className="text-ku-gold text-[12rem] mb-16 flex justify-center drop-shadow-glow opacity-60 group-hover:opacity-100 transition-opacity">
                                        {steps[activeStep].icon}
                                    </div>
                                    <h3 className="text-5xl font-black mb-10 uppercase tracking-tighter italic">Status: <span className="text-ku-gold">{steps[activeStep].title}</span></h3>
                                    <p className="text-blue-100/50 text-2xl font-medium leading-relaxed italic max-w-sm mx-auto">Operating within <span className="text-ku-gold">Sector {activeStep + 1}</span> mission parameters.</p>
                                    
                                    <div className="mt-20 pt-10 border-t border-white/10 flex items-center justify-center gap-10 opacity-30">
                                        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.5em]"><FiActivity /> Active</div>
                                        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.5em]"><ShieldCheck size={16} /> Verified</div>
                                    </div>
                                </motion.div>
                            </div>
                        </Tilt>
                    </div>
                </div>
            </section>

            {/* ─────────── DOCUMENT ARCHIVE CHECKLIST ─────────── */}
            <section className="bg-slate-950 py-32 border-y border-white/5">
                <div className="container mx-auto px-4 max-w-5xl">
                    <Tilt perspective={3000} scale={1.01}>
                        <div className="glass-dark rounded-[4rem] p-20 border border-white/10 shadow-4xl depth-shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-10 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                                <Terminal size={200} />
                            </div>
                            
                            <div className="flex items-center gap-8 mb-16 relative">
                                <div className="w-20 h-20 bg-ku-gold rounded-[2rem] flex items-center justify-center text-4xl text-ku-blue shadow-glow"><ClipboardList size={40} /></div>
                                <div>
                                    <h3 className="text-5xl font-black text-white uppercase tracking-tighter">Manifest <span className="text-ku-gold italic">Requirements</span></h3>
                                    <p className="text-gray-500 font-medium text-xl italic mt-2">Verified records necessary for node allocation.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                                {requirements.map((req, i) => (
                                    <motion.div 
                                        whileHover={{ x: 10 }}
                                        key={i} 
                                        className="flex items-center gap-6 bg-slate-900/50 rounded-3xl p-6 border border-white/5 hover:border-ku-gold/30 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-ku-gold/10 text-ku-gold flex items-center justify-center text-lg font-black group-hover:bg-ku-gold group-hover:text-ku-blue transition-all">
                                            <Zap size={16} />
                                        </div>
                                        <span className="text-gray-300 font-black uppercase text-xs tracking-widest">{req}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </Tilt>
                </div>
            </section>

            {/* ─────────── FINAL CTA ─────────── */}
            <section className="container mx-auto px-4 py-40 text-center pb-60">
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter italic leading-none">Initiate Your <br/><span className="text-ku-gold">Ascension.</span></h2>
                    <p className="text-2xl text-gray-400 mb-16 max-w-2xl mx-auto font-medium italic">High-bandwidth induction streams are now open for the 2026-27 cycle.</p>
                    <div className="flex gap-10 justify-center flex-wrap">
                        <Link to="/apply" className="group flex items-center gap-6 bg-white text-ku-blue px-16 py-8 rounded-[3rem] font-black text-2xl transition-all shadow-[0_20px_50px_rgba(255,191,0,0.3)] hover:bg-ku-gold uppercase tracking-tighter">
                            Engage Protocol <FiArrowRight className="group-hover:translate-x-3 transition-transform" />
                        </Link>
                        <a href="https://wa.me/919666041795" target="_blank" rel="noreferrer" className="flex items-center gap-6 border-2 border-white/10 text-white px-16 py-8 rounded-[3rem] font-black text-2xl hover:bg-white/10 transition-all uppercase tracking-tighter">
                            Human Interface
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

export default AdmissionProcess;
