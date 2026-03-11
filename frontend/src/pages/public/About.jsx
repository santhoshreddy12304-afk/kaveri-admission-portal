import React from 'react';
import { Link } from 'react-router-dom';

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
        { name: 'Shri G.V. Bhaskar Rao', role: 'Founder Chancellor', img: '/src/assets/images/gallery_114.jpeg', desc: 'Visionary leader and agriculturist who established Kaveri University to bridge technology and agriculture.' },
        { name: 'Dr. V. Praveen Rao', role: 'Vice-Chancellor', img: '/src/assets/images/gallery_122.jpeg', desc: 'Distinguished agricultural scientist and former VC of PJTSAU, bringing global research standards to our campus.' },
    ];

    const collaborations = [
        { name: 'University of Florida', country: '🇺🇸 USA', desc: 'Joint research programs in agriculture and biotechnology.' },
        { name: 'ICRISAT', country: '🌍 International', desc: 'International Crops Research Institute partnership for agricultural innovation.' },
        { name: 'Fraunhofer Institute', country: '🇩🇪 Germany', desc: 'Technology transfer and engineering research collaboration.' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage:'url(/src/assets/images/gallery_121.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-ku-blue/60"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Est. 2012 · Telangana, India</p>
                    <h1 className="text-6xl md:text-7xl font-black mb-6">About <span className="text-ku-gold">Kaveri University</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">Shaping the New Era of Education. Where Technology meets Agriculture and Innovation meets Excellence.</p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="rounded-3xl overflow-hidden shadow-2xl hover-tilt">
                        <img src="/src/assets/images/gallery_120.jpeg" alt="Kaveri University Campus" className="w-full h-96 object-cover" />
                    </div>
                    <div>
                        <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Our Foundation</p>
                        <h2 className="text-4xl font-black text-ku-blue mb-6">Our Legacy & Vision</h2>
                        <blockquote className="border-l-4 border-ku-gold pl-6 mb-6 italic text-gray-600 text-xl">
                            "To be a global leader in innovation-driven education, specifically in Engineering and Agriculture for a sustainable future."
                        </blockquote>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Kaveri University, located at Gowraram Village, Wargal, Hyderabad, is a premier institution dedicated to excellence in education, research, and innovation. Established by <strong>Shri G.V. Bhaskar Rao</strong>, the university has grown into a prestigious institution.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Under the dynamic leadership of Vice-Chancellor <strong>Dr. V. Praveen Rao</strong>, we empower the next generation through global collaborations with UF Florida, ICRISAT, and Fraunhofer Institute.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision / Mission Cards */}
            <section className="bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: '🌟', title: 'Our Vision', text: 'To be a globally recognized center of excellence in education, research, and innovation, producing socially responsible leaders.' },
                            { icon: '🎯', title: 'Our Mission', text: 'To impart quality education, foster research, and develop competent professionals with ethical values, global perspective, and leadership skills.' },
                            { icon: '💡', title: 'Our Philosophy', text: 'We believe in holistic education — beyond textbooks, focusing on character building, entrepreneurship, and real-world problem solving.' },
                        ].map((item, i) => (
                            <div key={i} className="glass-card rounded-3xl p-8 hover-tilt text-white">
                                <div className="text-5xl mb-5">{item.icon}</div>
                                <h3 className="text-2xl font-black mb-4 text-ku-gold">{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-14">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Our Journey</p>
                    <h2 className="text-5xl font-black text-ku-blue">University <span className="gradient-text">Timeline</span></h2>
                </div>
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ku-blue to-ku-gold transform -translate-x-1/2"></div>
                    {timeline.map((item, i) => (
                        <div key={i} className={`flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                            <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                <div className="glass-card rounded-2xl p-6 hover-tilt inline-block max-w-xs">
                                    <span className="text-ku-gold font-black text-sm uppercase tracking-widest">{item.year}</span>
                                    <h3 className="text-lg font-black text-ku-blue mt-1 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-gradient-to-br from-ku-blue to-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 z-10 shadow-xl border-4 border-ku-gold">
                                {item.year.slice(2)}
                            </div>
                            <div className="flex-1"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Leadership */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Guiding the Future</p>
                        <h2 className="text-5xl font-black text-ku-blue">Our <span className="gradient-text">Leadership</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                        {leadership.map((l, i) => (
                            <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden hover-tilt group">
                                <div className="h-56 overflow-hidden">
                                    <img src={l.img} alt={l.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="p-8 border-t-4 border-ku-gold">
                                    <h3 className="text-xl font-black text-ku-blue">{l.name}</h3>
                                    <p className="text-ku-gold font-bold mb-4 text-sm uppercase tracking-wide">{l.role}</p>
                                    <p className="text-gray-600 leading-relaxed text-sm">{l.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Collaborations */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-14">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">World-Class Partnerships</p>
                    <h2 className="text-5xl font-black text-ku-blue">Global <span className="gradient-text">Collaborations</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collaborations.map((c, i) => (
                        <div key={i} className="glass-card rounded-3xl p-8 hover-tilt text-center">
                            <div className="text-4xl mb-4">{c.country.split(' ')[0]}</div>
                            <h3 className="text-xl font-black text-ku-blue mb-2">{c.name}</h3>
                            <p className="text-ku-gold font-bold text-sm mb-4">{c.country}</p>
                            <p className="text-gray-600 leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 py-8 pb-20">
                <div className="bg-gradient-to-r from-ku-blue to-blue-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url(/src/assets/images/gallery_113.jpeg)', backgroundSize:'cover'}}></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black mb-4">Be Part of the Kaveri Story</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">Join thousands of students shaping the future at Kaveri University.</p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link to="/apply" className="bg-ku-gold text-ku-blue px-10 py-4 rounded-2xl font-black text-lg hover:shadow-[0_10px_30px_rgba(255,191,0,0.4)] transition-all transform hover:-translate-y-1">Apply Now</Link>
                            <Link to="/gallery" className="border-2 border-white/40 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white/10 transition-all transform hover:-translate-y-1">View Gallery</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
