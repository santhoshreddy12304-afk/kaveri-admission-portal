import React from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiCpu } from 'react-icons/fi';

const LoadingHUD = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center p-4">
            {/* Background HUD Layers */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[600px] h-[600px] border border-ku-gold/5 rounded-full"
            ></motion.div>
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[400px] h-[400px] border border-white/5 rounded-full"
            ></motion.div>

            <div className="relative text-center">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-12 flex justify-center"
                >
                    <div className="w-24 h-24 bg-ku-gold/10 rounded-[2rem] flex items-center justify-center text-ku-gold border border-ku-gold/30 shadow-glow">
                        <FiCpu size={48} />
                    </div>
                </motion.div>

                <h2 className="text-4xl font-black text-white uppercase tracking-[0.5em] italic mb-6">Syncing <span className="text-ku-gold">Matrix...</span></h2>
                
                <div className="w-80 h-1 bg-white/5 rounded-full overflow-hidden mx-auto relative shadow-inner">
                    <motion.div 
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-ku-gold to-transparent"
                    ></motion.div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-10 opacity-30">
                    <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.5em]"><FiActivity className="animate-pulse" /> Core_Initializing</div>
                    <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.5em]">Auth_Verifying</div>
                </div>
            </div>

            {/* Matrix Data Stream Overlay */}
            <div className="absolute top-10 right-10 flex flex-col items-end gap-1 opacity-10">
                <div className="text-[8px] font-mono text-ku-gold uppercase tracking-[0.4em]">Node: SYS_BOOT_v4.0</div>
                <div className="text-[8px] font-mono text-white uppercase tracking-[0.4em]">Buffer: Ready</div>
            </div>
        </div>
    );
};

export default LoadingHUD;
