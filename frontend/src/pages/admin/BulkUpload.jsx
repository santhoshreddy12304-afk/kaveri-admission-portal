import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import * as xlsx from 'xlsx';
import { FiUploadCloud, FiFileText, FiCheckCircle, FiAlertCircle, FiDatabase, FiInfo, FiTrash2, FiActivity, FiArrowRight } from 'react-icons/fi';

const BulkUpload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [ingestStats, setIngestStats] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = xlsx.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws, { header: 1 });
                
                // Validate headers
                const headers = data[0] || [];
                const required = ['fullName', 'mobileNumber'];
                const missing = required.filter(r => !headers.includes(r));
                
                if (missing.length > 0) {
                    toast.error(`Incompatible matrix: Missing headers [${missing.join(', ')}]`);
                    setFile(null);
                    return;
                }

                setPreview(data.slice(1, 6)); // First 5 rows for preview
                toast.info('Matrix data parsed. Ready for ingestion.');
            } catch (err) {
                toast.error('Corrupt data stream: Parsing failed.');
                setFile(null);
            }
        };
        reader.readAsBinaryString(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/leads/admin/bulk-upload', formData);
            setIngestStats(res.data);
            toast.success(`Ingestion Complete: ${res.data.count} signals added to matrix.`);
            setFile(null);
            setPreview([]);
        } catch (error) {
            toast.error('Ingestion failure: Conflict in data stream.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            {/* Header Hub */}
            <div className="text-center space-y-4">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 text-ku-gold shadow-glow-sm mb-4"
                >
                    <FiDatabase size={32} />
                </motion.div>
                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Matrix <span className="text-ku-gold">Ingestion.</span></h2>
                <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.4em] italic">Parallel Data Stream Processing / V1.2</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Ingestion Slot */}
                <div className="md:col-span-2 space-y-6">
                    <div className={`
                        glass-dark border-2 border-dashed rounded-[3rem] p-12 text-center transition-all group relative overflow-hidden
                        ${file ? 'border-ku-gold/50 bg-ku-gold/5' : 'border-white/10 hover:border-white/30'}
                    `}>
                        <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                        
                        <div className="relative z-10">
                            <motion.div 
                                animate={file ? { y: [0, -10, 0] } : {}} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                className={`w-20 h-20 rounded-[2rem] mx-auto mb-6 flex items-center justify-center transition-colors ${file ? 'bg-ku-gold text-ku-blue' : 'bg-white/5 text-gray-500'}`}
                            >
                                <FiUploadCloud size={40} />
                            </motion.div>
                            
                            {file ? (
                                <div className="space-y-2">
                                    <p className="text-white font-black uppercase italic tracking-tighter text-lg">{file.name}</p>
                                    <p className="text-[10px] text-ku-gold font-black uppercase tracking-widest">Signal Locked / {(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-gray-300 font-black uppercase italic tracking-tighter text-lg">Initialize Port</p>
                                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest leading-loose">
                                        Drop .xlsx or .csv matrix here <br /> or click to browse modules
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Background FX */}
                        <div className="absolute inset-0 bg-gradient-to-br from-ku-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>

                    {/* Data Preview Mesh */}
                    <AnimatePresence>
                        {preview.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass-dark border border-white/5 rounded-[2.5rem] overflow-hidden shadow-4xl"
                            >
                                <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                        <FiActivity className="text-ku-gold" /> Matrix Sample Check
                                    </h3>
                                    <button onClick={() => {setFile(null); setPreview([]);}} className="text-red-400 hover:text-red-500 transition-colors">
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                                <div className="p-4 overflow-x-auto">
                                    <table className="w-full text-left">
                                        <tbody className="divide-y divide-white/[0.03]">
                                            {preview.map((row, i) => (
                                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                                    {Array.isArray(row) && row.map((cell, j) => (
                                                        <td key={j} className="py-3 px-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest border-r border-white/[0.03] last:border-0 italic">
                                                            {cell?.toString() || '—'}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Hub */}
                    <div className="flex justify-center pt-4">
                        <button 
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className={`
                                w-full py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] transition-all relative overflow-hidden group
                                ${!file || uploading ? 'bg-white/5 text-gray-700 cursor-not-allowed border border-white/5' : 'bg-white text-ku-blue shadow-glow hover:bg-ku-gold active:scale-[0.98]'}
                            `}
                        >
                            {uploading ? (
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-4 h-4 border-2 border-ku-blue border-t-transparent rounded-full animate-spin"></div>
                                    <span>Syncing Matrix...</span>
                                </div>
                            ) : (
                                <span>Execute Ingestion</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Operations Terminal */}
                <div className="space-y-6">
                    <div className="glass-dark border border-white/5 p-8 rounded-[3rem] space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                <FiInfo className="text-ku-gold" /> Protocol Specs
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    { label: 'Column A', desc: 'fullName (String)', check: true },
                                    { label: 'Column B', desc: 'mobileNumber (10 DIGIT)', check: true },
                                    { label: 'Metadata', desc: 'email, city, course (Optional)', check: true },
                                ].map((spec, i) => (
                                    <li key={i} className="flex items-start gap-4 p-3 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-white/20 transition-all">
                                        <FiCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-black text-white uppercase italic tracking-tighter">{spec.label}</p>
                                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{spec.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-ku-gold/10 border border-ku-gold/20 rounded-2xl p-6">
                            <h5 className="text-[10px] font-black text-ku-gold uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <FiAlertCircle /> Safety Override
                            </h5>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">
                                Duplicate signals are automatically reconciled based on mobile number parity. System will ignore null records.
                            </p>
                        </div>
                    </div>

                    {/* Status HUD */}
                    <AnimatePresence>
                        {ingestStats && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass-dark border border-emerald-500/20 bg-emerald-500/[0.02] p-8 rounded-[3rem]"
                            >
                                <div className="flex items-center gap-4 mb-4 text-emerald-400">
                                    <FiCheckCircle size={24} />
                                    <h4 className="text-sm font-black uppercase tracking-widest italic">Success</h4>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-black text-white italic tracking-tighter">{ingestStats.count}</p>
                                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.3em]">New Records Synced</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default BulkUpload;
