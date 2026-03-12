import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FiUsers, FiMessageCircle, FiTrendingUp, FiMousePointer, FiCalendar, FiActivity, FiExternalLink } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { AuthContext } from '../../context/AuthContext';

const COLORS = ['#0a192f', '#c9a227', '#10b981', '#f59e0b'];

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

    const courseData = [
        { course: 'B.Tech CSE', count: 112 }, { course: 'MBA', count: 78 }, { course: 'B.Sc Agriculture', count: 65 },
        { course: 'B.Tech AI&ML', count: 54 }, { course: 'Others', count: 41 },
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
                    todayLeads: leadsData.filter(l => l.createdAt && new Date(l.createdAt).toDateString() === today).length,
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
        { title: 'Total Leads', value: stats.totalLeads, icon: FiUsers, color: 'from-ku-blue to-blue-700', sub: 'All time enquiries' },
        { title: "Today's Leads", value: stats.todayLeads, icon: FiCalendar, color: 'from-green-500 to-green-700', sub: 'New today' },
        { title: 'Messages Sent', value: stats.totalMessagesSent, icon: FiMessageCircle, color: 'from-purple-500 to-purple-700', sub: 'WhatsApp campaigns' },
        { title: 'Link Clicks', value: stats.conversionClicks, icon: FiMousePointer, color: 'from-yellow-500 to-orange-500', sub: 'Admission page opens' },
    ];

    const getStatusBadge = (status) => {
        const map = { new: 'bg-blue-100 text-blue-700', called: 'bg-purple-100 text-purple-700', interested: 'bg-green-100 text-green-700', not_interested: 'bg-red-100 text-red-700', enrolled: 'bg-yellow-100 text-yellow-700' };
        return map[status] || 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-ku-blue to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{backgroundImage:'url(/assets/images/gallery_113.jpeg)', backgroundSize:'cover'}}></div>
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <p className="text-blue-200 text-sm font-medium mb-1">Welcome back,</p>
                        <h2 className="text-2xl font-black">{admin?.username || 'Admin'} 👋</h2>
                        <p className="text-blue-200 text-sm mt-1">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2 justify-end text-green-300 mb-1">
                            <FiActivity className="animate-pulse" /> <span className="text-sm font-bold">System Live</span>
                        </div>
                        <p className="text-blue-200 text-xs">Admissions 2026-27 Active</p>
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {kpiCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}>
                                    <Icon size={20} />
                                </div>
                                <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-lg">↑ Live</span>
                            </div>
                            <p className="text-3xl font-black text-gray-800 mb-1">{loading ? '—' : card.value}</p>
                            <p className="text-gray-700 font-bold text-sm">{card.title}</p>
                            <p className="text-gray-400 text-xs">{card.sub}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Bar Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <h3 className="text-lg font-black text-gray-800 mb-5 flex items-center gap-2"><FiTrendingUp className="text-ku-blue" /> Lead Acquisition — This Week</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weekData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="leads" fill="#0a192f" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <h3 className="text-lg font-black text-gray-800 mb-5">Lead Status Split</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                                    {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Course demand + Recent Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Course chart */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <h3 className="text-lg font-black text-gray-800 mb-5">Top Courses by Demand</h3>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={courseData} layout="vertical">
                                <XAxis type="number" tick={{ fontSize: 11 }} />
                                <YAxis dataKey="course" type="category" tick={{ fontSize: 10 }} width={90} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                                <Bar dataKey="count" fill="#c9a227" radius={[0, 6, 6, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Leads */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-black text-gray-800">Recent Leads</h3>
                        <a href="/admin/leads" className="text-ku-blue text-sm font-bold flex items-center gap-1 hover:underline"><FiExternalLink /> View All</a>
                    </div>
                    {loading ? (
                        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-10 bg-gray-100 animate-pulse rounded-xl" />)}</div>
                    ) : (
                        <div className="space-y-3 overflow-auto max-h-48">
                            {leads.map((lead, i) => (
                                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-ku-blue to-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-black">
                                            {(lead.fullName || 'N')[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{lead.fullName || 'Unknown'}</p>
                                            <p className="text-gray-400 text-xs">{lead.interestedCourse || 'N/A'} · {lead.city || ''}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className={`text-xs px-3 py-1 rounded-full font-bold capitalize ${getStatusBadge(lead.status)}`}>{lead.status || 'new'}</span>
                                        <p className="text-gray-400 text-xs mt-1">{lead.mobileNumber || ''}</p>
                                    </div>
                                </div>
                            ))}
                            {leads.length === 0 && <p className="text-gray-400 text-center py-6 text-sm">No leads yet. Share the admission page to start!</p>}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { href: '/portal-command-center/leads', label: 'Manage Leads', icon: '👥', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
                    { href: '/portal-command-center/upload', label: 'Bulk Upload', icon: '📤', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
                    { href: '/portal-command-center/campaigns', label: 'Send Campaign', icon: '📨', color: 'bg-green-50 border-green-200 hover:bg-green-100' },
                    { href: '/', label: 'View Website', icon: '🌐', color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100' },
                ].map(action => (
                    <a key={action.label} href={action.href} className={`${action.color} border rounded-2xl p-5 text-center transition-all hover:-translate-y-1 cursor-pointer`}>
                        <div className="text-3xl mb-2">{action.icon}</div>
                        <p className="font-black text-gray-700 text-sm">{action.label}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default DashboardOverview;
