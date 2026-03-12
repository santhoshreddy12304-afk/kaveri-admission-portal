import React, { useContext, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiHome, FiUsers, FiUpload, FiMessageSquare, FiLogOut, FiBarChart2, FiGlobe, FiMenu, FiX } from 'react-icons/fi';
const logo = '/assets/images/logo.png';

const AdminLayout = () => {
    const { logout, admin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/ku-portal-gate'); };
    const closeSidebar = () => setIsSidebarOpen(false);

    const navItems = [
        { name: 'Dashboard', path: '/portal-command-center/dashboard', icon: FiBarChart2, desc: 'Overview & Analytics' },
        { name: 'Leads', path: '/portal-command-center/leads', icon: FiUsers, desc: 'Student Enquiries' },
        { name: 'Bulk Upload', path: '/portal-command-center/upload', icon: FiUpload, desc: 'Import Contacts' },
        { name: 'Campaigns', path: '/portal-command-center/campaigns', icon: FiMessageSquare, desc: 'WhatsApp Campaigns' },
    ];

    const currentPage = navItems.find(i => location.pathname.startsWith(i.path));

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden relative">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-ku-blue/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative inset-y-0 left-0 w-72 bg-gradient-to-b from-ku-blue via-blue-900 to-slate-900 text-white 
                flex flex-col shadow-2xl z-40 transition-transform duration-300 transform
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Logo & Close Button (Mobile Only) */}
                <div className="p-6 border-b border-white/10 relative">
                    <button 
                        onClick={closeSidebar}
                        className="lg:hidden absolute top-6 right-4 text-white hover:text-ku-gold transition-colors"
                    >
                        <FiX size={24} />
                    </button>

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
                            <div className="overflow-hidden">
                                <p className="text-sm font-black text-white truncate">{admin?.username || 'Admin'}</p>
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
                            <Link 
                                key={item.name} 
                                to={item.path}
                                onClick={closeSidebar}
                                className={`flex items-center px-4 py-3.5 rounded-2xl transition-all duration-200 group ${isActive ? 'bg-ku-gold text-ku-blue shadow-lg scale-[1.02]' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                            >
                                <Icon className={`mr-4 text-xl flex-shrink-0 ${isActive ? 'text-ku-blue' : 'text-gray-400 group-hover:text-white'}`} />
                                <div className="overflow-hidden">
                                    <p className={`font-black text-sm leading-tight ${isActive ? 'text-ku-blue' : ''}`}>{item.name}</p>
                                    <p className={`text-[11px] font-medium leading-tight mt-0.5 ${isActive ? 'text-ku-blue/70' : 'text-gray-500 group-hover:text-gray-300'}`}>{item.desc}</p>
                                </div>
                            </Link>
                        );
                    })}

                    <div className="mt-6 pt-4 border-t border-white/10">
                        <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3 px-2">External</p>
                        <a href="/" target="_blank" rel="noreferrer" className="flex items-center px-4 py-3.5 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all group">
                            <FiGlobe className="mr-4 text-xl text-gray-400 group-hover:text-white" />
                            <div>
                                <p className="font-black text-sm">View Website</p>
                                <p className="text-[11px] font-medium text-gray-500 group-hover:text-gray-300">Public admission portal</p>
                            </div>
                        </a>
                    </div>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout}
                        className="flex items-center w-full px-4 py-4 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-2xl transition-all group">
                        <FiLogOut className="mr-4 group-hover:text-red-400" />
                        <span className="font-black">Logout</span>
                    </button>
                    <div className="text-[10px] text-gray-500 text-center mt-3 font-bold uppercase tracking-widest">v1.2.0 • Admissions 2026-27</div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-gray-50 overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 sticky top-0 z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-600"
                        >
                            <FiMenu size={20} />
                        </button>
                        <div>
                            <h1 className="text-lg md:text-xl font-black text-gray-800 leading-tight">
                                {currentPage?.name || 'Admin Area'}
                            </h1>
                            <p className="hidden md:block text-xs text-gray-500 font-medium">{currentPage?.desc || 'Kaveri University Admission System'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Live
                        </div>
                        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap">
                            <FiGlobe size={14} /> <span className="hidden xs:inline">Website</span>
                        </a>
                    </div>
                </header>

                <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
