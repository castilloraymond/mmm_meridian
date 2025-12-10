import { useLocation, useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { ArrowLeft, Download, Share2 } from 'lucide-react';

export default function DashboardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    if (!result) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No Data Found</h2>
                    <button
                        onClick={() => navigate('/upload')}
                        className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors"
                    >
                        Go to Upload
                    </button>
                </div>
            </div>
        );
    }

    const roiData = Object.entries(result.roi).map(([name, value]) => ({ name, value }));
    const attributionData = Object.entries(result.attribution).map(([name, value]) => ({ name, value }));
    const COLORS = ['#818cf8', '#22d3ee', '#34d399', '#f472b6'];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <header className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold">MMM Insights Dashboard</h1>
                        <p className="text-gray-400">Model Fit: {(result.model_fit * 100).toFixed(1)}%</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                        <Share2 size={18} />
                        Share
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
                        <Download size={18} />
                        Export Report
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* ROI Chart */}
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <h3 className="text-xl font-semibold mb-6">Return on Investment (ROI)</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={roiData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="value" fill="#818cf8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Attribution Chart */}
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <h3 className="text-xl font-semibold mb-6">Spend Attribution</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={attributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {attributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Predictions Chart */}
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-6">Sales Prediction (Actual vs Model)</h3>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={result.predictions}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="date" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="actual_sales" stroke="#22d3ee" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="predicted_sales" stroke="#f472b6" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
