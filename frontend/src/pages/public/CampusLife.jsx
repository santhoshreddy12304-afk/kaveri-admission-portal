import React from 'react';
import { FiHome, FiBook, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CampusLife = () => {
    return (
        <div className="pb-20">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage:'url(/assets/images/campus_main.png)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-ku-blue/60"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Life at Kaveri</p>
                    <h1 className="text-6xl md:text-7xl font-black mb-6">Beyond the <span className="text-ku-gold">Classroom</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">Discover a vibrant campus culture that fosters growth, friendship, and innovation every single day.</p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-t-8 border-ku-gold hover:shadow-2xl transition-all group hover-tilt">
                        <div className="h-72 overflow-hidden">
                            <img src="/assets/images/lecture_hall.png" alt="Interactive Classrooms" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="p-10">
                            <div className="text-ku-gold mb-4"><FiBook size={40} /></div>
                            <h3 className="text-3xl font-black mb-4 text-ku-blue">Digital Classrooms</h3>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">Engage in technology-led learning within our smart classrooms, designed for maximum student-teacher interaction and 3D visualization of complex concepts.</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-t-8 border-ku-gold hover:shadow-2xl transition-all group hover-tilt">
                        <div className="h-72 overflow-hidden">
                            <img src="/assets/images/campus_main.png" alt="Academic Infrastructure" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="p-10">
                            <div className="text-ku-gold mb-4"><FiHome size={40} /></div>
                            <h3 className="text-3xl font-black mb-4 text-ku-blue">Modern Infrastructure</h3>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">Our 150-acre campus architecture blends aesthetics with functionality, providing a majestic environment for higher education and personal reflection.</p>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Student Clubs', val: '20+' },
                        { label: 'Annual Events', val: '15+' },
                        { label: 'Sports Facilities', val: '10+' },
                        { label: 'Green Spaces', val: '60%' },
                    ].map((s, i) => (
                        <div key={i} className="glass-card rounded-2xl p-6 text-center border-b-4 border-ku-gold">
                            <div className="text-3xl font-black text-ku-blue mb-1">{s.val}</div>
                            <div className="text-gray-500 font-bold text-xs uppercase tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <Link to="/gallery" className="bg-ku-blue text-white px-12 py-5 rounded-2xl font-black text-xl hover:shadow-[0_15px_30px_rgba(0,41,87,0.3)] transition-all transform hover:-translate-y-2 inline-block">Explore Campus Gallery →</Link>
                </div>
            </div>
        </div>
    );
}

export default CampusLife;
