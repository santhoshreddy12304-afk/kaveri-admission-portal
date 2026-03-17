import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiAlertTriangle, FiActivity } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Matrix Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,191,0,0.4) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            
            <div className="relative z-10 text-center max-w-2xl">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-12"
                >
                    <div className="relative inline-block">
                        <h1 className="text-[12rem] font-black text-white/5 leading-none tracking-tighter uppercase italic">404</h1>
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                            <FiAlertTriangle className="text-ku-gold text-9xl mx-auto animate-pulse drop-shadow-glow" />
                        </div>
                    </div>
                </motion.div>

                <h2 className="text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">Signal <span className="text-ku-gold">Lost.</span></h2>
                <p className="text-blue-100/40 text-2xl font-medium leading-relaxed italic mb-12">
                    The requested node is currently outside of the University operational matrix. It may have been relocated or purged from the central register.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/" className="flex items-center gap-4 bg-white text-ku-blue px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-ku-gold transition-all shadow-glow-sm">
                            <FiHome size={20} /> Re-Establish Neural Link
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/contact" className="flex items-center gap-4 glass-dark border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                            <FiActivity size={20} /> Contact Tech Support
                        </Link>
                    </motion.div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-center gap-10 opacity-20">
                    <div className="text-[10px] font-mono text-ku-gold uppercase tracking-[0.5em]">System: Disconnected</div>
                    <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.5em]">Status: Safe_Exit</div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
