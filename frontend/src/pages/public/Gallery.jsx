import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FiMaximize2, FiX, FiArrowRight, FiCamera } from 'react-icons/fi';

// Real photos extracted from Kaveri University brochures
const galleryItems = [
    {
        src: '/assets/images/gallery_113.jpeg',
        alt: 'Kaveri University Campus - Aerial View',
        category: 'Campus',
        caption: '150-Acre Green Campus — Aerial View'
    },
    {
        src: '/assets/images/gallery_120.jpeg',
        alt: 'Kaveri University Main Block',
        category: 'Campus',
        caption: 'Kaveri University — Main Academic Block'
    },
    {
        src: '/assets/images/gallery_119.jpeg',
        alt: 'University Academic Building',
        category: 'Campus',
        caption: 'Academic Complex — Architecture'
    },
    {
        src: '/assets/images/gallery_121.jpeg',
        alt: 'Campus Master Plan',
        category: 'Campus',
        caption: 'Campus Master Plan — 3D Render'
    },
    {
        src: '/assets/images/gallery_124.jpeg',
        alt: 'Campus Overview with River',
        category: 'Campus',
        caption: 'Scenic Campus Located by the River'
    },
    {
        src: '/assets/images/gallery_125.jpeg',
        alt: 'Sports and Residential Block',
        category: 'Campus',
        caption: 'Sports Complex & Residential Blocks'
    },
    {
        src: '/assets/images/gallery_115.jpeg',
        alt: 'Smart Classroom',
        category: 'Academics',
        caption: 'Modern Smart Classroom with Projector'
    },
    {
        src: '/assets/images/gallery_117.jpeg',
        alt: 'Science Laboratory',
        category: 'Labs',
        caption: 'Advanced Science Laboratory'
    },
    {
        src: '/assets/images/gallery_122.jpeg',
        alt: 'Faculty Board Meeting',
        category: 'Academics',
        caption: 'Faculty & Management — Board Meeting'
    },
    {
        src: '/assets/images/gallery_123.jpeg',
        alt: 'Campus Layout Top View',
        category: 'Campus',
        caption: 'Campus Layout — Satellite View'
    },
    {
        src: '/assets/images/gallery_118.jpeg',
        alt: 'Campus Infrastructure',
        category: 'Campus',
        caption: 'Infrastructure Development'
    },
    {
        src: '/assets/images/gallery_116.jpeg',
        alt: 'University Event',
        category: 'Events',
        caption: 'University Convocation Ceremony'
    },
];

// Dynamically add a massive array of real extracted photos from the PDF
const extraPhotos = [49, 101, 36, 61, 47, 41, 74, 110, 108, 99, 111, 24, 69, 48, 71, 109, 106, 78, 65, 8, 12, 14, 26, 30, 42, 54, 83].map((id, index) => ({
    src: `/assets/images/gallery_${id}.jpeg`,
    alt: `Kaveri University Archive ${id}`,
    category: index % 4 === 0 ? 'Labs' : index % 3 === 0 ? 'Academics' : index % 2 === 0 ? 'Events' : 'Campus',
    caption: `University Archives — Captured Moment ${id}`
}));

const completeGallery = [...galleryItems, ...extraPhotos];

const categories = ['All', 'Campus', 'Academics', 'Labs', 'Events'];

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = activeCategory === 'All'
        ? completeGallery
        : completeGallery.filter(i => i.category === activeCategory);

    return (
        <div className="min-h-screen bg-slate-950 text-white perspective-view overflow-x-hidden">
            {/* ─────────── HERO HEADER ─────────── */}
            <section className="relative py-40 overflow-hidden border-b border-white/10">
                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img src="/assets/images/gallery_113.jpeg" alt="Campus Landscape" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-ku-blue/90 via-slate-950/80 to-transparent"></div>
                </motion.div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-6 flex justify-center"
                    >
                        <span className="bg-ku-gold/10 text-ku-gold border border-ku-gold/30 font-black px-8 py-2 rounded-full text-xs uppercase tracking-[0.5em]">
                            Visual Archives
                        </span>
                    </motion.div>
                    <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter uppercase italic">Digital <span className="text-ku-gold">Spectrum</span></h1>
                    <p className="text-2xl text-blue-100/60 max-w-2xl mx-auto font-medium leading-relaxed italic">
                        A high-fidelity immersion into the architectural and cultural heartbeat of Kaveri University.
                    </p>
                </div>
            </section>

            {/* ─────────── CATEGORY FILTER ─────────── */}
            <section className="sticky top-20 z-30 py-8 backdrop-blur-3xl bg-slate-950/50 border-b border-white/5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-10 py-3 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 relative group overflow-hidden ${
                                    activeCategory === cat
                                        ? 'text-ku-blue'
                                        : 'text-gray-400 hover:text-white border border-white/10'
                                }`}
                            >
                                {activeCategory === cat && (
                                    <motion.div 
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-ku-gold"
                                        transition={{ type: 'spring', duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── MASONRY GALLERY GRID ─────────── */}
            <section className="container mx-auto px-4 py-24">
                <motion.div 
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filtered.map((item, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                key={item.src}
                                className="break-inside-avoid"
                            >
                                <Tilt perspective={1000} scale={1.02} glareEnable={true} glareMaxOpacity={0.1}>
                                    <div 
                                        className="group cursor-pointer rounded-[2.5rem] overflow-hidden shadow-4xl border border-white/5 relative depth-shadow-lg"
                                        onClick={() => setLightbox(item)}
                                    >
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            className="w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        
                                        {/* Dynamic HUD Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-8">
                                            <div className="flex justify-end">
                                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform-gpu translate-y-[-20px] group-hover:translate-y-0 transition-transform">
                                                    <FiMaximize2 size={20} />
                                                </div>
                                            </div>
                                            <div>
                                                <span className="bg-ku-gold text-ku-blue text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4 inline-block">
                                                    NODE: {item.category}
                                                </span>
                                                <p className="text-white font-black text-2xl leading-none uppercase tracking-tighter italic">{item.caption}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Tilt>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* ─────────── LIGHTBOX ─────────── */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#020617]/95 backdrop-blur-2xl flex items-center justify-center p-8 lg:p-20 overflow-hidden"
                        onClick={() => setLightbox(null)}
                    >
                        {/* Background Matrix HUD */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-ku-gold/20 rounded-full"
                            />
                        </div>

                        <motion.div 
                            initial={{ scale: 0.9, y: 50, rotateX: 20 }}
                            animate={{ scale: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.9, y: 50, rotateX: 20 }}
                            className="relative max-w-7xl w-full h-full flex flex-col perspective-view"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute -top-16 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2 group z-20"
                            >
                                <span className="text-xs font-black uppercase tracking-[0.3em] group-hover:text-ku-gold transition-colors">Terminating Viewport</span>
                                <FiX size={32} className="group-hover:rotate-90 transition-transform" />
                            </button>
                            
                            <div className="flex-grow flex items-center justify-center relative rounded-[3rem] overflow-hidden border border-white/10 shadow-4xl bg-[#020617] group">
                                {/* Lens HUD Corners */}
                                <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-ku-gold/50 rounded-tl-[3rem] z-10 opacity-30 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-ku-gold/50 rounded-br-[3rem] z-10 opacity-30 group-hover:opacity-100 transition-opacity"></div>

                                <img
                                    src={lightbox.src}
                                    alt={lightbox.alt}
                                    className="w-full h-full object-contain relative z-0"
                                />

                                {/* Data Stream Overlay (Mobile Mock) */}
                                <div className="absolute top-10 right-10 flex flex-col items-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="bg-ku-gold/10 border border-ku-gold/30 px-4 py-1.5 rounded-full backdrop-blur-md">
                                        <p className="text-[10px] font-black text-ku-gold uppercase tracking-widest">RES: 3840 X 2160</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">FPS: 60.00 STABLE</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-10">
                                <div className="max-w-2xl">
                                    <motion.div 
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="flex items-center gap-3 mb-4"
                                    >
                                        <div className="w-1.5 h-1.5 bg-ku-gold rounded-full animate-ping"></div>
                                        <span className="text-ku-gold font-black uppercase tracking-[0.4em] text-xs">Archive Record: KU-{Math.floor(Math.random()*9000)+1000}</span>
                                    </motion.div>
                                    <h2 className="text-4xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter italic">{lightbox.caption}</h2>
                                    <p className="text-gray-500 mt-6 font-medium italic text-lg leading-relaxed">Integrated facility located at <span className="text-gray-300">Sector {lightbox.category === 'Campus' ? 'Alpha-01' : 'Gamma-Node'}</span>. All visual nodes operating at peak fidelity.</p>
                                </div>
                                <div className="hidden md:flex flex-col items-end group cursor-crosshair">
                                    <FiCamera size={48} className="text-ku-gold/30 mb-4 group-hover:text-ku-gold transition-colors" />
                                    <p className="text-white/20 font-black uppercase tracking-[0.5em] text-[10px] group-hover:text-white/40">Visual Capture v3.0</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─────────── CTA ─────────── */}
            <section className="container mx-auto px-4 py-32 pb-60">
                <Tilt perspective={3000} scale={1.02} glareEnable={true} glareMaxOpacity={0.1}>
                    <div className="glass-dark rounded-[5rem] p-24 text-center border border-white/10 relative overflow-hidden shadow-4xl">
                         <div className="absolute -top-20 -left-20 w-80 h-80 bg-ku-gold/10 rounded-full blur-[100px]"></div>
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase tracking-tighter italic leading-none">Step into the <br/><span className="text-ku-gold">Aesthetic.</span></h2>
                        <p className="text-2xl text-gray-400 max-w-3xl mx-auto font-medium mb-16 italic">Experience the physical manifestation of our digital vision.</p>
                        <Link to="/apply" className="group flex items-center gap-6 bg-white text-ku-blue px-14 py-7 rounded-[3rem] font-black text-2xl transition-all shadow-[0_20px_50px_rgba(255,191,0,0.3)] hover:bg-ku-gold mx-auto w-fit uppercase tracking-tighter">
                            Initiate Induction <FiArrowRight className="group-hover:translate-x-3 transition-transform" />
                        </Link>
                    </div>
                </Tilt>
            </section>
        </div>
    );
};

export default Gallery;
