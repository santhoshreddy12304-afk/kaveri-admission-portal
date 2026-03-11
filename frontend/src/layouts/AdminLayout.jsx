import React, { useContext } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiHome, FiUsers, FiUpload, FiMessageSquare, FiLogOut, FiBarChart2, FiGlobe } from 'react-icons/fi';
import logo from '../assets/images/logo.png';

const AdminLayout = () => {
    const { logout, admin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => { logout(); navigate('/admin/login'); };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: FiBarChart2, desc: 'Overview & Analytics' },
        { name: 'Leads', path: '/admin/leads', icon: FiUsers, desc: 'Student Enquiries' },
        { name: 'Bulk Upload', path: '/admin/upload', icon: FiUpload, desc: 'Import Contacts' },
        { name: 'Campaigns', path: '/admin/campaigns', icon: FiMessageSquare, desc: 'WhatsApp Campaigns' },
    ];

    const currentPage = navItems.find(i => location.pathname.startsWith(i.path));

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-ku-blue via-blue-900 to-slate-900 text-white flex flex-col shadow-2xl z-20 flex-shrink-0">
                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl p-2">
                            <img src={logo} alt="KU" className="w-full h-full object-contain filter brightness-0 invert" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-ku-gold uppercase tracking-wider">Admin Portal</h2>
                            <p className="text-xs text-blue-300">Kaveri University</p>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-ku-gold rounded-lg flex items-center justify-center text-ku-blue font-black text-sm">
                                {(admin?.username || 'A')[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-black text-white">{admin?.username || 'Admin'}</p>
                                <p className="text-xs text-blue-300">Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3 px-2">Main Menu</p>
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link key={item.name} to={item.path}
                                className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${isActive ? 'bg-ku-gold text-ku-blue shadow-lg' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
                                <Icon className={`mr-3 text-lg flex-shrink-0 ${isActive ? 'text-ku-blue' : 'text-gray-400 group-hover:text-white'}`} />
                                <div>
                                    <p className={`font-bold text-sm ${isActive ? 'text-ku-blue' : ''}`}>{item.name}</p>
                                    <p className={`text-xs ${isActive ? 'text-ku-blue/70' : 'text-gray-500 group-hover:text-gray-300'}`}>{item.desc}</p>
                                </div>
                            </Link>
                        );
                    })}

                    <div className="mt-6 pt-4 border-t border-white/10">
                        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3 px-2">External</p>
                        <a href="/" target="_blank" rel="noreferrer" className="flex items-center px-3 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all group">
                            <FiGlobe className="mr-3 text-lg text-gray-400 group-hover:text-white" />
                            <div>
                                <p className="font-bold text-sm">View Website</p>
                                <p className="text-xs text-gray-500 group-hover:text-gray-300">Public admission portal</p>
                            </div>
                        </a>
                    </div>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <div className="text-xs text-gray-500 text-center mb-3">Admissions 2026-27 Active</div>
                    <button onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-xl transition-all group">
                        <FiLogOut className="mr-3 group-hover:text-red-400" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-black text-gray-800">
                            {currentPage?.name || 'Admin Dashboard'}
                        </h1>
                        <p className="text-sm text-gray-500">{currentPage?.desc || 'Kaveri University Admission System'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl text-sm font-bold">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            System Live
                        </div>
                        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold transition">
                            <FiGlobe size={14} /> Website
                        </a>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
