import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as xlsx from 'xlsx';
import { FiSearch, FiDownload, FiFilter, FiTrash2, FiUser, FiMapPin, FiBook, FiCalendar } from 'react-icons/fi';

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
            toast.success('Status updated');
            setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
        } catch (error) { toast.error('Failed to update status'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) return;
        try {
            await axios.delete(`/api/leads/admin/${id}`);
            toast.success('Lead deleted successfully');
            setLeads(leads.filter(l => l._id !== id));
        } catch (error) { toast.error('Failed to delete lead'); }
    };

    const exportToExcel = () => {
        const data = filteredLeads.map(l => ({
            'Full Name': l.fullName, 'Mobile': l.mobileNumber, 'Email': l.email,
            'State': l.state, 'City': l.city, 'Course': l.interestedCourse,
            '12th %': l.twelfthPercentage, 'Status': l.status, 'Date': new Date(l.createdAt).toLocaleDateString()
        }));
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Leads");
        xlsx.writeFile(wb, `Kaveri_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'New Lead': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Contacted': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'Interested': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'Applied': return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'Admission Confirmed': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header & Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 tracking-tight">Leads Management</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage and track student enquiries ({filteredLeads.length} leads)</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <div className="relative flex-grow lg:flex-grow-0 min-w-[250px]">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Search name, phone, course..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-ku-blue focus:ring-1 focus:ring-ku-blue outline-none transition-all font-medium" />
                        </div>

                        <div className="relative">
                            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                                className="pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-ku-blue focus:ring-1 focus:ring-ku-blue outline-none appearance-none transition-all font-medium cursor-pointer">
                                <option value="All">All Statuses</option>
                                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <button onClick={exportToExcel} className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all hover:shadow-md transform hover:-translate-y-0.5 whitespace-nowrap">
                            <FiDownload /> Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Cards (Visible on lg and below) */}
            <div className="lg:hidden space-y-4 pb-10">
                {loading ? (
                    <div className="py-12 text-center text-gray-400">
                        <div className="w-6 h-6 border-2 border-ku-blue border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                        Loading Leads...
                    </div>
                ) : filteredLeads.length > 0 ? (
                    filteredLeads.map(lead => lead && (
                        <div key={lead._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-ku-blue font-black flex-shrink-0 text-xl">
                                        {(lead.fullName || '?')[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{lead.fullName || 'Unknown'}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '—'}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(lead._id)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg">
                                    <FiTrash2 />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile</p>
                                    <p className="text-sm font-bold text-gray-700">{lead.mobileNumber || '—'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Course</p>
                                    <p className="text-sm font-bold text-ku-blue truncate" title={lead.interestedCourse}>{lead.interestedCourse || '—'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                                    <p className="text-sm font-bold text-gray-700">{lead.city || ''}, {lead.state || ''}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Percentage</p>
                                    <p className="text-sm font-bold text-gray-700">{lead.twelfthPercentage || '0'}% (12th)</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lead Status</p>
                                <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                    className={`w-full text-xs font-bold rounded-xl px-4 py-3 border outline-none cursor-pointer appearance-none ${getStatusStyle(lead.status)}`}
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.2em 1.2em` }}
                                >
                                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                        <FiUser className="text-4xl text-gray-200 mx-auto mb-3" />
                        <p className="text-gray-500 font-bold">No leads found</p>
                    </div>
                )}
            </div>

            {/* Desktop Table (Hidden on mobile) */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Candidate Info</th>
                                <th className="py-4 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="py-4 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Academic Profile</th>
                                <th className="py-4 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="py-4 px-6 text-xs font-black text-gray-500 uppercase tracking-wider">Lead Status</th>
                                <th className="py-4 px-6 text-xs font-black text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="6" className="py-12 text-center text-gray-400"><div className="w-6 h-6 border-2 border-ku-blue border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>Loading Database...</td></tr>
                            ) : filteredLeads.length > 0 ? (
                                filteredLeads.map(lead => lead && (
                                    <tr key={lead._id} className="hover:bg-blue-50/50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-ku-blue font-black flex-shrink-0">
                                                    {(lead.fullName || '?')[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800">{lead.fullName || 'Unknown'}</p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                                        <span>{lead.mobileNumber || '—'}</span>
                                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                        <span className="truncate max-w-[120px]" title={lead.email}>{lead.email || 'No email'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm">
                                            <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                                                <FiMapPin className="text-gray-400" /> {lead.city || '—'}
                                            </div>
                                            <div className="text-xs text-gray-500 ml-5 mt-0.5">{lead.state || '—'}</div>
                                        </td>
                                        <td className="py-4 px-6 text-sm">
                                            <div className="flex items-center gap-1.5 font-bold text-ku-blue">
                                                <FiBook className="text-gray-400" /> <span className="truncate max-w-[150px]" title={lead.interestedCourse}>{lead.interestedCourse || '—'}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 ml-5 mt-0.5">12th Marks: <span className="font-bold text-gray-700">{lead.twelfthPercentage || '0'}%</span></div>
                                        </td>
                                        <td className="py-4 px-6 text-sm">
                                            <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                                                <FiCalendar className="text-gray-400" /> {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                                            </div>
                                            <div className="text-xs text-gray-400 ml-5 mt-0.5">{lead.createdAt ? new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                                className={`text-xs font-bold rounded-lg px-3 py-1.5 border outline-none cursor-pointer appearance-none ${getStatusStyle(lead.status)}`}
                                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.2rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.2em 1.2em`, paddingRight: `1.5rem` }}
                                            >
                                                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button onClick={() => handleDelete(lead._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100" title="Delete Lead">
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-16 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                                            <FiUser className="text-2xl text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">No Leads Found</h3>
                                        <p className="text-sm text-gray-500">Try adjusting your search filters or status criteria.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeadsManagement;
