import React from 'react';
import { FiRefreshCw, FiZapOff } from 'react-icons/fi';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Operational Matrix Failure:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#020617] flex items-center justify-center p-8">
                    <div className="text-center max-w-xl">
                        <div className="w-24 h-24 bg-red-500/10 rounded-[2rem] flex items-center justify-center text-red-500 border border-red-500/30 mx-auto mb-10 shadow-glow-sm">
                            <FiZapOff size={48} />
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-6">Matrix <span className="text-red-500">Critical Failure.</span></h2>
                        <p className="text-gray-500 font-medium italic mb-12">The operational matrix has encountered a catastrophic logic breach. Neural link unstable.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-4 bg-white text-ku-blue px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-ku-gold transition-all mx-auto shadow-glow-sm"
                        >
                            <FiRefreshCw /> Attempt Re-Sync
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
