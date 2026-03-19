import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { 
  FiMessageCircle, FiBook, FiAward, FiUsers, FiGlobe, 
  FiCpu, FiCheckCircle, FiShield, FiNavigation, FiPhoneCall, FiExternalLink, FiArrowRight 
} from 'react-icons/fi';
import { GraduationCap, Landmark, Microscope, Activity, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import kaveriHero from '../../assets/images/gallery_120.jpeg';

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
    
    // Scroll parallax for hero
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

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
        <div className="pb-20 perspective-view overflow-x-hidden">

            {/* ─────────── FLOATING BUTTONS ─────────── */}
            <div className="fixed right-5 bottom-24 z-50 flex flex-col gap-3">
                <motion.a
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    href="https://wa.me/919666041795?text=Hi%2C%20I%20want%20to%20know%20about%20admissions%20at%20Kaveri%20University"
                    target="_blank" rel="noreferrer"
                    className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-[0_8px_30px_rgba(34,197,94,0.5)] transition-all duration-300 floating-3d"
                    title="WhatsApp Us"
                >
                    💬
                </motion.a>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        to="/apply"
                        className="bg-gradient-to-r from-ku-gold to-yellow-500 text-ku-blue px-5 py-3 rounded-2xl font-black text-sm shadow-[0_8px_30px_rgba(255,191,0,0.5)] hover:scale-105 transition-all duration-300 text-center block"
                    >
                        Apply Now
                    </Link>
                </motion.div>
            </div>

            {/* ─────────── HERO ─────────── */}
            <section className="relative h-[100svh] md:h-[950px] flex items-center justify-center overflow-hidden perspective-view pt-20 md:pt-0">
                <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                    <img src={kaveriHero} alt="Kaveri University Main Block" className="w-full h-full object-cover scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#0f172a]/80 to-transparent"></div>
                </motion.div>

                {/* Cyber HUD Elements */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden md:block">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                        className="absolute top-20 right-20 w-[800px] h-[800px] border-[1px] border-ku-gold/30 rounded-full flex items-center justify-center"
                    >
                         <div className="w-[600px] h-[600px] border-[1px] border-white/10 rounded-full"></div>
                    </motion.div>
                </div>

                {/* Animated Background Elements */}
                <div className="parallax-layer z-10 overflow-hidden">
                    <motion.div 
                        animate={{ 
                            y: [0, -40, 0],
                            rotate: [0, 5, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" 
                    />
                    <motion.div 
                        animate={{ 
                            y: [0, 60, 0],
                            x: [0, 30, 0],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-ku-gold/10 rounded-full blur-[150px]" 
                    />
                </div>

                <motion.div 
                    style={{ opacity }}
                    className="relative z-20 text-center text-white px-4 max-w-6xl w-full"
                >
                    {/* Admission badge */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <span className="bg-gradient-to-r from-ku-gold to-yellow-400 text-ku-blue font-black px-8 py-3 rounded-full text-sm uppercase tracking-[0.2em] mb-10 inline-flex items-center gap-2 shadow-[0_15px_40px_rgba(255,191,0,0.4)] reflection-effect">
                            <Sparkles size={18} className="animate-pulse" /> Admissions 2026-27 Are Now Live
                        </span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                        Design Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ku-gold via-yellow-300 to-amber-500 drop-shadow-none">3D Future</span> <br />
                        at Kaveri University
                    </h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xl md:text-2xl mb-12 text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed"
                    >
                        Experience India's most innovative eco-campus. <br />
                        <span className="text-ku-gold">Merit Based Scholarships & Industry-Linked Programs.</span>
                    </motion.p>

                    {/* Countdown Timer */}
                    <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mb-14"
                    >
                        <p className="text-gray-300 text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.4em] mb-6 font-black flex items-center justify-center gap-2">
                            <Zap size={16} className="text-ku-gold" /> Application Deadline: June 30, 2026
                        </p>
                        <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
                            {[
                                { val: countdown.days, label: 'Days' },
                                { val: countdown.hours, label: 'Hours' },
                                { val: countdown.minutes, label: 'Mins' },
                                { val: countdown.seconds, label: 'Secs' },
                            ].map(({ val, label }) => (
                                <Tilt key={label} perspective={500} scale={1.05} transitionSpeed={2500}>
                                    <div className="glass-card rounded-2xl md:rounded-[2rem] px-4 py-4 md:px-8 md:py-5 min-w-[70px] md:min-w-[100px] border-ku-gold/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                                        <div className="text-2xl md:text-4xl font-black text-ku-gold mb-1">{String(val ?? 0).padStart(2, '0')}</div>
                                        <div className="text-[9px] md:text-[10px] text-gray-300 font-black uppercase tracking-widest">{label}</div>
                                    </div>
                                </Tilt>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 w-full px-4 md:px-0">
                        <motion.div whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                            <Link to="/apply" className="w-full sm:w-auto bg-gradient-to-r from-ku-gold via-yellow-400 to-ku-gold text-ku-blue px-8 py-4 md:px-12 md:py-6 rounded-[2rem] font-black text-lg md:text-xl shadow-[0_20px_50px_rgba(255,191,0,0.4)] hover:shadow-[0_25px_60px_rgba(255,191,0,0.6)] transition-all duration-300 inline-flex items-center justify-center gap-3 active:scale-95 group">
                                <span className="group-hover:translate-x-1 transition-transform">🚀 Ready to Apply?</span>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ y: -5, scale: 1.02 }} className="w-full sm:w-auto">
                            <Link to="/courses" className="w-full sm:w-auto inline-flex items-center justify-center glass-card text-white border-white/40 px-8 py-4 md:px-12 md:py-6 rounded-[2rem] font-black text-lg md:text-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-2xl">
                                Explore Courses
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-50 to-transparent z-30"></div>
            </section>

            {/* ─────────── SCHOLARSHIP BANNER ─────────── */}
            <section className="bg-gradient-to-r from-ku-gold via-yellow-400 to-ku-gold py-8 overflow-hidden border-y border-white/20 shadow-lg relative z-40">
                <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap">
                    {Array(4).fill(null).map((_, i) => (
                        <span key={i} className="inline-flex items-center mx-12 text-ku-blue font-black text-xl uppercase tracking-tighter">
                            <ShieldCheck className="mr-3" /> 75% Scholarship Guaranteed for 90%+ Marks &nbsp;•&nbsp; 
                            <Landmark className="mx-3" /> Riverside 150-Acre Infrastructure &nbsp;•&nbsp; 
                            <Sparkles className="mx-3" /> India's First Drone & AI Hub &nbsp;•&nbsp;
                        </span>
                    ))}
                </div>
            </section>

            {/* ─────────── STATS COUNTER ─────────── */}
            <section ref={statsRef} className="bg-ku-blue py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 hidden md:block">
                    <img src="/assets/images/logo.png" className="w-64 brightness-0 invert" alt="" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center text-white">
                        {[
                            { val: students, suffix: '+', label: 'Global Students', icon: <FiUsers /> },
                            { val: faculty, suffix: '+', label: 'PhD Faculty', icon: <FiAward /> },
                            { val: research, suffix: '+', label: 'Active Patents', icon: <FiCpu /> },
                            { val: placement, suffix: '%', label: 'Placement Success', icon: <FiCheckCircle /> }
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.15 }}
                                className="group"
                            >
                                <div className="text-ku-gold text-4xl mb-4 flex justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                                    {stat.icon}
                                </div>
                                <div className="text-6xl md:text-7xl font-black text-white mb-3 tracking-tighter drop-shadow-lg">{stat.val}{stat.suffix}</div>
                                <div className="text-blue-300 font-black uppercase tracking-[0.3em] text-[10px]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── WHY KAVERI UNIVERSITY ─────────── */}
            <section className="container mx-auto px-4 py-16 md:py-24 relative">
                <div className="text-center mb-12 md:mb-20">
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-ku-gold font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6"
                    >
                        Academic Excellence
                    </motion.p>
                    <h2 className="text-4xl md:text-6xl font-black text-ku-blue mb-6">Why <span className="gradient-text tracking-tighter">Choose K.U?</span></h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed px-4">Beyond a degree, we build a legacy. Explore what makes us unique.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {whyUs.map((item, i) => (
                        <Tilt key={i} perspective={1500} glareEnable={true} glareMaxOpacity={0.1} scale={1.02}>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass-card rounded-[3rem] p-10 hover-tilt group relative overflow-hidden h-full border-t-white/50 ${item.highlight ? 'ring-2 ring-ku-gold/50 shadow-[0_30px_60px_rgba(255,191,0,0.15)]' : ''}`}
                            >
                                <div className="text-6xl mb-8 text-ku-gold drop-shadow-[0_10px_10px_rgba(255,191,0,0.2)]">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-black text-ku-blue mb-5 tracking-tight group-hover:text-blue-700 transition-colors uppercase">{item.title}</h3>
                                <p className="text-gray-600 leading-[1.8] font-medium text-lg">{item.desc}</p>
                                
                                {item.highlight && (
                                    <div className="absolute top-8 right-8 bg-ku-gold text-ku-blue text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-bounce">
                                        Exclusive
                                    </div>
                                )}
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </section>

            {/* ─────────── PROGRAMS FINDER ─────────── */}
            <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,191,0,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="relative container mx-auto px-4">
                    <div className="text-center mb-20">
                        <p className="text-ku-gold font-black uppercase tracking-[0.4em] text-xs mb-6">Choose Your Path</p>
                        <h2 className="text-6xl font-black mb-6">Our <span className="text-ku-gold tracking-tighter">Premium</span> Schools</h2>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">Industry aligned curriculum designed for the 2030 workforce.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {programs.map((prog, i) => (
                            <Tilt key={i} perspective={2000} scale={1.05} transitionSpeed={3000}>
                                <div className={`h-full bg-gradient-to-br ${prog.color} rounded-[3rem] p-10 text-white shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-white/10 group relative overflow-hidden reflection-effect`}>
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="text-7xl text-white/90 group-hover:scale-110 transition-transform duration-500">{prog.icon}</div>
                                        <div className="bg-white/10 p-4 rounded-[2rem] group-hover:bg-ku-gold group-hover:text-ku-blue transition-all"><FiArrowRight size={24} /></div>
                                    </div>
                                    <h3 className="text-3xl font-black mb-8 leading-tight tracking-tight">School of <br/> {prog.school}</h3>
                                    <ul className="space-y-4 mb-10">
                                        {prog.courses.slice(0, 5).map((c, j) => (
                                            <li key={j} className="text-white/70 text-base font-bold flex items-start gap-3 group-hover:text-white transition-colors">
                                                <Zap className="text-ku-gold flex-shrink-0 mt-1" size={14} /> {c}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/courses" className="block text-center bg-white/10 hover:bg-white text-white hover:text-ku-blue font-black py-5 rounded-[2rem] text-lg transition-all border border-white/20">
                                        Explore All Courses
                                    </Link>
                                </div>
                            </Tilt>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────── SCHOLARSHIP SECTION ─────────── */}
            <section className="container mx-auto px-4 py-24">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,41,87,0.4)] bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900 border border-white/10"
                >
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url(/assets/images/gallery_113.jpeg)', backgroundSize:'cover'}}></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-ku-gold blur-[150px] opacity-20"></div>
                    <div className="relative z-10 p-12 md:p-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="text-white">
                                <motion.span 
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    className="bg-ku-gold text-ku-blue font-black px-6 py-2 rounded-full text-xs uppercase tracking-[0.3em] mb-8 inline-block shadow-lg"
                                >
                                    Excellence Rewards
                                </motion.span>
                                <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Pay Less. <br/><span className="text-ku-gold drop-shadow-lg">Achieve More.</span></h2>
                                <p className="text-gray-300 mb-10 text-xl leading-relaxed font-medium">Kaveri University rewards academic excellence with India's most aggressive merit scholarship program. The higher your marks, the lower your burden.</p>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link to="/apply" className="bg-gradient-to-r from-ku-gold to-yellow-400 text-ku-blue px-12 py-5 rounded-[2rem] font-black text-xl hover:shadow-[0_20px_40px_rgba(255,191,0,0.4)] transition-all inline-block">
                                        Check Your Eligibility
                                    </Link>
                                </motion.div>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { marks: '90% & Above IPE', feePerSem: '₹75,000', annualFee: '₹1.5 Lakh', savings: '₹1.5 Lakh/yr Saved', color: 'border-green-400', tag: '🏆 Platinum Tier' },
                                    { marks: '70% – 89.9% IPE', feePerSem: '₹87,500', annualFee: '₹1.75 Lakh', savings: '₹1.25 Lakh/yr Saved', color: 'border-blue-400', tag: '⭐ Gold Tier' },
                                    { marks: '60% – 69.9% IPE', feePerSem: '₹1,00,000', annualFee: '₹2 Lakh', savings: '₹1 Lakh/yr Saved', color: 'border-yellow-400', tag: '✅ Silver Tier' },
                                ].map((tier, i) => (
                                    <Tilt key={i} perspective={1000} scale={1.02} glareEnable={true} glareMaxOpacity={0.2}>
                                        <div className={`glass-card rounded-[2.5rem] p-6 md:p-8 border-l-[6px] ${tier.color} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 backdrop-blur-3xl relative overflow-hidden group`}>
                                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative z-10 w-full text-left">
                                                <p className="text-white font-black text-lg md:text-xl mb-1">{tier.marks}</p>
                                                <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">{tier.savings}</p>
                                            </div>
                                            <div className="relative z-10 w-full sm:text-right mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10">
                                                <p className="text-ku-gold font-black text-2xl md:text-3xl mb-1">{tier.feePerSem}</p>
                                                <p className="text-gray-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Fixed per Semester</p>
                                            </div>
                                            <div className="absolute -right-4 -top-4 rotate-12 opacity-10 group-hover:opacity-20 transition-opacity hidden sm:block">
                                                <GraduationCap size={100} />
                                            </div>
                                        </div>
                                    </Tilt>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ─────────── GALLERY PREVIEW ─────────── */}
            <section className="container mx-auto px-4 py-24">
                <div className="text-center mb-20">
                    <p className="text-ku-gold font-black uppercase tracking-[0.4em] text-xs mb-6">Visual Immersion</p>
                    <h2 className="text-6xl font-black text-ku-blue mb-6">Life Inside <span className="gradient-text tracking-tighter">The Future</span></h2>
                    <p className="text-gray-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">Experience a campus designed for the digital age. Real moments, real growth.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="col-span-2 row-span-2 group cursor-pointer rounded-[3rem] overflow-hidden shadow-2xl relative depth-shadow"
                    >
                        <img src="/assets/images/gallery_113.jpeg" alt="Campus Aerial View" className="w-full h-full object-cover min-h-[400px] transition-transform duration-[2s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ku-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-end p-12">
                            <span className="text-white font-black text-3xl tracking-tight">Kaveri Eco-System — 150 Acres</span>
                        </div>
                    </motion.div>
                    {[
                        { src: '/assets/images/gallery_117.jpeg', label: 'Advanced Precision Labs' },
                        { src: '/assets/images/gallery_120.jpeg', label: 'Corporate Tech Twinning' },
                        { src: '/assets/images/gallery_115.jpeg', label: 'Collaborative Spaces' },
                        { src: '/assets/images/gallery_125.jpeg', label: 'High-Performance Sports' },
                    ].map(({ src, label }, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer rounded-[2.5rem] overflow-hidden shadow-xl relative h-60 hover-tilt reflection-effect"
                        >
                            <img src={src} alt={label} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-125" />
                            <div className="absolute inset-0 bg-ku-blue/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6 text-center">
                                <span className="text-white font-black text-lg leading-tight uppercase tracking-tight">{label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="text-center">
                    <motion.div whileHover={{ y: -5 }}>
                        <Link to="/gallery" className="inline-flex items-center gap-4 border-2 border-ku-blue text-ku-blue px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-ku-blue hover:text-white transition-all duration-500 shadow-lg shadow-blue-900/10">
                            Explore Virtual Tour <FiArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ─────────── TESTIMONIALS ─────────── */}
            <section className="py-24 container mx-auto px-4 relative overflow-hidden">
                <div className="absolute -left-20 top-0 opacity-5">
                    <FiMessageCircle size={400} className="text-ku-gold" />
                </div>
                <div className="text-center mb-20 relative z-10">
                    <p className="text-ku-gold font-black uppercase tracking-[0.4em] text-xs mb-6">Voice of Excellence</p>
                    <h2 className="text-6xl font-black text-ku-blue">The <span className="gradient-text tracking-tighter">Student Creed</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                    {[
                        { name: 'Rahul Sharma', course: 'B.Tech CSE — Gold Medalist', text: 'The Corporate Twinning program at KU is a game-changer. I secured my internship at a Global Fortune 500 company in my 3rd year!', init: 'RS', stars: 5 },
                        { name: 'Priya Desai', course: 'MBA Global — Scholar', text: 'From data analytics labs to leadership workshops, every day at KU feels like a step toward global leadership. The environment is unmatched.', init: 'PD', stars: 5 },
                        { name: 'Ankit Reddy', course: 'B.Sc Agri — Agri-Tech Hub', text: 'I never thought I could build agricultural drones in college. Kaveri University provides the infrastructure to turn dreams into reality.', init: 'AR', stars: 5 },
                    ].map((t, i) => (
                        <Tilt key={i} perspective={1500} scale={1.05} transitionSpeed={2000}>
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card rounded-[3rem] p-10 relative overflow-hidden h-full depth-shadow group"
                            >
                                <div className="text-ku-gold text-8xl font-black absolute -top-4 -left-4 opacity-5 leading-none transition-transform group-hover:scale-110">&ldquo;</div>
                                <div className="flex mb-6">
                                    {Array(t.stars).fill(0).map((_, s) => <Zap key={s} size={16} className="text-ku-gold fill-current mr-1" />)}
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed mb-10 font-bold italic group-hover:text-gray-800 transition-colors">"{t.text}"</p>
                                <div className="flex items-center gap-5 mt-auto">
                                    <div className="w-16 h-16 bg-gradient-to-br from-ku-blue to-blue-800 rounded-[1.5rem] flex items-center justify-center text-white font-black text-xl shadow-xl transform rotate-3">{t.init}</div>
                                    <div>
                                        <h4 className="font-black text-gray-900 text-xl tracking-tight">{t.name}</h4>
                                        <span className="text-xs text-ku-gold font-black uppercase tracking-widest">{t.course}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </section>

            {/* ─────────── FINAL CTA ─────────── */}
            <section className="container mx-auto px-4 py-8 mb-20">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="relative rounded-[5rem] overflow-hidden shadow-[0_60px_120px_rgba(0,41,87,0.5)] border border-white/20 depth-shadow"
                >
                    <img src="/assets/images/gallery_124.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-br from-ku-blue/95 via-blue-900/90 to-slate-900/95"></div>
                    <div className="parallax-layer">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-ku-gold blur-[150px]"
                        />
                    </div>
                    <div className="relative z-10 p-16 md:p-32 text-center">
                        <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="text-ku-gold font-black uppercase tracking-[0.5em] text-sm mb-10"
                        >
                            Final Admissions 2026
                        </motion.p>
                        <h2 className="text-6xl md:text-9xl font-black text-white mb-10 leading-[0.9] tracking-tighter">Your Legacy <br/> Starts <span className="text-ku-gold">Now</span></h2>
                        <p className="text-2xl text-gray-300 mb-14 max-w-3xl mx-auto font-bold leading-relaxed">The 150-acre digital eco-system is waiting for its next visionary. Limited seats available for the 2026 cohort.</p>
                        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
                                <Link to="/apply" className="bg-gradient-to-r from-ku-gold via-yellow-400 to-ku-gold text-ku-blue px-16 py-7 rounded-[2.5rem] font-black text-2xl shadow-[0_25px_50px_rgba(255,191,0,0.6)] active:scale-95 transition-all">
                                    Secure My Future →
                                </Link>
                            </motion.div>
                            <a href="https://wa.me/919666041795" className="glass-card text-white px-12 py-7 rounded-[2.5rem] font-black text-2xl hover:bg-white/10 transition-all border border-white/30 backdrop-blur-2xl">
                                Direct Counselor Access
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
