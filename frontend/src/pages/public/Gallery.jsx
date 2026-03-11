import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Real photos extracted from Kaveri University brochures
const galleryItems = [
    {
        src: '/src/assets/images/gallery_113.jpeg',
        alt: 'Kaveri University Campus - Aerial View',
        category: 'Campus',
        caption: '150-Acre Green Campus — Aerial View'
    },
    {
        src: '/src/assets/images/gallery_120.jpeg',
        alt: 'Kaveri University Main Block',
        category: 'Campus',
        caption: 'Kaveri University — Main Academic Block'
    },
    {
        src: '/src/assets/images/gallery_119.jpeg',
        alt: 'University Academic Building',
        category: 'Campus',
        caption: 'Academic Complex — Architecture'
    },
    {
        src: '/src/assets/images/gallery_121.jpeg',
        alt: 'Campus Master Plan',
        category: 'Campus',
        caption: 'Campus Master Plan — 3D Render'
    },
    {
        src: '/src/assets/images/gallery_124.jpeg',
        alt: 'Campus Overview with River',
        category: 'Campus',
        caption: 'Scenic Campus Located by the River'
    },
    {
        src: '/src/assets/images/gallery_125.jpeg',
        alt: 'Sports and Residential Block',
        category: 'Campus',
        caption: 'Sports Complex & Residential Blocks'
    },
    {
        src: '/src/assets/images/gallery_115.jpeg',
        alt: 'Smart Classroom',
        category: 'Academics',
        caption: 'Modern Smart Classroom with Projector'
    },
    {
        src: '/src/assets/images/gallery_117.jpeg',
        alt: 'Science Laboratory',
        category: 'Labs',
        caption: 'Advanced Science Laboratory'
    },
    {
        src: '/src/assets/images/gallery_122.jpeg',
        alt: 'Faculty Board Meeting',
        category: 'Academics',
        caption: 'Faculty & Management — Board Meeting'
    },
    {
        src: '/src/assets/images/gallery_123.jpeg',
        alt: 'Campus Layout Top View',
        category: 'Campus',
        caption: 'Campus Layout — Satellite View'
    },
    {
        src: '/src/assets/images/gallery_118.jpeg',
        alt: 'Campus Infrastructure',
        category: 'Campus',
        caption: 'Infrastructure Development'
    },
    {
        src: '/src/assets/images/gallery_116.jpeg',
        alt: 'University Event',
        category: 'Events',
        caption: 'University Convocation Ceremony'
    },
];

const categories = ['All', 'Campus', 'Academics', 'Labs', 'Events'];

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter(i => i.category === activeCategory);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Header */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url(/src/assets/images/gallery_113.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-ku-blue/80 to-slate-900/80"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Our Campus</p>
                    <h1 className="text-6xl md:text-7xl font-black mb-6">Campus <span className="text-ku-gold">Gallery</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">
                        A visual tour of Kaveri University's world-class facilities, campus life, and academic environment.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                                activeCategory === cat
                                    ? 'bg-ku-blue text-white shadow-[0_10px_30px_rgba(0,41,87,0.3)] -translate-y-1'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Gallery Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    {filtered.map((item, idx) => (
                        <div
                            key={idx}
                            className="break-inside-avoid group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative"
                            onClick={() => setLightbox(item)}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                                <div className="p-6">
                                    <span className="bg-ku-gold text-ku-blue text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                                        {item.category}
                                    </span>
                                    <p className="text-white font-bold text-lg leading-tight">{item.caption}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute -top-12 right-0 text-white text-4xl font-light hover:text-ku-gold transition-colors"
                        >
                            ✕
                        </button>
                        <img
                            src={lightbox.src}
                            alt={lightbox.alt}
                            className="w-full rounded-3xl shadow-2xl max-h-[80vh] object-contain"
                        />
                        <div className="mt-4 text-center">
                            <span className="bg-ku-gold text-ku-blue text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mr-3">
                                {lightbox.category}
                            </span>
                            <span className="text-white text-lg font-medium">{lightbox.caption}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* CTA */}
            <section className="container mx-auto px-4 py-16">
                <div className="glass-card rounded-3xl p-12 text-center border-t-4 border-ku-gold">
                    <h2 className="text-4xl font-black text-ku-blue mb-4">Ready to Be Part of This?</h2>
                    <p className="text-gray-600 text-lg mb-8">Join thousands of students at Kaveri University's vibrant campus.</p>
                    <Link to="/apply" className="bg-gradient-to-r from-ku-blue to-blue-800 text-white px-12 py-4 rounded-2xl font-black text-lg hover:shadow-[0_10px_30px_rgba(0,41,87,0.3)] transition-all transform hover:-translate-y-1 inline-block">
                        Apply for Admission 2026
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
