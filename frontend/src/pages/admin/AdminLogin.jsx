import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { FiUser, FiLock, FiEye, FiEyeOff, FiShield, FiGlobe, FiCpu, FiAlertCircle, FiCheckCircle, FiArrowRight, FiActivity } from 'react-icons/fi';
const logo = '/assets/images/logo.png';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiStatus, setApiStatus] = useState({ ok: null, msg: 'Initializing secure link...' });
    const { login, token, checkApiStatus } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) navigate('/portal-command-center/dashboard');
        
        const verifyConn = async () => {
            const status = await checkApiStatus();
            setApiStatus(status);
        };
        verifyConn();
    }, [token, navigate, checkApiStatus]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(username, password);
        if (success) {
            navigate('/portal-command-center/dashboard');
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-950 text-white perspective-view overflow-hidden">
            {/* ─────────── LEFT: 3D INFRASTRUCTURE ─────────── */}
            <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    <img src="/assets/images/gallery_125.jpeg" alt="Global Operations" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-ku-blue via-slate-950/80 to-transparent"></div>
                </motion.div>
                
                <div className="relative z-10 flex flex-col justify-between p-24 w-full">
                    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <img src={logo} alt="Kaveri University" className="h-16 w-auto filter brightness-0 invert" />
                    </motion.div>

                    <div className="max-w-xl">
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-ku-gold/20 text-ku-gold border border-ku-gold/40 font-black px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.5em] mb-10 inline-block shadow-glow"
                        >
                            Restricted Access Node
                        </motion.div>
                        <h1 className="text-8xl font-black mb-10 leading-none tracking-tighter uppercase italic">Central <span className="text-ku-gold">Command.</span></h1>
                        <p className="text-2xl text-blue-100/60 font-medium leading-relaxed italic">Synchronize admissions, monitor lead velocity, and orchestrate global campaigns from the core university matrix.</p>
                        
                        <div className="mt-16 flex items-center gap-8 opacity-40 grayscale">
                            <FiActivity size={32} />
                            <FiGlobe size={32} />
                            <FiShield size={32} />
                        </div>
                    </div>
                    
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">
                        System Protocol 3.0.0-PRO // Secure Transmission Optimized
                    </div>
                </div>
            </div>

            {/* ─────────── RIGHT: AUTH TERMINAL ─────────── */}
            <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ku-gold/5 rounded-full blur-[150px]"></div>
                
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-full max-w-md relative z-10"
                >
                    <Tilt perspective={1000} glareEnable={true} glareMaxOpacity={0.05}>
                        <div className="glass-dark border border-white/10 p-12 rounded-[3.5rem] shadow-4xl depth-shadow">
                            <div className="text-center mb-12">
                                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-4">Initialize <span className="text-ku-gold">Entry</span></h2>
                                
                                <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full text-[9px] uppercase font-black tracking-[0.2em] border transition-all duration-700 ${apiStatus.ok === true ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : apiStatus.ok === false ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                                    {apiStatus.ok === true ? <FiCheckCircle className="animate-bounce" /> : apiStatus.ok === false ? <FiAlertCircle className="animate-pulse" /> : <FiCpu className="animate-spin" />}
                                    {apiStatus.msg}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Personnel ID</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-ku-gold transition-colors">
                                            <FiUser size={18} />
                                        </span>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-ku-gold outline-none transition-all font-bold text-white tracking-widest uppercase text-sm"
                                            placeholder="USERNAME"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Security Factor</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-ku-gold transition-colors">
                                            <FiLock size={18} />
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-16 pr-16 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-ku-gold outline-none transition-all font-black text-white tracking-[0.5em]"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full group relative overflow-hidden bg-white text-ku-blue py-6 rounded-2xl font-black text-lg transition-all shadow-glow hover:bg-ku-gold active:scale-95 ${loading ? 'opacity-70' : ''}`}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-4 uppercase tracking-tighter italic">
                                        {loading ? 'Decrypting...' : 'Authorize Login'} <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </button>
                            </form>
                            
                            <div className="mt-12 text-center">
                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] leading-relaxed">
                                    Encrypted Multi-Factor Auth Active<br/>
                                    Unauthorized access will be logged.
                                </p>
                            </div>
                        </div>
                    </Tilt>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
