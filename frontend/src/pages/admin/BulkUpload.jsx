import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUploadCloud, FiFileText, FiDatabase, FiCheckCircle, FiInfo } from 'react-icons/fi';

const BulkUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalContacts, setTotalContacts] = useState(0);
    const fileInputRef = useRef(null);

    useEffect(() => { fetchContactsCount(); }, []);

    const fetchContactsCount = async () => {
        try {
            const res = await axios.get('/api/contacts/count');
            setTotalContacts(res.data.count);
        } catch (err) { console.error(err); }
    }

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && (selected.name.endsWith('.xlsx') || selected.name.endsWith('.csv'))) {
            setFile(selected);
        } else {
            toast.error('Invalid file type. Only .xlsx or .csv allowed.');
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        try {
            const res = await axios.post('/api/contacts/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success(res.data.msg);
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            fetchContactsCount();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Upload failed. Check file format.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header / Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-gradient-to-br from-ku-blue to-blue-800 rounded-2xl shadow-sm p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-ku-gold rounded-full blur-[80px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-2">Grow Your Database</h2>
                        <p className="text-blue-200 text-sm max-w-md leading-relaxed">Import student contacts from events, school visits, or third-party vendors for WhatsApp marketing campaigns.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-12 h-12 bg-blue-50 text-ku-blue rounded-xl flex items-center justify-center mb-3">
                        <FiDatabase className="text-xl" />
                    </div>
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">Total Contacts</p>
                    <h3 className="text-4xl font-black text-gray-800">{totalContacts.toLocaleString()}</h3>
                </div>
            </div>

            {/* Upload Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-black text-gray-800 mb-2">Upload Contact List</h3>
                    <p className="text-gray-500">Max file size: 10MB. Formats accepted: .xlsx, .csv</p>
                </div>

                <div 
                    className={`border-3 border-dashed rounded-[2rem] p-12 text-center transition-all ${file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-ku-blue bg-gray-50 hover:bg-gray-100/50'}`}
                >
                    <input
                        id="file-upload" type="file" ref={fileInputRef} accept=".xlsx, .csv"
                        onChange={handleFileChange} className="hidden"
                    />
                    
                    {!file ? (
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6">
                                <FiUploadCloud className="text-4xl text-ku-blue" />
                            </div>
                            <p className="text-lg font-bold text-gray-800 mb-2">Drag & Drop your file here</p>
                            <p className="text-gray-500 text-sm mb-6">or click the button below to browse</p>
                            <label htmlFor="file-upload" className="cursor-pointer bg-white border border-gray-200 text-gray-800 px-8 py-3 rounded-xl font-bold hover:shadow-md hover:border-ku-blue transition-all">
                                Browse Files
                            </label>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <FiFileText className="text-4xl text-green-600" />
                            </div>
                            <p className="text-lg font-bold text-green-800 mb-1">{file.name}</p>
                            <p className="text-green-600/70 text-sm mb-6 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            
                            <div className="flex gap-4">
                                <button onClick={() => { setFile(null); if(fileInputRef.current) fileInputRef.current.value = ''; }} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition">
                                    Cancel
                                </button>
                                <button onClick={handleUpload} disabled={loading} className={`px-8 py-3 rounded-xl font-bold flex items-center transition shadow-lg ${loading ? 'bg-green-400 text-white cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:-translate-y-0.5'}`}>
                                    {loading ? (
                                        <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> Uploading...</>
                                    ) : (
                                        <><FiUploadCloud className="mr-2 text-lg" /> Upload & Process DB</>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* File Format Guide */}
                <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                        <FiInfo className="text-blue-500 text-xl flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-blue-900 mb-2">Required File Format</h4>
                            <p className="text-blue-800/80 text-sm leading-relaxed mb-4">Your Excel/CSV file must have the following column headers exactly as written (case-sensitive). Extra columns are ignored.</p>
                            
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-blue-100">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600">
                                            <th className="py-2 px-4 border-r border-b">Name</th>
                                            <th className="py-2 px-4 border-r border-b">Phone Number <span className="text-red-500">*</span></th>
                                            <th className="py-2 px-4 border-r border-b">Course</th>
                                            <th className="py-2 px-4 border-b">State</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-500">
                                        <tr>
                                            <td className="py-2 px-4 border-r">Rahul M</td>
                                            <td className="py-2 px-4 border-r">9876543210</td>
                                            <td className="py-2 px-4 border-r">B.Tech CSE</td>
                                            <td className="py-2 px-4">Telangana</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkUpload;
