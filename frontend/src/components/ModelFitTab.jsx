import { RefreshCw, ExternalLink } from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function ModelFitTab({ data }) {
    const { diagnostics, model_parameters, weekly_data } = data;

    // Quality badge helper
    const getQualityBadge = (metric, value) => {
        if (metric === 'r_squared') {
            if (value >= 0.9) return { label: 'Excellent', color: 'bg-emerald-500 text-white' };
            if (value >= 0.7) return { label: 'Good', color: 'bg-amber-500 text-white' };
            return { label: 'Poor', color: 'bg-rose-500 text-white' };
        }
        if (metric === 'mape') {
            if (value <= 10) return { label: 'Low Error', color: 'bg-emerald-500 text-white' };
            if (value <= 20) return { label: 'Moderate', color: 'bg-amber-500 text-white' };
            return { label: 'High Error', color: 'bg-rose-500 text-white' };
        }
        if (metric === 'durbin_watson') {
            if (value >= 1.5 && value <= 2.5) return { label: 'Normal', color: 'bg-slate-400 text-white' };
            return { label: 'Warning', color: 'bg-amber-500 text-white' };
        }
        return { label: '', color: '' };
    };

    // Format week labels for X-axis
    const formatWeek = (week) => {
        const weekNum = parseInt(week.replace('W', ''));
        return `W${weekNum}`;
    };

    return (
        <div className="space-y-5">
            {/* Two-Column Main Layout */}
            <div className="grid lg:grid-cols-3 gap-5">
                {/* Left Side - Chart (2/3 width) */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Chart */}
                    <div
                        className="bg-white rounded-xl p-6 border border-slate-200"
                        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-sm font-semibold text-slate-800">
                                Actual vs. Predicted Revenue (52 Weeks)
                            </h3>
                            <div className="flex items-center gap-5 text-xs">
                                <span className="flex items-center gap-2">
                                    <span className="w-6 h-0.5 bg-slate-400"></span>
                                    <span className="text-slate-500">Actual</span>
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-6 h-0.5 bg-indigo-500"></span>
                                    <span className="text-slate-500">Predicted (Model)</span>
                                </span>
                            </div>
                        </div>

                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={weekly_data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={true} />
                                    <XAxis
                                        dataKey="week"
                                        stroke="#94a3b8"
                                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                                        tickLine={false}
                                        axisLine={{ stroke: '#e2e8f0' }}
                                        interval={12}
                                        tickFormatter={formatWeek}
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value.toFixed(1)}`}
                                        domain={['auto', 'auto']}
                                        width={40}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            borderColor: '#e2e8f0',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                            fontSize: '12px'
                                        }}
                                        labelStyle={{ color: '#475569', fontWeight: 600, fontSize: '11px' }}
                                        formatter={(value) => [`$${value.toFixed(2)}M`, '']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="actual"
                                        stroke="#94a3b8"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Actual"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="predicted"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        dot={false}
                                        name="Predicted"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <p className="mt-4 text-[10px] text-slate-400 flex items-start gap-2">
                            <span className="w-3.5 h-3.5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] text-slate-500 shrink-0 mt-0.5">i</span>
                            <span>The blue line represents the model's prediction of sales based on media inputs. The grey line is actual historical sales. A tight correlation indicates the model has successfully isolated the impact of your marketing channels.</span>
                        </p>
                    </div>
                </div>

                {/* Right Side - Metrics & Parameters (1/3 width) */}
                <div className="space-y-5">
                    {/* Fit Metrics Card */}
                    <div
                        className="bg-white rounded-xl p-5 border border-slate-200"
                        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                    >
                        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
                            Fit Metrics
                        </h3>

                        <div className="space-y-5">
                            {/* R-Squared */}
                            <div className="pb-5 border-b border-slate-100">
                                <div className="flex items-start justify-between mb-1">
                                    <div className="text-3xl font-bold text-slate-900">
                                        {diagnostics.r_squared.toFixed(2)}
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getQualityBadge('r_squared', diagnostics.r_squared).color}`}>
                                        {getQualityBadge('r_squared', diagnostics.r_squared).label}
                                    </span>
                                </div>
                                <div className="text-xs font-semibold text-slate-700 mb-1.5">R-Squared (R²)</div>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
                                    Measures how well the model explains your sales data. Think of it as a "prediction accuracy score" from 0 to 1.
                                    <span className="block mt-1 font-medium text-slate-600">
                                        {diagnostics.r_squared >= 0.7 ? '✓ Good: ' : '⚠ Needs improvement: '}
                                        Higher is better. Aim for 0.7 or above.
                                    </span>
                                </p>
                                <a
                                    href="https://www.investopedia.com/terms/r/r-squared.asp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    Learn more about R-Squared
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            </div>

                            {/* MAPE */}
                            <div className="pb-5 border-b border-slate-100">
                                <div className="flex items-start justify-between mb-1">
                                    <div className="text-3xl font-bold text-slate-900">
                                        {diagnostics.mape.toFixed(1)}%
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getQualityBadge('mape', diagnostics.mape).color}`}>
                                        {getQualityBadge('mape', diagnostics.mape).label}
                                    </span>
                                </div>
                                <div className="text-xs font-semibold text-slate-700 mb-1.5">MAPE (Mean Absolute Percentage Error)</div>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
                                    Average prediction error as a percentage. Shows how far off predictions typically are from actual values.
                                    <span className="block mt-1 font-medium text-slate-600">
                                        {diagnostics.mape <= 10 ? '✓ Great: ' : diagnostics.mape <= 20 ? '⚠ OK: ' : '✗ High error: '}
                                        Lower is better. Under 10% is excellent.
                                    </span>
                                </p>
                                <a
                                    href="https://www.investopedia.com/terms/m/mean-absolute-percentage-error-mape.asp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    Learn more about MAPE
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            </div>

                            {/* Durbin-Watson */}
                            <div>
                                <div className="flex items-start justify-between mb-1">
                                    <div className="text-3xl font-bold text-slate-900">
                                        {diagnostics.durbin_watson.toFixed(2)}
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getQualityBadge('durbin_watson', diagnostics.durbin_watson).color}`}>
                                        {getQualityBadge('durbin_watson', diagnostics.durbin_watson).label}
                                    </span>
                                </div>
                                <div className="text-xs font-semibold text-slate-700 mb-1.5">Durbin-Watson</div>
                                <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
                                    Checks if predictions are consistent over time (no patterns in errors). Values range from 0 to 4.
                                    <span className="block mt-1 font-medium text-slate-600">
                                        {diagnostics.durbin_watson >= 1.5 && diagnostics.durbin_watson <= 2.5 ? '✓ Good: ' : '⚠ Check model: '}
                                        Values near 2.0 are ideal. Too high or low means the model may be missing patterns.
                                    </span>
                                </p>
                                <a
                                    href="https://www.investopedia.com/terms/d/durbin-watson-statistic.asp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[10px] text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    Learn more about Durbin-Watson
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
