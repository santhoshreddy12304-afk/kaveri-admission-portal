import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
    const [form, setForm] = useState({ fullName: '', mobileNumber: '', email: '', message: '', interestedCourse: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/leads', { ...form, state: 'N/A', city: 'N/A' });
            toast.success('✅ Message sent! We\'ll get back to you within 24 hours.');
            setForm({ fullName: '', mobileNumber: '', email: '', message: '', interestedCourse: '' });
        } catch {
            toast.error('Failed to send. Please call us directly.');
        } finally { setLoading(false); }
    };

    const contacts = [
        { icon: '📞', title: 'Call Us', details: ['9666041795', '9392939698'], sub: 'Mon – Sat, 9am to 6pm', href: 'tel:9666041795' },
        { icon: '📧', title: 'Email Us', details: ['admissions@kaveriuniversity.edu.in'], sub: 'We reply within 24 hours', href: 'mailto:admissions@kaveriuniversity.edu.in' },
        { icon: '📍', title: 'Campus Address', details: ['Gowraram Village, Wargal', 'Hyderabad, Telangana – 502279'], sub: 'NH-44, Near Gowraram Toll', href: null },
        { icon: '🌐', title: 'Website', details: ['www.kaveriuniversity.edu.in'], sub: 'Admissions portal online', href: 'https://www.kaveriuniversity.edu.in' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900">
                <div className="absolute inset-0 opacity-15" style={{backgroundImage:'url(/assets/images/gallery_122.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-ku-blue/70"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">We're Here for You</p>
                    <h1 className="text-6xl font-black mb-6">Get in <span className="text-ku-gold">Touch</span></h1>
                    <p className="text-xl text-gray-300 max-w-xl mx-auto">Have a question about admissions, scholarships, or campus life? Our team is here to help.</p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
                    {contacts.map((c, i) => (
                        <div key={i} className="glass-card rounded-3xl p-8 hover-tilt text-center">
                            <div className="text-5xl mb-4">{c.icon}</div>
                            <h3 className="font-black text-ku-blue text-lg mb-3">{c.title}</h3>
                            {c.details.map((d, j) => (
                                c.href ? (
                                    <a key={j} href={c.href} className="block text-gray-700 font-bold hover:text-ku-blue transition text-sm mb-1">{d}</a>
                                ) : (
                                    <p key={j} className="text-gray-700 font-bold text-sm mb-1">{d}</p>
                                )
                            ))}
                            <p className="text-gray-400 text-xs mt-2">{c.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Form + WhatsApp */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-ku-blue to-blue-800 px-8 py-6">
                            <h2 className="text-2xl font-black text-white">Send Us a Message</h2>
                            <p className="text-blue-200 text-sm">Fill this in and our counsellor will reach out within 24 hours.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2 text-sm">Full Name *</label>
                                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-ku-blue outline-none transition bg-gray-50 font-medium" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2 text-sm">Mobile Number *</label>
                                    <input type="tel" name="mobileNumber" value={form.mobileNumber} onChange={handleChange} required placeholder="+91 9XXXXXXXXX" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-ku-blue outline-none transition bg-gray-50 font-medium" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2 text-sm">Email Address</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-ku-blue outline-none transition bg-gray-50 font-medium" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2 text-sm">Interested Course</label>
                                    <input type="text" name="interestedCourse" value={form.interestedCourse} onChange={handleChange} placeholder="e.g. B.Tech CSE" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-ku-blue outline-none transition bg-gray-50 font-medium" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-bold mb-2 text-sm">Your Message *</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} rows="4" required placeholder="Tell us how we can help..." className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-ku-blue outline-none transition bg-gray-50 font-medium resize-none" />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} className={`w-full py-4 rounded-2xl font-black text-ku-blue bg-gradient-to-r from-ku-gold to-yellow-400 text-lg transition-all ${loading ? 'opacity-70' : 'hover:shadow-[0_10px_30px_rgba(255,191,0,0.4)] hover:-translate-y-1'}`}>
                                {loading ? '⏳ Sending...' : '📨 Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        <a href="https://wa.me/919666041795?text=Hi%2C%20I%20have%20a%20question%20about%20Kaveri%20University" target="_blank" rel="noreferrer"
                            className="block bg-green-500 text-white p-8 rounded-3xl text-center font-black text-lg hover:bg-green-600 transition hover:-translate-y-1 shadow-xl">
                            <div className="text-5xl mb-4">💬</div>
                            <div className="text-xl mb-2">WhatsApp Us</div>
                            <div className="text-green-100 text-sm">Get instant reply</div>
                            <div className="text-green-100 text-sm font-bold mt-2">9666041795</div>
                        </a>

                        <div className="bg-white rounded-3xl shadow-xl p-6">
                            <h3 className="font-black text-ku-blue text-lg mb-5">Office Hours</h3>
                            <div className="space-y-3 text-sm">
                                {[['Monday – Friday', '9:00 AM – 6:00 PM'], ['Saturday', '9:00 AM – 1:00 PM'], ['Sunday', 'Closed']].map(([day, hrs]) => (
                                    <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-gray-700 font-medium">{day}</span>
                                        <span className="font-black text-ku-blue">{hrs}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-ku-blue to-blue-800 rounded-3xl p-6 text-white">
                            <h3 className="font-black text-lg mb-3">Admissions Helpline</h3>
                            <p className="text-blue-200 text-sm mb-4">Dedicated line for admission queries. Available Mon–Sat.</p>
                            <a href="tel:9666041795" className="block text-center bg-ku-gold text-ku-blue py-3 rounded-2xl font-black">📞 Call 9666041795</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map placeholder */}
            <section className="container mx-auto px-4 pb-20">
                <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-200 h-64 flex items-center justify-center relative">
                    <img src="/assets/images/gallery_123.jpeg" alt="Campus Location Map" className="w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 rounded-2xl px-8 py-6 text-center shadow-xl">
                            <p className="text-3xl mb-2">📍</p>
                            <p className="font-black text-ku-blue text-lg">Gowraram Village, Wargal</p>
                            <p className="text-gray-600 text-sm">Hyderabad, Telangana – 502279</p>
                            <a href="https://maps.google.com/?q=Kaveri+University+Telangana" target="_blank" rel="noreferrer" className="mt-3 inline-block text-ku-blue font-bold text-sm hover:underline">Open in Google Maps →</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
