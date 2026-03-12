import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const PublicLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="glass-card sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-white p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                            <img src={logo} alt="Kaveri University" className="h-10 w-auto" />
                        </div>
                    </Link>
                    <div className="hidden md:flex space-x-8 h-full items-center text-ku-blue">
                        <Link to="/" className="hover:text-ku-gold transition-all duration-300 font-bold uppercase tracking-tighter text-sm">Home</Link>
                        <Link to="/about" className="hover:text-ku-gold transition-all duration-300 font-bold uppercase tracking-tighter text-sm">About</Link>
                        <Link to="/courses" className="hover:text-ku-gold transition-all duration-300 font-bold uppercase tracking-tighter text-sm">Programs</Link>
                        <Link to="/facilities" className="hover:text-ku-gold transition-all duration-300 font-bold uppercase tracking-tighter text-sm">Facilities</Link>
                        <Link to="/gallery" className="hover:text-ku-gold transition-all duration-300 font-bold uppercase tracking-tighter text-sm">Gallery</Link>
                        <Link to="/admission-process" className="hover:text-ku-gold transition-all duration-300 font-bold uppercase tracking-tighter text-sm">Admission</Link>
                        <Link to="/contact" className="hover:text-ku-gold transition-all duration-300 font-bold uppercase tracking-tighter text-sm">Contact</Link>
                        <Link to="/apply" className="bg-gradient-to-r from-ku-blue to-blue-800 text-white px-8 py-2.5 rounded-xl font-bold hover:shadow-[0_10px_20px_rgba(0,41,87,0.3)] transition-all duration-300 transform hover:-translate-y-1">Apply Now</Link>
                    </div>
                    {/* Mobile menu button could go here */}
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900 text-gray-300 pt-16 pb-8 border-t-4 border-ku-gold relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{backgroundImage:'url(/assets/images/3d_bg.png)', backgroundSize:'cover'}}></div>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-ku-gold blur-[120px] opacity-10"></div>
                <div className="relative z-10 container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        <div className="md:col-span-2">
                            <div className="bg-white/10 inline-block p-3 rounded-2xl mb-6">
                                <img src={logo} alt="Kaveri University" className="h-12 w-auto filter brightness-0 invert" />
                            </div>
                            <p className="text-gray-400 text-lg leading-relaxed mb-4 max-w-sm">
                                Empowering Innovation, Technology & Agriculture for a Sustainable Future. <em className="text-ku-gold">Shaping The New.</em>
                            </p>
                            <div className="flex gap-3">
                                <a href="https://kaveriuniversity.edu.in" target="_blank" rel="noreferrer" className="glass-card px-4 py-2 rounded-xl text-sm font-bold text-white hover:bg-white/20 transition-all">🌐 Website</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-widest">Quick Links</h3>
                            <ul className="space-y-3">
                                {[
                                    { to: '/admission-process', label: 'Admission 2026-27' },
                                    { to: '/courses', label: 'Academic Programs' },
                                    { to: '/facilities', label: 'Campus Facilities' },
                                    { to: '/apply', label: 'Apply Online' },
                                    { to: '/contact', label: 'Contact Us' },
                                ].map(link => (
                                    <li key={link.to}><Link to={link.to} className="hover:text-ku-gold transition-all font-medium flex items-center gap-2"><span className="text-ku-gold text-xs">▶</span> {link.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-white mb-6 uppercase tracking-widest">Contact</h3>
                            <div className="space-y-3 text-gray-400">
                                <p className="flex items-start gap-2"><span className="text-ku-gold flex-shrink-0 mt-0.5">📍</span><span>Gowraram Village, Wargal, Hyderabad, Telangana – 502279</span></p>
                                <p className="flex items-center gap-2"><span className="text-ku-gold">📞</span><a href="tel:9666041795" className="hover:text-ku-gold transition">9666041795, 9392939698</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} Kaveri University. All Rights Reserved. | Built with ❤️ for student success.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
