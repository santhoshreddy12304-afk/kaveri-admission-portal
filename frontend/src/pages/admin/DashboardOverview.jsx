import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { toast } from 'react-toastify';
import { FiUsers, FiMessageCircle, FiTrendingUp, FiMousePointer, FiCalendar, FiActivity, FiExternalLink, FiPlus, FiArrowRight } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { AuthContext } from '../../context/AuthContext';

const COLORS = ['#c9a227', '#3b82f6', '#10b981', '#f59e0b'];

const DashboardOverview = () => {
    const { admin } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalLeads: 0, todayLeads: 0, totalMessagesSent: 0, conversionClicks: 0 });
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    const weekData = [
        { name: 'Mon', leads: 38 }, { name: 'Tue', leads: 52 }, { name: 'Wed', leads: 29 },
        { name: 'Thu', leads: 67 }, { name: 'Fri', leads: 43 }, { name: 'Sat', leads: 31 }, { name: 'Sun', leads: 18 },
    ];

    const statusData = [
        { name: 'New', value: 45 }, { name: 'Called', value: 30 },
        { name: 'Interested', value: 16 }, { name: 'Enrolled', value: 9 },
    ];

    useEffect(() => {
        const fetch = async () => {
            try {
                const [lr, ar] = await Promise.all([axios.get('/api/leads/admin'), axios.get('/api/campaigns/analytics')]);
                
                const leadsData = Array.isArray(lr.data) ? lr.data : [];
                const analyticsData = ar.data && typeof ar.data === 'object' ? ar.data : {};
                
                const today = new Date().toDateString();
                setStats({
                    totalLeads: leadsData.length,
                    todayLeads: leadsData.filter(l => l && l.createdAt && new Date(l.createdAt).toDateString() === today).length,
                    totalMessagesSent: analyticsData.totalSent || 0,
                    conversionClicks: analyticsData.totalClicks || 0,
                });
                setLeads(leadsData.slice(0, 8));
            } catch (e) { 
                console.error('Dashboard data fetch error:', e);
                toast.error('Partial data load failure');
            }
            finally { setLoading(false); }
        };
        fetch();
    }, []);

    const kpiCards = [
        { title: 'Total Leads', value: stats.totalLeads, icon: FiUsers, color: 'from-blue-600 to-blue-900', sub: 'Global Enquiries' },
        { title: "Today's Intake", value: stats.todayLeads, icon: FiCalendar, color: 'from-ku-gold to-yellow-700', sub: 'Inbound Today' },
        { title: 'Transmissions', value: stats.totalMessagesSent, icon: FiMessageCircle, color: 'from-emerald-500 to-emerald-900', sub: 'WhatsApp Blast' },
        { title: 'Goal Reach', value: stats.conversionClicks, icon: FiMousePointer, color: 'from-purple-500 to-purple-900', sub: 'Link Conversions' },
    ];

    const getStatusStyle = (status) => {
        const map = { 
            new: 'bg-blue-500/10 text-blue-400 border-blue-500/20', 
            called: 'bg-purple-500/10 text-purple-400 border-purple-500/20', 
            interested: 'bg-green-500/10 text-green-400 border-green-500/20', 
            not_interested: 'bg-red-500/10 text-red-400 border-red-500/20', 
            enrolled: 'bg-ku-gold/10 text-ku-gold border-ku-gold/20' 
        };
        return map[status] || 'bg-white/5 text-gray-400 border-white/10';
    };

    return (
        <div className="bg-[#020617] min-h-screen text-white p-8 lg:p-12 relative overflow-hidden">
            {/* Background Data Stream Effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,191,0,0.3) 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
                    <div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-ku-gold/10 text-ku-gold border border-ku-gold/30 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-6 w-fit shadow-glow-sm"
                        >
                            Operational Command Center v4.0
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
                            System <span className="text-ku-gold">Overview.</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden lg:block">
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Global Sync Status</p>
                            <p className="text-emerald-400 font-black text-xs uppercase tracking-widest">Optimized & Concurrent</p>
                        </div>
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-glow-sm">
                            <FiActivity className="text-ku-gold animate-pulse" size={24} />
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {kpiCards.map((card, i) => (
                        <Tilt key={i} perspective={2000} scale={1.05}>
                            <div className="glass-dark border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-white/10 transition-all">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-glow-sm mb-6`}>
                                    <card.icon size={24} />
                                </div>
                                <h3 className="text-4xl font-black text-white italic tracking-tighter mb-1">{loading ? '—' : card.value.toLocaleString()}</h3>
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{card.title}</p>
                                <p className="text-gray-600 text-[10px] mt-1 font-medium italic">{card.sub}</p>
                            </div>
                        </Tilt>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-dark border border-white/5 p-10 rounded-[3rem]">
                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-10 flex items-center gap-4">
                             <FiTrendingUp className="text-ku-gold" /> Lead Velocity Cycle
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weekData}>
                                    <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ background: '#020617', border: '1px solid #ffffff10', borderRadius: '1rem' }} />
                                    <Bar dataKey="leads" fill="#FFB700" radius={[10, 10, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="glass-dark border border-white/5 p-10 rounded-[3rem]">
                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-10">Status Mesh</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} dataKey="value" paddingAngle={8}>
                                        {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
