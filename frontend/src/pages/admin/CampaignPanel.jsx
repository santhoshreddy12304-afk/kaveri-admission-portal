import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiSend, FiImage, FiClock, FiSmartphone, FiCheckCircle } from 'react-icons/fi';

const CampaignPanel = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        messageBody: 'Admissions Open at Kaveri University! 🎓\n\nApply now for B.Tech, Agriculture & Management programs.\n\n✅ 150-Acre Campus\n✅ Top Scholarships\n\nLimited seats available. Apply today:',
        admissionLink: 'https://kaveriuniversity.edu.in/apply'
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => { fetchCampaigns(); }, []);

    const fetchCampaigns = async () => {
        try {
            const res = await axios.get('/api/campaigns');
            setCampaigns(res.data);
        } catch (error) { console.error(error); }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('messageBody', formData.messageBody);
        submitData.append('admissionLink', formData.admissionLink);
        if (image) submitData.append('imageAttached', image);

        try {
            await axios.post('/api/campaigns', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success('🚀 Campaign launched successfully!');
            setFormData({ ...formData, name: '' });
            setImage(null); setImagePreview(null);
            document.getElementById('image-upload').value = '';
            fetchCampaigns();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Failed to start campaign');
        } finally { setLoading(false); }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left: Campaign Composer Form */}
            <div className="xl:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-ku-blue to-blue-800 px-8 py-6 text-white flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                <div className="p-2 bg-white/10 rounded-xl"><FiSend /></div>
                                New Broadcast Campaign
                            </h2>
                            <p className="text-blue-200 text-sm mt-1">Send bulk WhatsApp messages to all uploaded contacts.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Campaign Internal Name *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g., Early Bird Engineering Offers"
                                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-ku-blue focus:ring-1 focus:ring-ku-blue outline-none transition-all font-medium" />
                            </div>

                            <div className="md:col-span-2">
                                <div className="flex justify-between items-end mb-2 ml-1">
                                    <label className="block text-gray-700 font-bold text-sm">Message Content *</label>
                                    <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">{formData.messageBody.length} / 1024 chars</span>
                                </div>
                                <textarea name="messageBody" value={formData.messageBody} onChange={handleChange} required rows="6"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-ku-blue focus:ring-1 focus:ring-ku-blue outline-none transition-all resize-none font-medium leading-relaxed"></textarea>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Call to Action Link *</label>
                                <div className="flex relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔗</span>
                                    <input type="url" name="admissionLink" value={formData.admissionLink} onChange={handleChange} required
                                        className="w-full pl-11 pr-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-ku-blue focus:ring-1 focus:ring-ku-blue outline-none transition-all font-medium" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h4 className="font-bold text-gray-800 mb-1">Attach Media Banner (Optional)</h4>
                                <p className="text-gray-500 text-sm">JPEG or PNG. Messages with images get 42% higher engagement.</p>
                            </div>
                            <div className="flex-shrink-0">
                                <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                <label htmlFor="image-upload" className="cursor-pointer bg-white border border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-xl hover:border-ku-blue hover:text-ku-blue transition-all flex items-center shadow-sm">
                                    <FiImage className="mr-2 text-xl" /> {image ? 'Change Media' : 'Select Media'}
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                            <button type="submit" disabled={loading}
                                className={`px-10 py-4 rounded-xl font-black text-white text-lg transition-all shadow-lg flex items-center ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:-translate-y-0.5'}`}>
                                {loading ? (
                                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div> Firing Campaign...</>
                                ) : (
                                    <><FiSend className="mr-3 text-xl" /> Launch Blast</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right: Live Preview & History Summary */}
            <div className="space-y-6">
                
                {/* Real-time Phone Preview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2"><FiSmartphone className="text-ku-blue" /> Live Preview</h3>
                    <div className="bg-[#E5DDD5] rounded-[2rem] p-4 border-[8px] border-gray-800 shadow-xl mx-auto max-w-[320px] relative h-[480px] flex flex-col overflow-hidden">
                        {/* Status bar mock */}
                        <div className="flex justify-between items-center text-xs text-black/60 px-2 font-medium mb-3 relative z-10 w-full">
                            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <div className="flex gap-1"><span>📶</span><span>🔋</span></div>
                        </div>
                        {/* App header mock */}
                        <div className="bg-[#075E54] -mx-4 -mt-10 pt-10 pb-3 px-4 flex items-center gap-3 text-white shadow-sm relative z-0">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">KU</div>
                            <div className="leading-tight">
                                <div className="font-bold text-[15px]">Kaveri University</div>
                                <div className="text-[11px] text-white/70 flex items-center gap-1"><FiCheckCircle size={10} className="text-green-300" /> Official Account</div>
                            </div>
                        </div>
                        
                        {/* Chat area */}
                        <div className="flex-1 overflow-y-auto pt-4 pb-2 scrollbar-hide">
                            <div className="bg-white rounded-xl rounded-tl-none shadow-sm max-w-[85%] overflow-hidden">
                                {imagePreview && (
                                    <div className="p-1 pb-0"><img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg object-cover max-h-32" /></div>
                                )}
                                <div className="px-3 py-2">
                                    <p className="text-[13px] text-gray-800 whitespace-pre-wrap font-sans break-words">{formData.messageBody}</p>
                                    <a href="#" className="text-blue-500 text-[13px] break-all hover:underline block mt-1">{formData.admissionLink}</a>
                                    <p className="text-[10px] text-gray-400 text-right mt-1.5">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Mini */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-black text-gray-800 flex items-center gap-2"><FiClock className="text-ku-blue" /> History</h3>
                        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">{campaigns.length} total</span>
                    </div>
                    <div className="space-y-3">
                        {campaigns.slice(0, 3).map(camp => (
                            <div key={camp._id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <p className="font-bold text-sm text-gray-800 truncate">{camp.name}</p>
                                <div className="flex justify-between items-center mt-2 border-t border-gray-200 pt-2">
                                    <span className="text-xs text-gray-500">{new Date(camp.createdAt).toLocaleDateString()}</span>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1"><FiCheckCircle /> {camp.messagesDelivered} sent</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default CampaignPanel;
