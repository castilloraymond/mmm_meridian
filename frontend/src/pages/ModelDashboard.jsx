import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import OverviewTab from '../components/OverviewTab';
import ModelFitTab from '../components/ModelFitTab';
import SimulatorTab from '../components/SimulatorTab';
import ResourcesTab from '../components/ResourcesTab';

export default function ModelDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;
    const [activeTab, setActiveTab] = useState('overview');

    if (!result) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">No Data Found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'model-fit', label: 'Model Fit' },
        { id: 'simulator', label: 'Simulator' },
        { id: 'resources', label: 'Resources' },
    ];

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <header className="bg-slate-800">
                <div className="max-w-[1400px] mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-base font-semibold text-white">
                                    Marketing Mix Model - Demo
                                </h1>
                                <p className="text-xs text-slate-400">
                                    Using Google's Meridian Framework | Status: <span className="text-emerald-400">Active</span>
                                </p>
                            </div>
                        </div>

                        {/* Right Side Nav */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="text-sm text-slate-300 hover:text-white transition-colors"
                            >
                                New Model
                            </button>

                            {/* Tab Navigation - Pill Style */}
                            <div className="flex bg-slate-700 rounded-full p-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                                            ? 'bg-slate-600 text-white'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-[1400px] mx-auto p-6">
                {activeTab === 'overview' && <OverviewTab data={result} onNavigate={setActiveTab} />}
                {activeTab === 'model-fit' && <ModelFitTab data={result} />}
                {activeTab === 'simulator' && <SimulatorTab data={result} />}
                {activeTab === 'resources' && <ResourcesTab />}
            </main>
        </div>
    );
}
