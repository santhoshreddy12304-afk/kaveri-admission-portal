import React from 'react';
import { Link } from 'react-router-dom';

const facilitiesData = [
    {
        category: 'Academic Facilities',
        icon: '🎓',
        items: [
            { name: 'Smart Classrooms', desc: 'Air-conditioned rooms with smart boards, projectors, and high-speed Wi-Fi for interactive learning.', img: '/assets/images/gallery_115.jpeg' },
            { name: 'Digital Library', desc: 'Access to 50,000+ books, e-journals, and research databases including IEEE and Scopus.', img: '/assets/images/gallery_122.jpeg' },
        ]
    },
    {
        category: 'Research & Labs',
        icon: '🔬',
        items: [
            { name: 'Science Laboratories', desc: 'Modern wet labs and dry labs equipped with advanced instruments for biotechnology, chemistry, and material science.', img: '/assets/images/gallery_117.jpeg' },
            { name: 'AI & Robotics Hub', desc: 'India-first AI-Robotics lab with collaborative robot arms, drone simulation, and Python/ROS development kits.', img: '/assets/images/gallery_121.jpeg' },
        ]
    },
    {
        category: 'Sports & Recreation',
        icon: '🏆',
        items: [
            { name: 'Sports Complex', desc: 'Multi-sport facility with cricket ground, basketball & volleyball courts, and a modern gym.', img: '/assets/images/gallery_125.jpeg' },
            { name: 'Campus Grounds', desc: 'Expansive green lawns, walking trails, and open amphitheater for events and relaxation.', img: '/assets/images/gallery_113.jpeg' },
        ]
    },
];

const Facilities = () => {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/assets/images/gallery_120.jpeg" alt="Campus" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-ku-blue/90 to-slate-900/90"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">World-Class</p>
                    <h1 className="text-6xl md:text-7xl font-black mb-6">Our <span className="text-ku-gold">Facilities</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">A 150-acre campus built for tomorrow's learners — with every facility designed to inspire, create, and innovate.</p>
                </div>
            </section>

            {/* Overview Stats */}
            <section className="bg-ku-blue py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                        {[
                            { val: '150', unit: 'Acres', label: 'Green Campus' },
                            { val: '30+', unit: '', label: 'Laboratories' },
                            { val: '50K+', unit: '', label: 'Library Books' },
                            { val: '24/7', unit: '', label: 'Hostel Security' },
                        ].map((s, i) => (
                            <div key={i} className="border-r border-white/20 last:border-0">
                                <div className="text-4xl font-black text-ku-gold">{s.val}<span className="text-xl">{s.unit}</span></div>
                                <div className="text-gray-300 text-sm font-bold uppercase tracking-widest mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Facility Categories */}
            {facilitiesData.map((cat, catIdx) => (
                <section key={catIdx} className={`py-20 ${catIdx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-14">
                            <span className="text-4xl">{cat.icon}</span>
                            <h2 className="text-4xl font-black text-ku-blue mt-4 mb-2">{cat.category}</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {cat.items.map((item, i) => (
                                <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden hover-tilt group">
                                    <div className="h-60 overflow-hidden">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-black text-ku-blue mb-3">{item.name}</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* Hostel & Residential */}
            <section className="py-20 relative overflow-hidden bg-gradient-to-br from-ku-blue to-slate-900">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url(/assets/images/gallery_125.jpeg)', backgroundSize:'cover'}}></div>
                <div className="relative z-10 container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-white">
                            <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Student Living</p>
                            <h2 className="text-5xl font-black mb-6">Premium <span className="text-ku-gold">Residential</span> Life</h2>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">Our campus offers separate, well-maintained hostels for boys and girls with 24/7 security, Wi-Fi, hygienic mess, and recreational facilities.</p>
                            <ul className="space-y-4">
                                {['Boys & Girls Separate Hostels', '24/7 CCTV Security', 'Hygienic Mess with multiple cuisines', 'High-speed Wi-Fi in all rooms', 'Indoor Games & Common Room', 'Laundry & Housekeeping Services'].map(f => (
                                    <li key={f} className="flex items-center gap-3 text-gray-200 font-medium">
                                        <span className="w-7 h-7 rounded-full bg-ku-gold text-ku-blue flex items-center justify-center font-black text-xs flex-shrink-0">✓</span> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-2xl hover-tilt border-4 border-white/20">
                            <img src="/assets/images/gallery_119.jpeg" alt="Residential Block" className="w-full h-96 object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Drone Academy */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="rounded-3xl overflow-hidden shadow-2xl hover-tilt group">
                        <img src="/assets/images/gallery_123.jpeg" alt="Drone Academy" className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div>
                        <span className="bg-ku-gold text-ku-blue font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-5 inline-block">India First</span>
                        <h2 className="text-4xl font-black text-ku-blue mb-6">Drone Training <span className="gradient-text">Academy</span></h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">Kaveri University houses India's pioneering Drone Training Academy — a specialized facility for hands-on drone operation, maintenance, and agricultural application training.</p>
                        <ul className="space-y-3 mb-8">
                            {['DGCA-certified trainer pilots', 'Agricultural drone spraying simulation', 'Fixed-wing & multi-rotor drone fleet', 'Emergency operations training'].map(f => (
                                <li key={f} className="flex items-center gap-3 text-gray-700 font-medium">
                                    <span className="text-ku-gold font-black">▸</span> {f}
                                </li>
                            ))}
                        </ul>
                        <Link to="/apply" className="bg-gradient-to-r from-ku-blue to-blue-800 text-white px-10 py-4 rounded-2xl font-black inline-block hover:shadow-xl transition-all transform hover:-translate-y-1">Apply for Drone Program</Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 py-8 pb-20">
                <div className="glass-card rounded-3xl p-12 text-center border-t-4 border-ku-gold">
                    <h2 className="text-4xl font-black text-ku-blue mb-4">Experience It Yourself</h2>
                    <p className="text-gray-600 text-lg mb-8">Visit our campus or apply online to start your journey at Kaveri University.</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/apply" className="bg-ku-blue text-white px-10 py-4 rounded-2xl font-black text-lg hover:shadow-xl transition-all transform hover:-translate-y-1">Apply Now</Link>
                        <Link to="/gallery" className="border-2 border-ku-blue text-ku-blue px-10 py-4 rounded-2xl font-black text-lg hover:bg-ku-blue hover:text-white transition-all">View Gallery</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Facilities;
