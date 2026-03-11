import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
    // Sciences
    "B.Sc Nursing", "B.Sc Paramedical", "B.Sc Nutrition & Dietetics", "M.Sc Nursing",
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
        if (pct >= 90) return { fee: '₹75,000', annual: '₹1.5 Lakh', save: '₹1.5 Lakh', badge: '🏆 50% Scholarship', color: 'text-green-400' };
        if (pct >= 70) return { fee: '₹87,500', annual: '₹1.75 Lakh', save: '₹1.25 Lakh', badge: '⭐ 42% Scholarship', color: 'text-blue-400' };
        if (pct >= 60) return { fee: '₹1,00,000', annual: '₹2 Lakh', save: '₹1 Lakh', badge: '✅ 33% Scholarship', color: 'text-yellow-400' };
        return { fee: '₹1,50,000', annual: '₹3 Lakh', save: '₹0', badge: 'Standard Fee', color: 'text-gray-400' };
    }, [formData.twelfthPercentage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/leads', formData);
            toast.success('🎉 Application submitted! Our counsellor will call you within 24 hours.');
            setSubmitted(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-14 text-center max-w-lg w-full">
                    <div className="text-7xl mb-6">🎉</div>
                    <h1 className="text-4xl font-black text-ku-blue mb-4">Application Submitted!</h1>
                    <p className="text-gray-600 text-lg mb-8">Our admission counsellor will call you within <strong>24 hours</strong> to guide you through the next steps.</p>
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8 text-left">
                        <h3 className="font-black text-green-800 mb-3">What happens next?</h3>
                        <ul className="space-y-2 text-green-700 text-sm">
                            <li>✅ Counsellor calls you within 24 hours</li>
                            <li>✅ Course & scholarship guidance</li>
                            <li>✅ Document checklist shared via WhatsApp</li>
                            <li>✅ Seat reservation assistance</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                        <a href="https://wa.me/919666041795?text=Hi%2C%20I%20just%20submitted%20my%20application%20at%20Kaveri%20University" target="_blank" rel="noreferrer" className="bg-green-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-green-600 transition flex items-center justify-center gap-3">
                            💬 Chat on WhatsApp
                        </a>
                        <Link to="/" className="border-2 border-ku-blue text-ku-blue py-4 rounded-2xl font-black text-lg hover:bg-ku-blue hover:text-white transition">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-ku-blue via-blue-800 to-slate-900 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url(/src/assets/images/gallery_113.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-ku-gold rounded-full blur-[100px] opacity-10"></div>
                <div className="relative z-10 text-center px-4">
                    <span className="bg-ku-gold text-ku-blue font-black px-5 py-1 rounded-full text-xs uppercase tracking-widest mb-5 inline-block">Free Application</span>
                    <h1 className="text-5xl font-black mb-4">Apply for <span className="text-ku-gold">Admission 2026-27</span></h1>
                    <p className="text-gray-300 text-lg max-w-xl mx-auto">Fill the form and get a call from our counsellor within 24 hours. It's FREE and takes 2 minutes.</p>
                    <div className="flex justify-center gap-8 mt-8 text-center">
                        {[['🆓', 'Free to Apply'], ['⚡', '24hr Callback'], ['🎓', 'Scholarship Check'], ['📞', 'Expert Guidance']].map(([icon, label]) => (
                            <div key={label} className="text-center">
                                <div className="text-2xl mb-1">{icon}</div>
                                <div className="text-xs text-gray-300 font-bold">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form + Sidebar */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Application Form ── */}
                    <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-ku-gold to-yellow-400 px-8 py-5">
                            <h2 className="text-xl font-black text-ku-blue">📝 Step 1: Fill Your Details</h2>
                            <p className="text-ku-blue/70 text-sm">All fields marked * are required</p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {[
                                    { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Your full name', required: true },
                                    { label: 'Mobile Number', name: 'mobileNumber', type: 'tel', placeholder: '+91 9XXXXXXXXX', required: true },
                                    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com', required: true },
                                    { label: 'City', name: 'city', type: 'text', placeholder: 'Your city', required: true },
                                ].map(field => (
                                    <div key={field.name}>
                                        <label className="block text-gray-700 font-bold mb-2 text-sm">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
                                        <input
                                            type={field.type} name={field.name} value={formData[field.name]}
                                            onChange={handleChange} placeholder={field.placeholder} required={field.required}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-ku-gold focus:ring-0 outline-none transition-all bg-gray-50 font-medium"
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label className="block text-gray-700 font-bold mb-2 text-sm">State <span className="text-red-500">*</span></label>
                                    <select name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-ku-gold outline-none transition-all bg-gray-50 font-medium">
                                        <option value="" disabled>Select State</option>
                                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold mb-2 text-sm">Interested Course <span className="text-red-500">*</span></label>
                                    <select name="interestedCourse" value={formData.interestedCourse} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-ku-gold outline-none transition-all bg-gray-50 font-medium">
                                        <option value="" disabled>Select Program</option>
                                        {courses.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-bold mb-2 text-sm">
                                        12th / IPE Marks % <span className="text-red-500">*</span>
                                        <span className="text-green-600 font-black ml-2 text-xs">← Enter to see your scholarship!</span>
                                    </label>
                                    <input
                                        type="number" step="0.01" min="0" max="100" name="twelfthPercentage"
                                        value={formData.twelfthPercentage} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-green-400 outline-none transition-all bg-gray-50 font-medium text-lg"
                                        placeholder="e.g. 85.5" required
                                    />
                                    {scholarship && (
                                        <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                                            <div>
                                                <span className={`font-black text-sm ${scholarship.color}`}>{scholarship.badge}</span>
                                                <p className="text-gray-700 font-bold text-sm mt-1">Fee: <span className="text-green-700 text-lg font-black">{scholarship.fee}/semester</span></p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-500 text-xs">Annual savings</p>
                                                <p className="text-green-600 font-black text-xl">{scholarship.save}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-bold mb-2 text-sm">Message / Queries</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} rows="3"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-ku-gold outline-none transition-all bg-gray-50 font-medium resize-none"
                                        placeholder="Any specific questions or preferences?" />
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className={`w-full text-xl py-5 rounded-2xl font-black text-ku-blue bg-gradient-to-r from-ku-gold to-yellow-400 transition-all shadow-xl flex justify-center items-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_15px_30px_rgba(255,191,0,0.4)] hover:-translate-y-1'}`}>
                                {loading ? '⏳ Submitting...' : '🚀 Submit Application — FREE'}
                            </button>
                            <p className="text-center text-xs text-gray-400">No spam. No fees. Counsellor will call you within 24 hours.</p>
                        </form>
                    </div>

                    {/* ── Sidebar ── */}
                    <div className="space-y-5">

                        {/* Urgency card */}
                        <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl p-6 text-white text-center">
                            <div className="text-3xl mb-2">⏰</div>
                            <h3 className="font-black text-xl mb-2">Limited Seats!</h3>
                            <p className="text-red-100 text-sm mb-4">Seats filling fast. Last date: <strong>June 30, 2026</strong></p>
                            <div className="bg-white/20 rounded-xl p-3 text-sm font-bold">
                                Apply now to secure your seat &amp; scholarship
                            </div>
                        </div>

                        {/* Scholarship tiers */}
                        <div className="bg-white rounded-3xl shadow-xl p-6">
                            <h3 className="font-black text-ku-blue text-lg mb-4">🎓 Merit Scholarship Tiers</h3>
                            <div className="space-y-3">
                                {[
                                    { marks: '90%+', fee: '₹75K/sem', badge: '50% off', color: 'bg-green-500' },
                                    { marks: '70–89%', fee: '₹87.5K/sem', badge: '42% off', color: 'bg-blue-500' },
                                    { marks: '60–69%', fee: '₹1L/sem', badge: '33% off', color: 'bg-yellow-500' },
                                ].map(t => (
                                    <div key={t.marks} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                                        <div>
                                            <span className={`${t.color} text-white text-xs font-black px-2 py-0.5 rounded-full mr-2`}>{t.badge}</span>
                                            <span className="font-bold text-sm text-gray-700">IPE {t.marks}</span>
                                        </div>
                                        <span className="font-black text-ku-blue">{t.fee}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-3 text-center">Std. Fee: ₹3 Lakhs/year. *B.Tech programs.</p>
                        </div>

                        {/* WhatsApp */}
                        <a href="https://wa.me/919666041795?text=Hi%2C%20I%20want%20to%20know%20about%20admissions%20at%20Kaveri%20University" target="_blank" rel="noreferrer"
                            className="block bg-green-500 text-white text-center py-5 rounded-3xl font-black text-lg hover:bg-green-600 transition-all shadow-xl hover:-translate-y-1">
                            💬 WhatsApp Us Now<br />
                            <span className="text-sm font-medium opacity-80">9666041795 · 9392939698</span>
                        </a>

                        {/* Contact */}
                        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-3 text-sm">
                            <h3 className="font-black text-ku-blue">📞 Direct Enquiry</h3>
                            <div className="flex items-center gap-2 text-gray-600"><span>📞</span><a href="tel:9666041795" className="hover:text-ku-blue font-medium">9666041795</a></div>
                            <div className="flex items-center gap-2 text-gray-600"><span>📞</span><a href="tel:9392939698" className="hover:text-ku-blue font-medium">9392939698</a></div>
                            <div className="flex items-center gap-2 text-gray-600"><span>📧</span><a href="mailto:admissions@kaveriuniversity.edu.in" className="hover:text-ku-blue font-medium break-all">admissions@kaveriuniversity.edu.in</a></div>
                            <div className="flex items-start gap-2 text-gray-600"><span>📍</span><span>Gowraram Village, Wargal, Hyderabad, Telangana – 502279</span></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ApplyNow;
