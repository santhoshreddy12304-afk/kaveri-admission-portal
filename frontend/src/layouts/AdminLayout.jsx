import React, { useContext, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { FiHome, FiUsers, FiUpload, FiMessageSquare, FiLogOut, FiBarChart2, FiGlobe, FiMenu, FiX, FiShield, FiSettings, FiBell } from 'react-icons/fi';
const logo = '/assets/images/logo.png';

const AdminLayout = () => {
    const { logout, admin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/ku-portal-gate'); };
    const closeSidebar = () => setIsSidebarOpen(false);

    const navItems = [
        { name: 'Dashboard', path: '/portal-command-center/dashboard', icon: FiBarChart2, desc: 'Global Analytics' },
        { name: 'Leads', path: '/portal-command-center/leads', icon: FiUsers, desc: 'Inbound Flow' },
        { name: 'Bulk Upload', path: '/portal-command-center/upload', icon: FiUpload, desc: 'Matrix Ingestion' },
        { name: 'Campaigns', path: '/portal-command-center/campaigns', icon: FiMessageSquare, desc: 'Broadcast Ops' },
    ];

    const currentPage = navItems.find(i => location.pathname.startsWith(i.path));

    return (
        <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden relative font-sans">
            {/* ─────────── MOBILE OVERLAY ─────────── */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
                        onClick={closeSidebar}
                    />
                )}
            </AnimatePresence>

            {/* ─────────── SIDEBAR / COMMAND PANEL ─────────── */}
            <aside className={`
                fixed lg:relative inset-y-0 left-0 w-80 bg-slate-950/50 backdrop-blur-2xl border-r border-white/5 
                flex flex-col z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Header Port */}
                <div className="p-8 border-b border-white/5 relative">
                    <button onClick={closeSidebar} className="lg:hidden absolute top-8 right-6 text-gray-500 hover:text-ku-gold transition-colors">
                        <FiX size={24} />
                    </button>

                    <Link to="/portal-command-center/dashboard" className="flex items-center gap-4 mb-8 group">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl p-2.5 border border-white/10 group-hover:border-ku-gold/50 transition-colors shadow-glow-sm">
                            <img src={logo} alt="KU" className="w-full h-full object-contain filter brightness-0 invert" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">Matrix <span className="text-ku-gold text-[10px]">v1.2</span></h2>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Kaveri University</p>
                        </div>
                    </Link>

                    <div className="glass-dark rounded-[2rem] p-4 border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-ku-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 bg-ku-gold rounded-full flex items-center justify-center text-ku-blue font-black text-sm shadow-glow-sm">
                                {(admin?.username || 'A')[0].toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-black text-white truncate">{admin?.username || 'Administrator'}</p>
                                <p className="text-[10px] text-ku-gold font-bold uppercase tracking-wider">Level 5 Access</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Primary Nav */}
                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto scrollbar-hide">
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] mb-4 px-4 flex items-center gap-2">
                        <FiShield className="text-ku-gold" /> System Modules
                    </p>
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link 
                                key={item.name} 
                                to={item.path}
                                onClick={closeSidebar}
                                className={`flex items-center px-6 py-4 rounded-[2rem] transition-all duration-300 group relative ${isActive ? 'bg-white text-ku-blue shadow-glow' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <Icon className={`mr-4 text-xl flex-shrink-0 ${isActive ? 'text-ku-blue' : 'text-gray-600 group-hover:text-ku-gold'}`} />
                                <div className="overflow-hidden">
                                    <p className={`font-black text-sm leading-tight uppercase italic tracking-tighter ${isActive ? '' : ''}`}>{item.name}</p>
                                    <p className={`text-[10px] font-medium leading-tight mt-0.5 ${isActive ? 'text-ku-blue/60 font-bold' : 'text-gray-600'}`}>{item.desc}</p>
                                </div>
                                {isActive && <motion.div layoutId="activeNav" className="absolute left-0 w-1.5 h-6 bg-ku-gold rounded-full -translate-x-full" />}
                            </Link>
                        );
                    })}

                    <div className="mt-10 pt-8 border-t border-white/5">
                        <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] mb-4 px-4">External Synchrony</p>
                        <a href="/" target="_blank" rel="noreferrer" className="flex items-center px-6 py-4 rounded-[2rem] text-gray-400 hover:bg-white/5 hover:text-white transition-all group">
                            <FiGlobe className="mr-4 text-xl text-gray-600 group-hover:text-ku-gold" />
                            <div>
                                <p className="font-black text-sm uppercase italic tracking-tighter">Live Portal</p>
                                <p className="text-[10px] font-medium text-gray-600 italic">View Public Interface</p>
                            </div>
                        </a>
                    </div>
                </nav>

                {/* Terminal Exit */}
                <div className="p-6 border-t border-white/5 bg-black/20">
                    <button onClick={handleLogout}
                        className="flex items-center w-full px-6 py-4 text-gray-500 hover:text-white hover:bg-red-500/10 rounded-[2rem] transition-all group group-hover:border-red-500/30 border border-transparent">
                        <FiLogOut className="mr-4 group-hover:text-red-500 group-hover:rotate-12 transition-transform" />
                        <span className="font-black uppercase tracking-widest text-xs">Terminate Session</span>
                    </button>
                    <div className="text-[9px] text-gray-700 text-center mt-6 font-black uppercase tracking-[0.4em] opacity-50">KU_CMD_CTR_026_MATRIX</div>
                </div>
            </aside>

            {/* ─────────── MASTER HUD ─────────── */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#020617] relative">
                {/* Background FX */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ku-blue/10 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {/* Tactical Header */}
                <header className="bg-slate-950/40 backdrop-blur-md border-b border-white/5 px-8 md:px-12 py-5 sticky top-0 z-40 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-gray-400 border border-white/10"
                        >
                            <FiMenu size={20} />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl md:text-2xl font-black text-white leading-none tracking-tighter uppercase italic">
                                    {currentPage?.name || 'System Overview'}
                                </h1>
                                <div className="h-6 w-[1px] bg-white/10 hidden md:block"></div>
                                <span className="hidden md:inline text-[10px] font-black text-ku-gold uppercase tracking-[0.3em]">{currentPage?.desc || 'Operational Matrix'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
                            <FiBell className="text-gray-500 hover:text-ku-gold cursor-pointer transition-colors" />
                            <div className="w-[1px] h-4 bg-white/10"></div>
                            <FiSettings className="text-gray-500 hover:text-ku-gold cursor-pointer transition-colors" />
                        </div>
                        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                            Link Active
                        </div>
                    </div>
                </header>

                {/* Viewport */}
                <div className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-12 relative z-10 custom-scrollbar">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={location.pathname}
                        className="max-w-[1600px] mx-auto"
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
