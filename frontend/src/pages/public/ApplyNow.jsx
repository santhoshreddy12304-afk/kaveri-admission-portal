import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiAward, FiPhoneCall, FiFileText, FiChevronRight } from 'react-icons/fi';
import { Sparkles, Zap, ShieldCheck, Target, GraduationCap, MapPin } from 'lucide-react';

const courses = [
    // Engineering
    "B.Tech CSE (Core)", "B.Tech CSE - AI & ML", "B.Tech CSE - Data Science",
    "B.Tech CSE - Robotics & Automation", "B.Tech CSE - Cyber Security", "B.Tech CSE - Internet of Technology",
    "B.Tech ECE (Core)", "M.Tech CSE", "M.Tech AI & ML", "Ph.D. (CSE)",
    // Agriculture
    "B.Sc (Hons.) Agriculture", "B.Sc (Hons.) Horticulture", "M.Sc Agronomy",
    "M.Sc Genetics & Plant Breeding", "M.Sc Entomology", "Ph.D. Agriculture",
    // Management
    "BBA General", "MBA General", "MBA Finance", "MBA Marketing", "MBA HRM",
];

const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

const ApplyNow = () => {
    const [formData, setFormData] = useState({
        fullName: '', mobileNumber: '', email: '', state: '',
        city: '', interestedCourse: '', twelfthPercentage: '', message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Live scholarship calculator
    const scholarship = useMemo(() => {
        const pct = parseFloat(formData.twelfthPercentage);
        if (!pct) return null;
        if (pct >= 90) return { fee: '₹75,000', annual: '₹1.5 Lakh', save: '₹1.5 Lakh', badge: '🏆 50% Scholarship', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
        if (pct >= 70) return { fee: '₹87,500', annual: '₹1.75 Lakh', save: '₹1.25 Lakh', badge: '⭐ 42% Scholarship', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
        if (pct >= 60) return { fee: '₹1,00,000', annual: '₹2 Lakh', save: '₹1 Lakh', badge: '✅ 33% Scholarship', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
        return { fee: '₹1,50,000', annual: '₹3 Lakh', save: '₹0', badge: 'Standard Fee', color: 'text-gray-400', bg: 'bg-slate-800/50', border: 'border-white/10' };
    }, [formData.twelfthPercentage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/leads', formData);
            toast.success('🎉 Application transmitted! Stand by for expert consultation.');
            setSubmitted(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Transmission failed. Network error.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-ku-blue opacity-50 blur-[150px]"></div>
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass-dark rounded-[4rem] border border-white/10 p-16 text-center max-w-xl w-full relative z-10 depth-shadow"
                >
                    <div className="text-8xl mb-8 animate-bounce">🚀</div>
                    <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter">Transmission <br/><span className="text-ku-gold italic font-black">Complete.</span></h1>
                    <p className="text-gray-400 text-xl mb-10 font-medium">Your credentials have been securely stored. A regional counselor will interface with you within <span className="text-white font-black italic">24 Deca-hours.</span></p>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 text-left">
                        <h3 className="font-black text-ku-gold mb-4 uppercase text-xs tracking-[0.3em]">Protocol Lifecycle</h3>
                        <div className="space-y-4">
                            {[
                                'Counsellor verify credentials',
                                'Scholarship certification check',
                                'Academic Roadmap generation',
                                'On-campus induction invite'
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-4 text-gray-300 font-bold">
                                    <div className="w-2 h-2 rounded-full bg-ku-gold"></div>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.a 
                            whileHover={{ scale: 1.05 }}
                            href="https://wa.me/919666041795?text=Hi%2C%20I%20just%20completed%20my%20digital%20application%20at%20Kaveri%20University" target="_blank" rel="noreferrer" 
                            className="bg-green-600 text-white py-5 rounded-[2rem] font-black text-xl hover:bg-green-500 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(22,163,74,0.3)]"
                        >
                            WhatsApp Core
                        </motion.a>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Link to="/" className="border border-white/20 text-white py-5 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all block backdrop-blur-3xl">
                                Exit to Hub
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 perspective-view overflow-x-hidden text-white">
            {/* ─────────── HEADER ─────────── */}
            <div className="bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900 py-24 relative overflow-hidden border-b border-white/10 shadow-2xl">
                <div className="absolute inset-0 opacity-20 scale-110" style={{backgroundImage:'url(/assets/images/gallery_113.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-ku-blue/60 backdrop-blur-sm"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ku-gold opacity-10 blur-[150px]"></div>
                
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-6"
                    >
                        <span className="bg-ku-gold/20 text-ku-gold border border-ku-gold/40 font-black px-8 py-2 rounded-full text-xs uppercase tracking-[0.5em] shadow-lg">
                            Admission Gateway 2026
                        </span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter">Your Future <br/><span className="text-ku-gold italic font-black">Digital.</span></h1>
                    <p className="text-2xl text-blue-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">Initiate your professional metamorphosis. Free digital application in <span className="text-white font-black italic">120 Seconds.</span></p>
                    
                    <div className="flex justify-center flex-wrap gap-8 mt-12">
                        {[
                            { icon: <ShieldCheck size={30} />, label: 'Verified Pathway' },
                            { icon: <Target size={30} />, label: 'Merit Aligned' },
                            { icon: <Zap size={30} />, label: 'Pulse Support' },
                            { icon: <GraduationCap size={30} />, label: 'Elite Faculty' }
                        ].map(({ icon, label }) => (
                            <motion.div 
                                key={label} 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center group"
                            >
                                <div className="text-ku-gold mb-3 flex justify-center group-hover:scale-110 transition-transform origin-bottom">{icon}</div>
                                <div className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] font-mono">{label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─────────── FORM ECOSYSTEM ─────────── */}
            <div className="container mx-auto px-4 py-20 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* ──── APPLICATION CORE ──── */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 glass-dark rounded-[4rem] border border-white/10 shadow-3xl depth-shadow relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ku-gold to-transparent"></div>
                        <div className="bg-ku-gold/10 px-12 py-8 border-b border-white/5">
                            <h2 className="text-3xl font-black text-white tracking-tight uppercase">Step 01: <span className="text-ku-gold italic font-black">Identity Matrix</span></h2>
                            <p className="text-gray-400 font-medium text-lg">Input your raw credentials for cross-verification.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-12 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {[
                                    { label: 'CANDIDATE NAME', name: 'fullName', type: 'text', placeholder: 'Legal Full Name', required: true },
                                    { label: 'CONTACT FREQUENCY', name: 'mobileNumber', type: 'tel', placeholder: '+91 Primary Number', required: true },
                                    { label: 'DIGITAL ADDRESS', name: 'email', type: 'email', placeholder: 'Official Email', required: true },
                                    { label: 'GEOGRAPHIC NODE', name: 'city', type: 'text', placeholder: 'Current City', required: true },
                                ].map(field => (
                                    <div key={field.name} className="space-y-3">
                                        <label className="text-[10px] text-ku-gold font-black uppercase tracking-[0.3em] ml-4">{field.label}</label>
                                        <input
                                            type={field.type} name={field.name} value={formData[field.name]}
                                            onChange={handleChange} placeholder={field.placeholder} required={field.required}
                                            className="w-full bg-slate-800/50 text-white px-8 py-5 rounded-[2rem] border border-white/10 focus:border-ku-gold outline-none transition-all placeholder:text-gray-600 font-bold text-lg"
                                        />
                                    </div>
                                ))}

                                <div className="space-y-3">
                                    <label className="text-[10px] text-ku-gold font-black uppercase tracking-[0.3em] ml-4">STATE REGION</label>
                                    <select name="state" value={formData.state} onChange={handleChange} required className="w-full bg-slate-800/50 text-white px-8 py-5 rounded-[2rem] border border-white/10 focus:border-ku-gold outline-none transition-all font-bold text-lg appearance-none">
                                        <option value="" disabled className="bg-slate-900">Select Region</option>
                                        {states.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] text-ku-gold font-black uppercase tracking-[0.3em] ml-4">PROGRAM TARGET</label>
                                    <select name="interestedCourse" value={formData.interestedCourse} onChange={handleChange} required className="w-full bg-slate-800/50 text-white px-8 py-5 rounded-[2rem] border border-white/10 focus:border-ku-gold outline-none transition-all font-bold text-lg appearance-none">
                                        <option value="" disabled className="bg-slate-900">Select Pathway</option>
                                        {courses.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                    </select>
                                </div>

                                <div className="md:col-span-2 space-y-4">
                                    <label className="text-[10px] text-ku-gold font-black uppercase tracking-[0.3em] ml-4">
                                        ACADEMIC INDEX (12th %) <Zap size={10} className="inline ml-2 animate-pulse" />
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step="0.01" min="0" max="100" name="twelfthPercentage"
                                            value={formData.twelfthPercentage} onChange={handleChange}
                                            className="w-full bg-slate-800/50 text-white px-8 py-6 rounded-[2.5rem] border-2 border-white/5 focus:border-ku-gold outline-none transition-all font-black text-3xl placeholder:text-gray-600"
                                            placeholder="85.50" required
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-700 font-black text-2xl">%</div>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {scholarship && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0, rotateX: -20 }}
                                                animate={{ height: 'auto', opacity: 1, rotateX: 0 }}
                                                exit={{ height: 0, opacity: 0, rotateX: -20 }}
                                                className={`overflow-hidden rounded-[3rem] border ${scholarship.border} ${scholarship.bg} p-12 mt-8 relative group/card perspective-view shadow-glow-sm`}
                                            >
                                                {/* Matrix HUD Overlays */}
                                                <div className="absolute top-4 right-8 flex gap-4 opacity-20 group-hover/card:opacity-100 transition-opacity">
                                                    <div className="text-[8px] font-mono text-ku-gold uppercase tracking-[0.4em]">Node: S_CALC_v4</div>
                                                    <div className="text-[8px] font-mono text-emerald-500 uppercase tracking-[0.4em]">Sync: Verified</div>
                                                </div>

                                                <div className="absolute -top-10 -right-10 w-60 h-60 bg-white opacity-5 blur-3xl rounded-full"></div>
                                                <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                                                    <div>
                                                        <motion.div 
                                                            initial={{ x: -20 }}
                                                            animate={{ x: 0 }}
                                                            className="flex items-center gap-3 mb-6"
                                                        >
                                                            <div className="w-2 h-2 bg-ku-gold rounded-full animate-ping"></div>
                                                            <span className={`font-black text-xs uppercase tracking-[0.4em] ${scholarship.color}`}>{scholarship.badge}</span>
                                                        </motion.div>
                                                        <h4 className="text-white font-black text-5xl tracking-tighter uppercase italic">Fee: <span className="text-ku-gold">{scholarship.fee}</span> <span className="text-sm text-gray-500">/ SEM</span></h4>
                                                        <p className="text-gray-400 font-bold mt-4 italic text-lg leading-relaxed">Annual Operational Savings: <span className="text-ku-gold underline decoration-ku-gold/30">{scholarship.save}</span></p>
                                                    </div>
                                                    <div className="bg-white/5 backdrop-blur-3xl px-12 py-8 rounded-[2.5rem] border border-white/10 text-center shadow-inner group-hover/card:bg-white/10 transition-colors">
                                                        <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.5em] mb-2 font-mono">Status</p>
                                                        <p className="text-emerald-400 font-black text-3xl tracking-tighter italic">QUALIFIED</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="md:col-span-2 space-y-3">
                                    <label className="text-[10px] text-ku-gold font-black uppercase tracking-[0.3em] ml-4">SUPPORT QUERIES</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} rows="4"
                                        className="w-full bg-slate-800/50 text-white px-8 py-6 rounded-[2.5rem] border border-white/10 focus:border-ku-gold outline-none transition-all placeholder:text-gray-600 font-bold text-lg resize-none"
                                        placeholder="Any specific architectural preferences or scholarship queries?" />
                                </div>
                            </div>

                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit" 
                                disabled={loading}
                                className={`w-full py-8 rounded-[3rem] font-black text-ku-blue bg-gradient-to-r from-ku-gold to-yellow-400 text-3xl tracking-tighter transition-all flex justify-center items-center gap-6 ${loading ? 'opacity-70 cursor-not-allowed' : 'shadow-[0_25px_50px_rgba(255,191,0,0.3)] hover:shadow-[0_30px_70px_rgba(255,191,0,0.5)]'}`}
                            >
                                {loading ? 'Transmitting Core...' : <><Zap /> DISPATCH APPLICATION</>}
                            </motion.button>
                            <p className="text-center text-xs text-gray-500 font-black uppercase tracking-[0.4em]">Encrypted Session · Zero Processing Fee · 24HR Callback</p>
                        </form>
                    </motion.div>

                    {/* ──── SIDEBAR SYSTEM ──── */}
                    <div className="lg:col-span-4 space-y-12">

                        {/* HIGH PRIORITY NOTICE */}
                        <Tilt perspective={1000} scale={1.05} glareEnable={true} glareMaxOpacity={0.2}>
                            <div className="bg-gradient-to-br from-red-600 to-red-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-3xl depth-shadow animate-pulse-subtle">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 blur-3xl"></div>
                                <div className="relative z-10">
                                    <div className="bg-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">CRITICAL STATUS</div>
                                    <h3 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-none">Admission <br/><span className="text-ku-gold italic">Closing.</span></h3>
                                    <p className="text-red-100 font-bold text-lg mb-8 leading-tight">Current cohort capacity reached <span className="text-white font-black underline">87%</span>. Protocol expiry: June 30.</p>
                                    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-5 border border-white/5">
                                        <p className="font-black text-white text-xl uppercase tracking-widest text-center">Protocol: ACTIVE</p>
                                    </div>
                                </div>
                            </div>
                        </Tilt>

                        {/* SCHOLARSHIP PROTOCOLS */}
                        <div className="glass-dark rounded-[3.5rem] p-12 border border-white/10 shadow-3xl">
                            <h3 className="text-2xl font-black text-white mb-8 border-b border-white/5 pb-6 flex items-center gap-4 uppercase tracking-tight">
                                <FiAward className="text-ku-gold" /> Merit Protocols
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { marks: '90%+', fee: '75K', badge: 'Tier 1 Alpha', color: 'bg-green-500', pct: '50%' },
                                    { marks: '70%+', fee: '87K', badge: 'Tier 2 Beta', color: 'bg-blue-500', pct: '42%' },
                                    { marks: '60%+', fee: '1L', badge: 'Tier 3 Gamma', color: 'bg-ku-gold', pct: '33%' },
                                ].map(t => (
                                    <div key={t.marks} className="group relative">
                                        <div className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5 group-hover:bg-white/10 transition-all cursor-default">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${t.color}`}></div>
                                                    <span className="text-gray-400 text-xs font-black uppercase tracking-widest">{t.badge}</span>
                                                </div>
                                                <p className="text-white font-black text-xl mt-1">{t.marks} Index</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-ku-gold font-black text-2xl italic leading-none">{t.pct}</p>
                                                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mt-1">Reduction</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WHATSAPP CORE */}
                        <Tilt perspective={1000} scale={1.05}>
                            <a href="https://wa.me/919666041795?text=Hi%2C%20I%20am%20requesting%20admission%20interface%20at%20Kaveri%20University" target="_blank" rel="noreferrer"
                                className="block bg-green-600 text-white rounded-[3rem] p-10 text-center shadow-3xl hover:bg-green-500 transition-all border border-green-400/30 group depth-shadow"
                            >
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">💬</div>
                                <h3 className="text-3xl font-black mb-1">WhatsApp Hub</h3>
                                <p className="text-green-100 font-bold text-lg mb-6 opacity-80 uppercase tracking-widest text-xs">Direct Core Induction</p>
                                <div className="bg-white/20 backdrop-blur-md py-4 rounded-2xl font-black text-2xl tracking-tighter">96660 41795</div>
                            </a>
                        </Tilt>

                        {/* INFRASTRUCTURE LINKS */}
                        <div className="glass-dark rounded-[3.5rem] p-12 border border-white/10 space-y-8">
                            <h3 className="text-2xl font-black text-white flex items-center gap-4 uppercase tracking-tight">
                                <FiPhoneCall className="text-ku-gold" /> Critical Contact
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-white/5 rounded-xl text-ku-gold"><MapPin size={20} /></div>
                                    <p className="text-gray-400 font-bold text-sm leading-relaxed uppercase tracking-tighter">Global Hub, Gowraram Village, Hyderabad, TG – 502279</p>
                                </div>
                                <motion.a href="tel:9666041795" whileHover={{ x: 5 }} className="flex items-center gap-5 group">
                                    <div className="p-3 bg-white/5 rounded-xl text-ku-gold group-hover:bg-ku-gold group-hover:text-ku-blue transition-colors"><FiPhoneCall size={20} /></div>
                                    <span className="text-white font-black text-xl tracking-tighter">+91 96660 41795</span>
                                </motion.a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ApplyNow;
