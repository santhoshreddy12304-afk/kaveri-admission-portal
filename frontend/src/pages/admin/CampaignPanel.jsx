import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiSend, FiMessageSquare, FiUsers, FiCheckCircle, FiAlertCircle, FiActivity, FiZap, FiTarget, FiInfo, FiSmartphone } from 'react-icons/fi';

const CampaignPanel = () => {
    const [campaign, setCampaign] = useState({
        target: 'all',
        message: '',
        mediaUrl: ''
    });
    const [sending, setSending] = useState(false);
    const [stats, setStats] = useState(null);

    const handleSend = async () => {
        if (!campaign.message) {
            toast.error('Matrix transmission requires a message payload.');
            return;
        }
        setSending(true);
        try {
            const res = await axios.post('/api/leads/admin/campaign', campaign);
            setStats(res.data);
            toast.success(`Broadcast successful: ${res.data.count} signals transmitted.`);
            setCampaign({ target: 'all', message: '', mediaUrl: '' });
        } catch (error) {
            toast.error('Transmission failure: Interference in the comms channel.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            {/* Header Hub */}
            <div className="text-center space-y-4">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 text-ku-gold shadow-glow-sm mb-4"
                >
                    <FiSend size={32} />
                </motion.div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Broadcast <span className="text-ku-gold">Matrix.</span></h2>
                <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.4em] italic">Omni-Channel Signal Dispatch / V2.0</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Comms Terminal */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-dark border border-white/10 rounded-[3rem] p-10 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-ku-gold rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
                        
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                <FiTarget className="text-ku-gold" /> Target Sub-Matrix
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['all', 'engineering', 'management', 'applied-sciences'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setCampaign({ ...campaign, target: t })}
                                        className={`
                                            py-4 px-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all
                                            ${campaign.target === t 
                                                ? 'bg-white text-ku-blue border-white shadow-glow-sm' 
                                                : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/20'}
                                        `}
                                    >
                                        {t.replace('-', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                <FiMessageSquare className="text-ku-gold" /> Signal Payload (WhatsApp/SMS)
                            </label>
                            <textarea
                                value={campaign.message}
                                onChange={(e) => setCampaign({ ...campaign, message: e.target.value })}
                                placeholder="Enter digital signal content..."
                                className="w-full h-48 bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 text-white text-sm font-medium focus:outline-none focus:border-ku-gold/50 transition-all placeholder:text-gray-700 italic"
                            ></textarea>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                <FiZap className="text-ku-gold" /> Media Attachment URI
                            </label>
                            <input
                                type="text"
                                value={campaign.mediaUrl}
                                onChange={(e) => setCampaign({ ...campaign, mediaUrl: e.target.value })}
                                placeholder="https://cloud.storage/asset.jpg"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white text-xs font-mono focus:outline-none focus:border-ku-gold/50 transition-all placeholder:text-gray-700"
                            />
                        </div>

                        <button
                            onClick={handleSend}
                            disabled={sending}
                            className={`
                                w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.5em] transition-all relative overflow-hidden group
                                ${sending ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-white text-ku-blue shadow-glow hover:bg-ku-gold active:scale-[0.98]'}
                            `}
                        >
                            {sending ? (
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-4 h-4 border-2 border-ku-blue border-t-transparent rounded-full animate-spin"></div>
                                    <span>Transmitting Signal...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <FiSend /> <span>Execute Broadcast</span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Intel HUD */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Live Mobile Preview */}
                    <div className="glass-dark border border-white/10 rounded-[3rem] p-6 shadow-4xl relative overflow-hidden">
                         <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20"></div>
                         <div className="bg-[#0b141a] rounded-[2.5rem] p-4 pt-10 border-4 border-white/5 h-[450px] flex flex-col relative">
                            {/* WhatsApp Header Mock */}
                            <div className="bg-white/5 -mx-4 -mt-10 pt-10 pb-3 px-4 flex items-center gap-3 border-b border-white/5 mb-4">
                                <div className="w-8 h-8 rounded-full bg-ku-gold/20 flex items-center justify-center font-black text-ku-gold text-[10px]">KU</div>
                                <div>
                                    <p className="text-[11px] font-black text-white italic">Kaveri University</p>
                                    <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1"><span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></span> Verified Node</p>
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto space-y-4">
                                <AnimatePresence mode="popLayout">
                                    {campaign.message && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.9, x: -20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            className="bg-white/[0.03] border border-white/5 rounded-2xl rounded-tl-none p-3 max-w-[85%]"
                                        >
                                            {campaign.mediaUrl && (
                                                <div className="aspect-video bg-white/5 rounded-lg mb-2 overflow-hidden border border-white/5">
                                                    <img src={campaign.mediaUrl} alt="Payload" className="w-full h-full object-cover opacity-50" />
                                                </div>
                                            )}
                                            <p className="text-[10px] text-gray-400 font-medium whitespace-pre-wrap leading-relaxed">{campaign.message}</p>
                                            <p className="text-[8px] text-gray-600 text-right mt-1 italic">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                         </div>
                    </div>

                    <div className="glass-dark border border-white/5 p-8 rounded-[3rem] space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                <FiInfo className="text-ku-gold" /> Transmission Protocols
                            </h4>
                            <div className="space-y-4">
                                {[
                                    { label: 'Priority', val: 'Level 1 / Immediate', color: 'text-emerald-400' },
                                    { label: 'Encryption', val: 'AES-256 Bit Tunnel', color: 'text-ku-gold' },
                                    { label: 'Latency', val: '< 250ms per signal', color: 'text-blue-400' },
                                ].map((p, i) => (
                                    <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                                        <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{p.label}</p>
                                        <p className={`text-[11px] font-black uppercase italic ${p.color}`}>{p.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-ku-gold/10 border border-ku-gold/20 rounded-2xl p-6">
                            <h5 className="text-[10px] font-black text-ku-gold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                <FiAlertCircle /> Compliance Note
                            </h5>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">
                                Ensure all signals comply with digital privacy regulations. Unauthorized broadcasting may trigger matrix lockouts.
                            </p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {stats && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-dark border border-emerald-500/20 bg-emerald-500/[0.05] p-8 rounded-[3rem] text-center"
                            >
                                <FiCheckCircle className="text-emerald-400 mx-auto mb-4" size={32} />
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2">Transmission Log</h4>
                                <div className="text-4xl font-black text-white italic tracking-tighter mb-1">{stats.count}</div>
                                <p className="text-[9px] text-emerald-400/70 font-black uppercase tracking-widest">Signals Delivered</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default CampaignPanel;
