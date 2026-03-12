import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdmissionProcess = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { 
            step: "Step 1", 
            title: "Submit Enquiry Form", 
            desc: "Fill out the online application form with your basic details, academic records, and preferred course.",
            icon: "📝",
            action: "Start Application →",
            link: "/apply"
        },
        { 
            step: "Step 2", 
            title: "Counselling Call", 
            desc: "Our admission experts will call you within 24 hours to check eligibility, explain scholarships, and guide you.",
            icon: "📞",
            action: "WhatsApp Us",
            link: "https://wa.me/919666041795"
        },
        { 
            step: "Step 3", 
            title: "Document Review", 
            desc: "Submit your 10th and 12th/IPE marksheets online. We process your merit scholarship based on these scores.",
            icon: "📄"
        },
        { 
            step: "Step 4", 
            title: "Seat Confirmation", 
            desc: "Pay the initial admission fee of ₹25,000 to secure your seat. Congratulations, you are now part of Kaveri University!",
            icon: "✅"
        }
    ];

    const requirements = [
        "10th Class Marksheet",
        "12th Class / IPE Marksheet (or equivalent)",
        "Transfer Certificate (TC)",
        "Migration Certificate (if applicable)",
        "Aadhar Card / ID Proof",
        "Recent Passport Size Photos"
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-br from-ku-blue via-blue-900 to-slate-900">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage:'url(/assets/images/gallery_113.jpeg)', backgroundSize:'cover', backgroundPosition:'center'}}></div>
                <div className="absolute inset-0 bg-ku-blue/50"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <p className="text-ku-gold font-black uppercase tracking-[0.3em] text-sm mb-4">Admissions 2026-27</p>
                    <h1 className="text-6xl md:text-7xl font-black mb-6">How to <span className="text-ku-gold">Apply</span></h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">A simple, transparent, and fully online admission process. Secure your seat in 4 easy steps.</p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="container mx-auto px-4 py-20 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-ku-blue">Your Journey <span className="gradient-text">Starts Here</span></h2>
                    <p className="text-gray-500 mt-4 text-lg">Click through the steps below to understand the process.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Interactive Process List */}
                    <div className="space-y-4">
                        {steps.map((item, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => setActiveStep(idx)}
                                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border-2 border-transparent ${activeStep === idx ? 'bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-ku-gold transform scale-[1.02]' : 'bg-gray-100 hover:bg-gray-200 opacity-70'} flex items-start gap-6`}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black shadow-inner flex-shrink-0 ${activeStep === idx ? 'bg-gradient-to-br from-ku-gold to-yellow-600 text-white' : 'bg-white text-gray-400'}`}>
                                    {idx + 1}
                                </div>
                                <div>
                                    <div className={`text-sm font-bold uppercase tracking-widest mb-1 ${activeStep === idx ? 'text-ku-gold' : 'text-gray-500'}`}>{item.step}</div>
                                    <h3 className={`text-2xl font-black mb-2 ${activeStep === idx ? 'text-ku-blue' : 'text-gray-700'}`}>{item.title}</h3>
                                    {activeStep === idx && (
                                        <div className="animate-[fade-in_0.5s_ease-out]">
                                            <p className="text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                                            {item.action && (
                                                item.link.startsWith('http') ? (
                                                    <a href={item.link} target="_blank" rel="noreferrer" className="text-ku-blue font-bold text-sm hover:underline">{item.action}</a>
                                                ) : (
                                                    <Link to={item.link} className="text-ku-blue font-bold text-sm hover:underline">{item.action}</Link>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Step Illustration / Info Card */}
                    <div className="glass-card rounded-[2.5rem] p-10 bg-gradient-to-br from-ku-blue to-blue-900 text-white shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-ku-gold rounded-full blur-[80px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="relative z-10 text-center">
                            <div className="text-8xl mb-8 animate-bounce">{steps[activeStep].icon}</div>
                            <h3 className="text-3xl font-black mb-4">{steps[activeStep].title}</h3>
                            <p className="text-blue-100 text-lg leading-relaxed">{steps[activeStep].desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Required Documents Checklist */}
            <section className="bg-gray-100 py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-3xl shadow-xl p-10 md:p-14 border-t-8 border-ku-gold hover-tilt">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">🗂️</div>
                            <div>
                                <h3 className="text-3xl font-black text-ku-blue">Document Checklist</h3>
                                <p className="text-gray-500 font-medium text-lg">Keep these ready for enrollment.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {requirements.map((req, i) => (
                                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-black">✓</div>
                                    <span className="text-gray-700 font-bold">{req}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm font-medium border border-blue-100">
                            <strong>Note:</strong> Original documents must be produced during physical reporting at the campus. 
                            Initial verification can be done via scanned copies on WhatsApp.
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-4xl font-black text-ku-blue mb-6">Ready to Take the First Step?</h2>
                <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">Forms take 2 minutes to fill. Our counsellors handle the rest.</p>
                <div className="flex gap-5 justify-center flex-wrap">
                    <Link to="/apply" className="bg-ku-blue text-white px-12 py-5 rounded-2xl font-black text-xl hover:shadow-[0_15px_30px_rgba(0,41,87,0.3)] transition-all transform hover:-translate-y-2">Start Application Now</Link>
                    <a href="https://wa.me/919666041795" target="_blank" rel="noreferrer" className="bg-green-500 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-green-600 hover:shadow-lg transition-all transform hover:-translate-y-2">Chat on WhatsApp</a>
                </div>
            </section>
        </div>
    );
}

export default AdmissionProcess;
