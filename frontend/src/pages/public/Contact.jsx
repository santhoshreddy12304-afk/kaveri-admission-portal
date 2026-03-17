import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { toast } from 'react-toastify';
import { FiPhone, FiMail, FiMapPin, FiGlobe, FiClock, FiSend } from 'react-icons/fi';
import { MessageSquare, Calendar, Map, PhoneCall, Mail } from 'lucide-react';

const Contact = () => {
    const [form, setForm] = useState({ fullName: '', mobileNumber: '', email: '', message: '', interestedCourse: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/leads', { ...form, state: 'N/A', city: 'N/A' });
            toast.success('✅ Message sent! Our experts will connect within 24 hours.');
            setForm({ fullName: '', mobileNumber: '', email: '', message: '', interestedCourse: '' });
        } catch {
            toast.error('Connection timeout. Please call our helpline directly.');
        } finally { setLoading(false); }
    };

    const contacts = [
        { icon: <PhoneCall size={40} />, title: 'Voice Support', details: ['+91 96660 41795', '+91 93929 39698'], sub: '9:00 AM – 6:00 PM (IST)', href: 'tel:9666041795' },
        { icon: <Mail size={40} />, title: 'Admisson Desk', details: ['admissions@kaveriuniversity.edu.in'], sub: 'Global Inbound support', href: 'mailto:admissions@kaveriuniversity.edu.in' },
        { icon: <Map size={40} />, title: 'Main Campus', details: ['Gowraram Village, Wargal', 'Hyderabad, Telangana'], sub: 'NH-44 Gateway', href: null },
        { icon: <FiGlobe size={40} />, title: 'Digital Presence', details: ['www.kaveriuniversity.edu.in'], sub: 'Live Chat available', href: 'https://www.kaveriuniversity.edu.in' },
    ];

    return (
        <div className="min-h-screen bg-slate-900 perspective-view overflow-x-hidden text-white">
            {/* ─────────── HERO ─────────── */}
            <section className="relative py-32 overflow-hidden bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900 border-b border-white/10 shadow-2xl">
                <div className="absolute inset-0 opacity-20 scale-110" style={{backgroundImage:'url(/assets/images/gallery_122.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-ku-blue/70 backdrop-blur-md"></div>
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-6"
                    >
                        <span className="bg-ku-gold/20 text-ku-gold border border-ku-gold/40 font-black px-8 py-2 rounded-full text-xs uppercase tracking-[0.5em] reflection-effect">
                            Connect with us
                        </span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter">Your Hub for <br/><span className="text-ku-gold italic font-black text-7xl md:text-9xl">Excellence.</span></h1>
                    <p className="text-2xl text-blue-100 max-w-2xl mx-auto font-medium drop-shadow-lg">Technical queries or general questions? Our advisory team is ready to guide your journey.</p>
                </div>
            </section>

            {/* ─────────── FORM & SIDEBAR ─────────── */}
            <section className="container mx-auto px-4 py-24 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5">
                    <div className="w-full h-full" style={{backgroundImage: 'linear-gradient(rgba(255,191,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,191,0,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 glass-dark rounded-[4rem] p-12 lg:p-20 border border-white/10 shadow-4xl depth-shadow relative overflow-hidden"
                    >
                        {/* Matrix HUD Overlays */}
                        <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
                            <div className="text-[10px] font-mono text-ku-gold space-y-1 text-right">
                                <p>ENCRYPTION: AES-256</p>
                                <p>PROTOCOL: SMTP/KU-MATRIX</p>
                                <p>LATENCY: 12ms</p>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <div className="mb-16">
                                <motion.div 
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-ku-gold font-black uppercase tracking-[0.5em] text-[10px]">Uplink Status: Active</span>
                                </motion.div>
                                <h2 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-none italic">Direct <span className="text-ku-gold">Uplink.</span></h2>
                                <p className="text-gray-400 text-xl font-medium max-w-2xl italic leading-relaxed">Initiate a secure transmission to our advisory department. Response latency typically under 24 cycles.</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {[
                                        { label: 'Full Identity', name: 'fullName', type: 'text', placeholder: 'IDENTIFY SELF...' },
                                        { label: 'Comm-Link', name: 'mobileNumber', type: 'tel', placeholder: '+91 00000 00000' },
                                        { label: 'Data Address', name: 'email', type: 'email', placeholder: 'USER@DOMAIN.COM' },
                                        { label: 'Subject / Node', name: 'interestedCourse', type: 'text', placeholder: 'TARGET COURSE...' }
                                    ].map((field) => (
                                        <div key={field.name} className="space-y-3 group">
                                            <div className="flex justify-between items-center px-4">
                                                <label className="text-[10px] font-black text-ku-gold/60 uppercase tracking-widest">{field.label}</label>
                                                <div className="h-px w-20 bg-gradient-to-r from-transparent to-ku-gold/20"></div>
                                            </div>
                                            <div className="relative">
                                                <input 
                                                    type={field.type} 
                                                    name={field.name} 
                                                    value={form[field.name]} 
                                                    onChange={handleChange} 
                                                    required={field.name !== 'email'} 
                                                    placeholder={field.placeholder} 
                                                    className="w-full bg-white/5 text-white px-10 py-6 rounded-[2rem] border border-white/10 focus:border-ku-gold/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/10 font-black tracking-widest text-sm uppercase"
                                                />
                                                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                                                    <div className="w-1.5 h-1.5 bg-ku-gold rounded-full animate-ping"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="md:col-span-2 space-y-3 group">
                                        <div className="flex justify-between items-center px-4">
                                            <label className="text-[10px] font-black text-ku-gold/60 uppercase tracking-widest">Message Payload</label>
                                            <div className="h-px w-full bg-gradient-to-r from-transparent to-ku-gold/20 ml-6"></div>
                                        </div>
                                        <textarea 
                                            name="message" 
                                            value={form.message} 
                                            onChange={handleChange} 
                                            rows="6" 
                                            required 
                                            placeholder="DESCRIBE MISSION OBJECTIVES..." 
                                            className="w-full bg-white/5 text-white px-10 py-8 rounded-[3rem] border border-white/10 focus:border-ku-gold/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/10 font-black tracking-widest text-sm uppercase resize-none shadow-Inner"
                                        />
                                    </div>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    disabled={loading} 
                                    className={`w-full py-8 rounded-[3rem] font-black text-ku-blue bg-gradient-to-r from-ku-gold to-yellow-400 text-2xl tracking-tighter transition-all flex items-center justify-center gap-6 relative overflow-hidden group ${loading ? 'opacity-70' : 'shadow-glow hover:shadow-[0_25px_60px_rgba(255,191,0,0.5)]'}`}
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    {loading ? (
                                        <span className="flex items-center gap-3">
                                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><FiGlobe /></motion.div>
                                            TRANSMITTING DATA...
                                        </span>
                                    ) : (
                                        <><FiSend size={28} /> DISPATCH UPLINK</>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* ─────────── SIDEBAR ─────────── */}
                    <div className="space-y-12">
                        <Tilt perspective={2000} glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
                            <a href="https://wa.me/919666041795" target="_blank" rel="noreferrer"
                                className="block bg-[#075e54] text-white p-14 rounded-[4rem] text-center shadow-4xl border border-white/10 group relative depth-shadow overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <div className="text-[8px] font-mono">LINK: SECURE-E2E</div>
                                </div>
                                <div className="text-8xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 drop-shadow-2xl">💬</div>
                                <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter italic">WhatsApp Hub</h3>
                                <p className="text-white/70 font-bold mb-8 uppercase tracking-widest text-xs opacity-60">Instant Sync Access</p>
                                <div className="bg-white/10 backdrop-blur-3xl py-5 rounded-3xl font-black text-3xl tracking-tighter border border-white/20 group-hover:bg-white/20 transition-all font-mono">9666041795</div>
                            </a>
                        </Tilt>

                        <div className="glass-dark rounded-[3.5rem] p-12 border border-white/10 shadow-3xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-2 h-full bg-ku-gold/20"></div>
                            <h3 className="font-black text-white text-3xl mb-10 border-b border-white/5 pb-6 uppercase tracking-tighter italic">Ops <span className="text-ku-gold">Cycle</span></h3>
                            <div className="space-y-8">
                                {[
                                    { d: 'WEEKDAY', h: '09:00 – 18:00', s: 'ACTIVE' },
                                    { d: 'SATURDAY', h: '09:00 – 13:00', s: 'PARTIAL' },
                                    { d: 'SUNDAY', h: 'OFFLINE', s: 'STDBY' }
                                ].map((item) => (
                                    <div key={item.d} className="flex justify-between items-end group">
                                        <div>
                                            <p className="text-[10px] font-black text-ku-gold uppercase tracking-[0.3em] mb-1">{item.d}</p>
                                            <span className="text-white font-black text-xl tracking-tight uppercase group-hover:text-ku-gold transition-colors">{item.h}</span>
                                        </div>
                                        <div className={`text-[8px] font-mono px-3 py-1 rounded-full border border-white/10 ${item.s === 'ACTIVE' ? 'text-emerald-500' : 'text-gray-500'}`}>{item.s}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#020617] rounded-[3.5rem] p-12 text-white border border-ku-gold/20 shadow-glow-sm relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-ku-gold/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                            <h3 className="font-black text-3xl mb-4 uppercase tracking-tighter italic">Direct <span className="text-ku-gold">Line</span></h3>
                            <p className="text-blue-100/50 font-medium mb-10 leading-relaxed italic">Priority case review for urgent academic interventions.</p>
                            <a href="tel:9666041795" className="block text-center bg-white text-ku-blue py-6 rounded-[2.5rem] font-black text-xl hover:bg-ku-gold hover:text-ku-blue transition-all shadow-2xl uppercase tracking-tighter italic">📞 Priority Access</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────── MAP ─────────── */}
            <section className="container mx-auto px-4 pb-32">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="rounded-[4rem] overflow-hidden shadow-3xl bg-slate-800 h-[500px] flex items-center justify-center relative border border-white/10 depth-shadow"
                >
                    <img src="/assets/images/gallery_123.jpeg" alt="Campus Location Map" className="w-full h-full object-cover opacity-40 scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <Tilt perspective={1000} scale={1.1} glareEnable={true}>
                            <div className="glass-dark backdrop-blur-2xl rounded-[3rem] p-12 text-center border border-white/20 shadow-4xl max-w-lg">
                                <div className="text-6xl mb-6">📍</div>
                                <h3 className="font-black text-white text-3xl mb-2 tracking-tighter uppercase">Global Gateway</h3>
                                <p className="text-gray-400 font-medium text-xl mb-8 leading-relaxed">Gowraram Village, Wargal, <br/>Hyderabad, Telangana – 502279</p>
                                <a href="https://maps.google.com/?q=Kaveri+University+Telangana" target="_blank" rel="noreferrer" className="inline-block bg-ku-gold text-ku-blue px-10 py-4 rounded-[2rem] font-black text-lg hover:shadow-[0_15px_30px_rgba(255,191,0,0.4)] transition-all">Launch Navigation</a>
                            </div>
                        </Tilt>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Contact;
