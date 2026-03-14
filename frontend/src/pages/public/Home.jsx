import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMessageCircle, FiBook, FiAward, FiUsers, FiGlobe, 
  FiCpu, FiCheckCircle, FiShield, FiNavigation, FiPhoneCall, FiExternalLink, FiArrowRight 
} from 'react-icons/fi';
import { GraduationCap, Landmark, Microscope, Activity } from 'lucide-react';

// Animated counter hook
const useCounter = (end, duration = 2000, trigger) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!trigger) return;
        let start = 0;
        const step = Math.ceil(end / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [trigger, end, duration]);
    return count;
};

// Countdown timer hook
const useCountdown = (targetDate) => {
    const [timeLeft, setTimeLeft] = useState({});
    useEffect(() => {
        const calc = () => {
            const diff = new Date(targetDate) - new Date();
            if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            });
        };
        calc();
        const t = setInterval(calc, 1000);
        return () => clearInterval(t);
    }, [targetDate]);
    return timeLeft;
};

const Home = () => {
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef(null);
    const countdown = useCountdown('2026-06-30T23:59:00');

    const students = useCounter(5000, 2000, statsVisible);
    const faculty = useCounter(150, 2000, statsVisible);
    const research = useCounter(50, 2000, statsVisible);
    const placement = useCounter(95, 2000, statsVisible);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setStatsVisible(true); observer.disconnect(); }
        }, { threshold: 0.3 });
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const programs = [
        { school: 'Engineering & Technology', icon: <FiCpu />, color: 'from-blue-600 to-blue-800', courses: ['B.Tech CSE (Core)', 'B.Tech AI & ML', 'B.Tech CSE - Robotics', 'B.Tech CSE - Cyber Security', 'B.Tech CSE - IoT', 'B.Tech ECE', 'M.Tech CSE/AI&ML', 'Ph.D. (CSE)'] },
        { school: 'Agriculture', icon: <Microscope />, color: 'from-green-600 to-green-800', courses: ['B.Sc (Hons.) Agriculture', 'B.Sc (Hons.) Horticulture', 'M.Sc Agronomy', 'M.Sc Genetics & Plant Breeding', 'Ph.D. in Agriculture Sciences'] },
        { school: 'Management Studies', icon: <Landmark />, color: 'from-purple-600 to-purple-800', courses: ['BBA General', 'MBA General', 'MBA Finance', 'MBA Marketing', 'MBA HR'] },
    ];

    const whyUs = [
        { icon: <FiAward />, title: 'Merit Scholarships', desc: 'Up to 75% scholarship for 90%+ IPE marks. Pay as low as ₹75,000/semester instead of ₹3 Lakhs.', highlight: true },
        { icon: <FiGlobe />, title: 'Global Collaborations', desc: 'Partnerships with University of Florida, ICRISAT, and Fraunhofer Institute for world-class research.' },
        { icon: <FiNavigation />, title: 'Drone & AI Academy', desc: 'India\'s unique Drone Training Academy + AI-Robotics Hub — industry-first learning experiences.' },
        { icon: <FiCheckCircle />, title: '95% Placement', desc: 'Strong industry network with MNC tie-ups. Dedicated placement cell from Day 1 of your course.' },
        { icon: <Landmark />, title: '150-Acre Green Campus', desc: 'Riverside eco-campus with world-class infrastructure — hostels, sports, labs, and digital library.' },
        { icon: <FiUsers />, title: 'Expert Faculty', desc: '150+ distinguished faculty members with PhD qualifications and industry experience.' },
    ];

    return (
        <div className="pb-20">

            {/* ─────────── FLOATING BUTTONS ─────────── */}
            <div className="fixed right-5 bottom-24 z-50 flex flex-col gap-3">
                <a
                    href="https://wa.me/919666041795?text=Hi%2C%20I%20want%20to%20know%20about%20admissions%20at%20Kaveri%20University"
                    target="_blank" rel="noreferrer"
                    className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-[0_8px_30px_rgba(34,197,94,0.5)] hover:scale-110 transition-all duration-300 floating-3d"
                    title="WhatsApp Us"
                >
                    💬
                </a>
                <Link
                    to="/apply"
                    className="bg-gradient-to-r from-ku-gold to-yellow-500 text-ku-blue px-5 py-3 rounded-2xl font-black text-sm shadow-[0_8px_30px_rgba(255,191,0,0.5)] hover:scale-105 transition-all duration-300 text-center"
                >
                    Apply Now
                </Link>
            </div>

            {/* ─────────── HERO ─────────── */}
            <section className="relative h-[860px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/assets/images/campus_main.png" alt="Kaveri University Campus" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-ku-blue/90 via-blue-900/80 to-slate-900/85"></div>
                </div>

                <div className="relative z-20 text-center text-white px-4 max-w-6xl w-full">
                    {/* Admission badge */}
                    <span className="bg-gradient-to-r from-ku-gold to-yellow-400 text-ku-blue font-black px-6 py-2 rounded-full text-sm uppercase tracking-widest mb-8 inline-block shadow-[0_10px_30px_rgba(255,191,0,0.5)] floating-3d">
                        <GraduationCap className="inline-block mr-2 -mt-1" /> Admissions 2026-27 Now Open
                    </span>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight drop-shadow-2xl">
                        Your Dream Career <br />starts at <span className="text-ku-gold">Kaveri University</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-gray-200 font-medium max-w-3xl mx-auto">
                        Scholarships up to 75% · World-class Labs · 95% Placements · Global Collaborations
                    </p>

                    {/* Countdown Timer */}
                    <div className="mb-10">
                        <p className="text-gray-300 text-sm uppercase tracking-widest mb-4 font-bold">⏰ Last Date to Apply — June 30, 2026</p>
                        <div className="flex justify-center gap-4">
                            {[
                                { val: countdown.days, label: 'Days' },
                                { val: countdown.hours, label: 'Hours' },
                                { val: countdown.minutes, label: 'Mins' },
                                { val: countdown.seconds, label: 'Secs' },
                            ].map(({ val, label }) => (
                                <div key={label} className="glass-card rounded-2xl px-5 py-3 min-w-[70px]">
                                    <div className="text-3xl font-black text-ku-gold">{String(val ?? 0).padStart(2, '0')}</div>
                                    <div className="text-xs text-gray-300 font-bold uppercase">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/apply" className="bg-gradient-to-r from-ku-gold to-yellow-500 text-ku-blue px-10 py-5 rounded-2xl font-black text-xl hover:shadow-[0_20px_40px_rgba(255,191,0,0.5)] transition-all duration-300 transform hover:-translate-y-2 inline-flex items-center gap-3">
                            🚀 Apply Now — Free
                        </Link>
                        <Link to="/courses" className="glass-card text-white border-white/30 px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                            📚 Explore Programs
                        </Link>
                        <a href="https://wa.me/919666041795?text=Hi%2C%20I%20want%20to%20know%20about%20admissions%20at%20Kaveri%20University" target="_blank" rel="noreferrer" className="bg-green-500 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-2 inline-flex items-center gap-3">
                            💬 WhatsApp Us
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-30"></div>
            </section>

            {/* ─────────── SCHOLARSHIP BANNER ─────────── */}
            <section className="bg-gradient-to-r from-ku-gold via-yellow-400 to-ku-gold py-6 overflow-hidden">
                <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
                    {Array(3).fill(null).map((_, i) => (
                        <span key={i} className="inline-block mx-8 text-ku-blue font-black text-lg">
                            🎓 90%+ IPE Marks → Pay only ₹75,000/semester &nbsp;|&nbsp; 70%+ IPE Marks → ₹87,500/semester &nbsp;|&nbsp; Merit Scholarship up to ₹2,50,000/year &nbsp;|&nbsp; Apply before June 30, 2026 &nbsp;|&nbsp;
                        </span>
                    ))}
                </div>
            </section>

            {/* ─────────── STATS COUNTER ─────────── */}
            <section ref={statsRef} className="bg-ku-blue py-14">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                        {[
                            { val: students, suffix: '+', label: 'Students Enrolled' },
                            { val: faculty, suffix: '+', label: 'Expert Faculty' },
                            { val: research, suffix: '+', label: 'Research Projects' },
                            { val: placement, suffix: '%', label: 'Placement Rate' }
                        ].map((stat, i) => (
                            <div key={i} className="border-r border-white/20 last:border-0">
                                <div className="text-5xl md:text-6xl font-black text-ku-gold mb-2">{stat.val}{stat.suffix}</div>
                                <div className="text-gray-300 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── WHY KAVERI UNIVERSITY ─────────── */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Why Choose Us</p>
                    <h2 className="text-5xl font-black text-ku-blue mb-4">6 Reasons to Choose <span className="gradient-text">Kaveri University</span></h2>
                    <p className="text-gray-500 text-xl max-w-2xl mx-auto">Real advantages that give you a career edge from Day 1.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whyUs.map((item, i) => (
                        <div key={i} className={`glass-card rounded-3xl p-8 hover-tilt group relative overflow-hidden ${item.highlight ? 'border-2 border-ku-gold shadow-[0_0_30px_rgba(255,191,0,0.2)]' : ''}`}>
                            {item.highlight && (
                                <div className="absolute top-4 right-4 bg-ku-gold text-ku-blue text-xs font-black px-3 py-1 rounded-full uppercase">🔥 Most Popular</div>
                            )}
                            <div className="text-5xl mb-5 text-ku-gold">{item.icon}</div>
                            <h3 className="text-xl font-black text-ku-blue mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────── PROGRAMS FINDER ─────────── */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ku-blue/5 to-blue-50"></div>
                <div className="relative container mx-auto px-4">
                    <div className="text-center mb-14">
                        <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Explore Your Future</p>
                        <h2 className="text-5xl font-black text-ku-blue mb-4">Find Your <span className="gradient-text">Perfect Program</span></h2>
                        <p className="text-gray-500 text-xl">40+ UG, PG & Ph.D. programs across 4 schools.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {programs.map((prog, i) => (
                            <div key={i} className={`bg-gradient-to-br ${prog.color} rounded-3xl p-6 text-white shadow-xl hover-tilt group`}>
                             <div className="flex items-center justify-between mb-4">
                                <div className="text-5xl text-white/90">{prog.icon}</div>
                                <div className="bg-white/20 p-2 rounded-xl"><FiArrowRight /></div>
                             </div>
                             <h3 className="text-xl font-black mb-4 leading-tight">School of {prog.school}</h3>
                                <ul className="space-y-2 mb-6">
                                    {prog.courses.map((c, j) => (
                                        <li key={j} className="text-white/80 text-sm font-medium flex items-start gap-2">
                                            <span className="text-yellow-300 flex-shrink-0 mt-0.5">▸</span> {c}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/courses" className="block text-center bg-white/20 hover:bg-white/30 border border-white/30 text-white font-black py-2.5 rounded-xl text-sm transition-all">
                                    View All Courses →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── SCHOLARSHIP SECTION ─────────── */}
            <section className="container mx-auto px-4 py-12">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-br from-ku-blue via-blue-800 to-slate-900">
                    <div className="absolute inset-0 opacity-5" style={{backgroundImage:'url(/assets/images/gallery_113.jpeg)', backgroundSize:'cover'}}></div>
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-ku-gold blur-[100px] opacity-15"></div>
                    <div className="relative z-10 p-10 md:p-14">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="text-white">
                                <span className="bg-ku-gold text-ku-blue font-black px-4 py-1 rounded-full text-xs uppercase tracking-widest mb-6 inline-block">Merit Scholarship Program</span>
                                <h2 className="text-4xl font-black mb-6 leading-tight">Pay Less. <span className="text-ku-gold">Learn More.</span></h2>
                                <p className="text-gray-300 mb-8 text-lg leading-relaxed">Kaveri University rewards academic excellence with generous scholarships. The higher your IPE marks, the lower your fees.</p>
                                <Link to="/apply" className="bg-ku-gold text-ku-blue px-10 py-4 rounded-2xl font-black text-lg hover:shadow-[0_10px_30px_rgba(255,191,0,0.4)] transition-all transform hover:-translate-y-1 inline-block">
                                    Apply & Save Lakhs
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { marks: '90% & Above IPE', feePerSem: '₹75,000', annualFee: '₹1.5 Lakh', savings: '₹1.5 Lakh/yr Saved', color: 'border-green-400', tag: '🏆 Best Deal' },
                                    { marks: '70% – 89.9% IPE', feePerSem: '₹87,500', annualFee: '₹1.75 Lakh', savings: '₹1.25 Lakh/yr Saved', color: 'border-blue-400', tag: '⭐ Great Deal' },
                                    { marks: '60% – 69.9% IPE', feePerSem: '₹1,00,000', annualFee: '₹2 Lakh', savings: '₹1 Lakh/yr Saved', color: 'border-yellow-400', tag: '✅ Good Deal' },
                                ].map((tier, i) => (
                                    <div key={i} className={`glass-card rounded-2xl p-5 border-l-4 ${tier.color} flex items-center justify-between gap-4`}>
                                        <div>
                                            <p className="text-white font-black text-sm">{tier.marks}</p>
                                            <p className="text-gray-400 text-xs font-medium">Standard fee: ₹3 Lakhs/year</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-ku-gold font-black text-xl">{tier.feePerSem}</p>
                                            <p className="text-gray-400 text-xs">per semester</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="bg-green-500/20 text-green-400 font-bold text-xs px-3 py-1 rounded-full">{tier.tag}</span>
                                        </div>
                                    </div>
                                ))}
                                <p className="text-gray-400 text-xs text-center pt-2">* Applicable to B.Tech Engineering programs. Conditions apply.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────── GALLERY PREVIEW ─────────── */}
            <section className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Visual Tour</p>
                    <h2 className="text-5xl font-black text-ku-blue mb-4">Life at <span className="gradient-text">Kaveri University</span></h2>
                    <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium">Real moments from our campus — not renders, not stock photos.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    <div className="col-span-2 row-span-2 group cursor-pointer rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative">
                        <img src="/assets/images/gallery_113.jpeg" alt="Campus Aerial View" className="w-full h-full object-cover min-h-[300px] transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                            <span className="text-white font-bold text-lg">Campus Aerial View — 150 Acres</span>
                        </div>
                    </div>
                    {[
                        { src: '/assets/images/gallery_117.jpeg', label: 'Science Lab' },
                        { src: '/assets/images/gallery_120.jpeg', label: 'Main Building' },
                        { src: '/assets/images/gallery_115.jpeg', label: 'Smart Classroom' },
                        { src: '/assets/images/gallery_125.jpeg', label: 'Sports Complex' },
                    ].map(({ src, label }) => (
                        <div key={label} className="group cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative h-44">
                            <img src={src} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{label}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Link to="/gallery" className="inline-flex items-center gap-3 border-2 border-ku-blue text-ku-blue px-10 py-4 rounded-2xl font-black text-lg hover:bg-ku-blue hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                        View Full Gallery <span>→</span>
                    </Link>
                </div>
            </section>

            {/* ─────────── TESTIMONIALS ─────────── */}
            <section className="py-16 container mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Student Stories</p>
                    <h2 className="text-5xl font-black text-ku-blue">What Our <span className="gradient-text">Students Say</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: 'Rahul Sharma', course: 'B.Tech CSE — 2025 Batch', text: 'Got placed at a top MNC before even graduating! The faculty and placement cell support here is exceptional.', init: 'RS', stars: 5 },
                        { name: 'Priya Desai', course: 'MBA Finance — 2025 Batch', text: 'The scholarship saved my family ₹2.5 lakhs in the first year alone. World-class education at an affordable fee.', init: 'PD', stars: 5 },
                        { name: 'Ankit Reddy', course: 'B.Sc Agriculture — 2025 Batch', text: 'The Drone Academy was mind-blowing. I can now operate and service agricultural drones — a skill no other college teaches!', init: 'AR', stars: 5 },
                    ].map((t, i) => (
                        <div key={i} className="glass-card rounded-3xl p-8 hover-tilt relative overflow-hidden">
                            <div className="text-ku-gold text-5xl font-black absolute -top-2 -left-1 opacity-20 leading-none">&ldquo;</div>
                            <div className="flex mb-4">
                                {Array(t.stars).fill(0).map((_, s) => <span key={s} className="text-yellow-400">★</span>)}
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium italic">{t.text}</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-ku-blue to-blue-700 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-lg">{t.init}</div>
                                <div>
                                    <h4 className="font-black text-gray-800">{t.name}</h4>
                                    <span className="text-xs text-ku-gold font-bold uppercase tracking-wider">{t.course}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─────────── FINAL CTA ─────────── */}
            <section className="container mx-auto px-4 py-8">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,41,87,0.3)]">
                    <img src="/assets/images/gallery_124.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-ku-blue/95 via-blue-900/90 to-slate-900/95"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-ku-gold blur-[100px] opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-400 blur-[100px] opacity-20"></div>
                    <div className="relative z-10 p-14 md:p-20 text-center">
                        <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-6">Kaveri University — Admissions 2026-27</p>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">Your Future Starts <span className="text-ku-gold">Today</span></h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium">Limited seats. Merit scholarships. Global career. Don't miss the deadline — June 30, 2026.</p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link to="/apply" className="bg-ku-gold text-ku-blue px-12 py-5 rounded-2xl font-black text-xl hover:shadow-[0_20px_40px_rgba(255,191,0,0.5)] transition-all transform hover:-translate-y-2">🚀 Apply Now — Free</Link>
                            <a href="https://wa.me/919666041795?text=Hi%2C%20I%20want%20to%20know%20about%20admissions%20at%20Kaveri%20University" target="_blank" rel="noreferrer" className="bg-green-500 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-green-600 transition-all transform hover:-translate-y-2">💬 WhatsApp Enquiry</a>
                            <Link to="/contact" className="border-2 border-white/40 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all transform hover:-translate-y-2">📞 Talk to Counsellor</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
