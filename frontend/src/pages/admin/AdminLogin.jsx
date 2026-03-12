import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const logo = '/assets/images/logo.png';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) navigate('/portal-command-center/dashboard');
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(username, password);
        if (success) {
            navigate('/portal-command-center/dashboard');
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-ku-blue">
                <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url(/assets/images/gallery_125.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-ku-blue via-transparent to-ku-blue/50"></div>
                <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full">
                    <img src={logo} alt="Kaveri University Logo" className="h-16 w-auto object-contain filter brightness-0 invert self-start" />
                    <div className="text-white">
                        <div className="bg-ku-gold text-ku-blue font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6 inline-block">Authorized Portal Only</div>
                        <h1 className="text-5xl font-black mb-6 leading-tight">University<br />Central Command</h1>
                        <p className="text-lg text-blue-200 max-w-md font-medium">Manage admissions, handle student enquiries, and run WhatsApp campaigns securely.</p>
                    </div>
                </div>
            </div>

            {/* Right Login Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-40"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-[100px] opacity-50"></div>
                
                <div className="w-full max-w-md relative z-10 glass-card bg-white/80 p-10 rounded-[2.5rem] shadow-2xl border border-white/40">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <img src={logo} alt="Kaveri University" className="h-12 mx-auto mix-blend-multiply" />
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-800 mb-2">Admin Login</h2>
                        <p className="text-gray-500 font-medium">Please sign in to access the dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-ku-blue outline-none transition bg-white/70 font-medium text-gray-800"
                                placeholder="Enter admin username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2 text-sm ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-ku-blue outline-none transition bg-white/70 font-medium text-gray-800"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-ku-blue text-white py-4 rounded-2xl font-black text-lg transition-all shadow-[0_10px_30px_rgba(0,41,87,0.3)] ${loading ? 'opacity-70' : 'hover:-translate-y-1 hover:bg-blue-900'}`}
                        >
                            {loading ? 'Authenticating...' : 'Sign In →'}
                        </button>
                    </form>
                    
                    <p className="text-center text-xs text-gray-400 mt-8 font-medium">Secured by Kaveri Connect Admissions Software<br/>© 2026 Kaveri University</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
