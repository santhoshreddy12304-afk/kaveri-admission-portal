import React, { useState } from 'react';
import { Link, useOutlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';
import { FiArrowRight, FiGlobe, FiPhone, FiMapPin, FiZap, FiMenu, FiX } from 'react-icons/fi';

const PublicLayout = () => {
    const location = useLocation();
    const outlet = useOutlet();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-white selection:bg-ku-gold selection:text-ku-blue">
            {/* ─────────── ELITE NAVBAR ─────────── */}
            <nav className="fixed top-0 inset-x-0 z-[100] p-6">
                <motion.div 
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="container mx-auto"
                >
                    <div className="glass-dark border border-white/10 rounded-[2.5rem] px-8 py-4 backdrop-blur-3xl shadow-4xl flex justify-between items-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-ku-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <Link to="/" className="flex items-center space-x-4 relative z-10 group">
                            <motion.div 
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.8 }}
                                className="bg-white p-2 rounded-2xl shadow-2xl scale-95 group-hover:scale-100 transition-transform"
                            >
                                <img src={logo} alt="Kaveri University" className="h-10 w-auto" />
                            </motion.div>
                            <div className="hidden lg:block">
                                <span className="block text-xl font-black tracking-tighter uppercase italic leading-none">Kaveri</span>
                                <span className="block text-[10px] font-black tracking-[0.4em] text-ku-gold uppercase">University</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-10 relative z-10">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/about', label: 'About' },
                                { to: '/courses', label: 'Programs' },
                                { to: '/facilities', label: 'Facilities' },
                                { to: '/gallery', label: 'Gallery' },
                                { to: '/admission-process', label: 'Admission' },
                                { to: '/contact', label: 'Contact' },
                            ].map(link => (
                                <Link 
                                    key={link.to} 
                                    to={link.to} 
                                    className={`relative text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-ku-gold ${location.pathname === link.to ? 'text-ku-gold' : 'text-gray-400'}`}
                                >
                                    {link.label}
                                    {location.pathname === link.to && (
                                        <motion.div layoutId="navDot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-ku-gold rounded-full shadow-glow" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 relative z-10">
                            <Link 
                                to="/apply" 
                                className="flex items-center bg-white text-ku-blue px-4 py-2 md:px-8 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-ku-gold transition-all shadow-2xl hover:-translate-y-1 active:scale-95 group"
                            >
                                Apply Now
                                <FiArrowRight className="inline ml-1 md:ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Mobile Menu Toggle Button */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 md:p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:text-ku-gold hover:bg-white/10 transition-colors"
                            >
                                {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* ─────────── MOBILE MENU OVERLAY ─────────── */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden absolute top-[100px] left-6 right-6 glass-dark border border-white/10 rounded-3xl p-6 shadow-4xl backdrop-blur-3xl"
                        >
                            <div className="flex flex-col space-y-4">
                                {[
                                    { to: '/', label: 'Home' },
                                    { to: '/about', label: 'About' },
                                    { to: '/courses', label: 'Programs' },
                                    { to: '/facilities', label: 'Facilities' },
                                    { to: '/gallery', label: 'Gallery' },
                                    { to: '/admission-process', label: 'Admission' },
                                    { to: '/contact', label: 'Contact' },
                                ].map(link => (
                                    <Link 
                                        key={link.to} 
                                        to={link.to} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`p-4 rounded-xl text-xs font-black uppercase tracking-[0.3em] transition-all border ${location.pathname === link.to ? 'bg-ku-gold/10 text-ku-gold border-ku-gold/30' : 'bg-white/5 text-gray-400 border-white/5 hover:text-white hover:border-white/20'}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ─────────── MAIN VIEWPORT ─────────── */}
            <main className="flex-grow pt-32">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "anticipate" }}
                    >
                        {outlet}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* ─────────── FUTURISTIC FOOTER ─────────── */}
            <footer className="bg-slate-950 text-gray-400 pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ku-gold to-transparent opacity-30"></div>
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-ku-gold/5 rounded-full blur-[150px]"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
                        <div className="lg:col-span-5">
                            <div className="bg-white/5 inline-block p-4 rounded-3xl mb-10 border border-white/10">
                                <img src={logo} alt="Kaveri University" className="h-12 w-auto filter brightness-0 invert" />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">Shaping the <br/><span className="text-ku-gold">New Frontier.</span></h3>
                            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md italic mb-10">
                                Empowering Innovation, Technology & Agriculture for a Sustainable Future. The digital gateway to excellence.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://kaveriuniversity.edu.in" target="_blank" rel="noreferrer" className="glass-dark border border-white/10 px-6 py-3 rounded-2xl text-xs font-black text-white hover:bg-white/10 hover:text-ku-gold transition-all uppercase tracking-widest flex items-center gap-3">
                                    <FiGlobe /> Global HQ
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <h3 className="text-xs font-black text-ku-gold mb-10 uppercase tracking-[0.5em] flex items-center gap-3">
                                <div className="w-2 h-2 bg-ku-gold rounded-full"></div> Core Links
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    { to: '/admission-process', label: 'Induction 2026' },
                                    { to: '/courses', label: 'Programs Hub' },
                                    { to: '/facilities', label: 'Infrastructure' },
                                    { to: '/apply', label: 'Secure Access' },
                                    { to: '/contact', label: 'Human Help' },
                                ].map(link => (
                                    <li key={link.to}>
                                        <Link to={link.to} className="group flex items-center gap-4 text-white hover:text-ku-gold transition-all font-black text-xs uppercase tracking-widest">
                                            <span className="w-0 group-hover:w-4 h-[2px] bg-ku-gold transition-all"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:col-span-4">
                            <h3 className="text-xs font-black text-ku-gold mb-10 uppercase tracking-[0.5em] flex items-center gap-3">
                                <div className="w-2 h-2 bg-ku-gold rounded-full"></div> Network Status
                            </h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ku-gold group-hover:bg-ku-gold group-hover:text-ku-blue transition-all">
                                        <FiMapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Location</p>
                                        <p className="text-white font-medium text-sm">Gowraram Village, Wargal, <br/>Hyderabad, TS – 502279</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-ku-gold group-hover:bg-ku-gold group-hover:text-ku-blue transition-all">
                                        <FiPhone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Direct Comms</p>
                                        <a href="tel:9666041795" className="text-white font-medium text-sm hover:text-ku-gold transition">9666041795, 9392939698</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">&copy; {new Date().getFullYear()} Kaveri University Core. All Nodes Secured.</p>
                        <div className="flex gap-10 opacity-30">
                            <FiZap size={24} />
                            <div className="h-6 w-px bg-white/20"></div>
                            <span className="text-[10px] font-mono tracking-widest">VER: 3.0.0-PRO</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
