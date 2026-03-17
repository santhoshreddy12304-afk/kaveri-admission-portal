import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import * as xlsx from 'xlsx';
import { FiSearch, FiDownload, FiFilter, FiTrash2, FiUser, FiMapPin, FiBook, FiCalendar, FiSmartphone, FiEdit3, FiChevronRight } from 'react-icons/fi';

const LeadsManagement = () => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const statusOptions = ['New Lead', 'Contacted', 'Interested', 'Applied', 'Admission Confirmed'];

    useEffect(() => { fetchLeads(); }, []);

    useEffect(() => {
        let result = leads;
        if (statusFilter !== 'All') result = result.filter(l => l.status === statusFilter);
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            result = result.filter(l =>
                (l.fullName || '').toLowerCase().includes(lower) ||
                (l.mobileNumber || '').includes(searchTerm) ||
                (l.interestedCourse || '').toLowerCase().includes(lower)
            );
        }
        setFilteredLeads(result);
    }, [leads, searchTerm, statusFilter]);

    const fetchLeads = async () => {
        try {
            const res = await axios.get('/api/leads/admin');
            const data = Array.isArray(res.data) ? res.data : [];
            setLeads(data);
            setFilteredLeads(data);
        } catch (error) { 
            console.error('Fetch leads error:', error);
            toast.error('Failed to fetch leads'); 
        }
        finally { setLoading(false); }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`/api/leads/admin/${id}`, { status: newStatus });
            toast.success('Matrix updated: Lead status synchronized.');
            setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
        } catch (error) { toast.error('Synchronization failed.'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('IRREVERSIBLE ACTION: Purge this record from matrix?')) return;
        try {
            await axios.delete(`/api/leads/admin/${id}`);
            toast.success('Record purged.');
            setLeads(leads.filter(l => l._id !== id));
        } catch (error) { toast.error('Purge failed.'); }
    };

    const exportToExcel = () => {
        const data = filteredLeads.map(l => ({
            'Full Name': l.fullName, 'Mobile': l.mobileNumber, 'Email': l.email,
            'State': l.state, 'City': l.city, 'Course': l.interestedCourse,
            '12th %': l.twelfthPercentage, 'Status': l.status, 'Date': new Date(l.createdAt).toLocaleDateString()
        }));
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Matrix_Export");
        xlsx.writeFile(wb, `KU_Intelligence_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'New Lead': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Contacted': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'Interested': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'Applied': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'Admission Confirmed': return 'bg-green-500/10 text-green-400 border-green-500/20';
            default: return 'bg-white/5 text-gray-500 border-white/10';
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Tactical Filter Hub */}
            <div className="glass-dark border border-white/5 p-8 rounded-[3rem] shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ku-gold/40 to-transparent"></div>
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 relative z-10">
                    <div>
                        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Leads <span className="text-ku-gold text-xl italic font-bold">Inbound Queue</span></h2>
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest mt-1 italic">Total Filtered: {filteredLeads.length} / Matrix Density: {leads.length}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                        <div className="relative flex-grow lg:flex-grow-0 min-w-[300px]">
                            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" placeholder="FILTER BY IDENTITY, CHANNEL OR COURSE..." 
                                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:bg-white/10 focus:border-ku-gold focus:ring-1 focus:ring-ku-gold outline-none transition-all placeholder:text-gray-600" 
                            />
                        </div>

                        <div className="relative">
                            <FiFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <select 
                                value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                                className="pl-14 pr-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest focus:bg-white/10 focus:border-ku-gold outline-none appearance-none transition-all cursor-pointer text-white"
                            >
                                <option value="All" className="bg-slate-900">All Statuses</option>
                                {statusOptions.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs flex flex-col gap-0.5"><div className="w-1 h-1 bg-current rounded-full" /><div className="w-1 h-1 bg-current rounded-full" /></div>
                        </div>

                        <button onClick={exportToExcel} className="flex items-center gap-3 bg-white text-ku-blue px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-glow-sm hover:bg-ku-gold transition-all active:scale-95 group">
                            <FiDownload className="group-hover:translate-y-1 transition-transform" /> Export Intelligence
                        </button>
                    </div>
                </div>
            </div>

            {/* Matrix Sheet */}
            <div className="glass-dark border border-white/5 rounded-[3.5rem] overflow-hidden shadow-4xl relative">
                {/* Horizontal progress mock on top */}
                <div className="h-1 bg-white/5 w-full relative">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: loading ? '60%' : '100%' }} 
                        className={`h-full bg-ku-gold shadow-[0_0_10px_#c9a227] transition-all duration-1000 ${loading ? 'animate-pulse' : ''}`}
                    />
                </div>
                
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left whitespace-nowrap border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-white/[0.02]">
                                <th className="py-6 px-10 text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] italic leading-none border-b border-white/5">Signal Identity</th>
                                <th className="py-6 px-8 text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] italic leading-none border-b border-white/5">Coordinates</th>
                                <th className="py-6 px-8 text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] italic leading-none border-b border-white/5">Academic Profile</th>
                                <th className="py-6 px-8 text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] italic leading-none border-b border-white/5">Time Log</th>
                                <th className="py-6 px-8 text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] italic leading-none border-b border-white/5">Sync Status</th>
                                <th className="py-6 px-10 text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] italic leading-none border-b border-white/5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            <AnimatePresence>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="py-24 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-12 h-12 border-2 border-ku-gold border-t-transparent rounded-full animate-spin"></div>
                                                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] animate-pulse">Scanning Matrix Records...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredLeads.length > 0 ? (
                                    filteredLeads.map((lead, idx) => (
                                        <motion.tr 
                                            key={lead._id} // Use lead._id for unique key
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <td className="px-10 py-8 font-mono text-[10px] text-gray-500">#{1000 + idx}</td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black text-ku-gold border border-white/10 group-hover:bg-ku-gold group-hover:text-ku-blue transition-all">
                                                        {(lead.fullName || '?')[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-xl italic tracking-tighter uppercase">{lead.fullName || 'Signal Pending'}</p>
                                                        <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mt-1">{lead.city || 'GLOBAL'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold text-gray-300 italic">{lead.email}</p>
                                                    <p className="text-xs font-bold text-gray-500">{lead.mobileNumber}</p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className="text-[10px] font-black bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full uppercase tracking-widest">{lead.interestedCourse || 'GENERAL'}</span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <p className="text-2xl font-black text-white italic tracking-tighter">{lead.twelfthPercentage || '0'}%</p>
                                            </td>
                                            <td className="px-10 py-8">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                                    className={`text-[9px] font-black uppercase tracking-[0.2em] italic rounded-xl px-4 py-2 border outline-none cursor-pointer appearance-none transition-all ${getStatusStyle(lead.status)} shadow-glow-sm`}
                                                >
                                                    {statusOptions.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <button onClick={() => handleDelete(lead._id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 transition-all border border-red-500/20">
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="7" className="py-32 text-center text-[10px] font-black uppercase tracking-widest italic text-gray-500">No signals detected in grid.</td></tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeadsManagement;
