import { useState, useMemo } from 'react';
import { RotateCcw, Zap } from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceDot, Tooltip
} from 'recharts';

export default function SimulatorTab({ data }) {
    const { channels, saturation_curves, total_budget } = data;

    // Initialize budget state from channel data
    const initialBudgets = {};
    channels.forEach(ch => {
        initialBudgets[ch.name] = ch.spend;
    });

    const [budgets, setBudgets] = useState(initialBudgets);
    const [originalBudgets] = useState(initialBudgets);
    const [maxBudget, setMaxBudget] = useState(total_budget);

    // Format currency
    const formatCurrency = (value) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        }
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(0)}k`;
        }
        return `$${value.toLocaleString()}`;
    };

    // Calculate total budget
    const currentTotal = useMemo(() =>
        Object.values(budgets).reduce((sum, val) => sum + val, 0),
        [budgets]
    );

    // Simulate projected metrics based on budget changes
    const simulation = useMemo(() => {
        let projectedRevenue = 167500000;
        let totalROAS = 0;

        channels.forEach(ch => {
            const original = originalBudgets[ch.name];
            const current = budgets[ch.name];
            const change = (current - original) / original;
            const efficiency = ch.mROAS * (1 - Math.abs(change) * 0.3);
            projectedRevenue += change * original * efficiency;
            totalROAS += current * ch.mROAS;
        });

        totalROAS = totalROAS / currentTotal;
        const revenueChange = projectedRevenue - 167500000;
        const optScore = Math.max(0, Math.min(100, 65 + (revenueChange / 1000000) * 2));

        return {
            projectedRevenue,
            revenueChange,
            blendedROAS: totalROAS,
            optimizationScore: Math.round(optScore)
        };
    }, [budgets, channels, originalBudgets, currentTotal]);

    // Handle slider change
    const handleSliderChange = (channelName, value) => {
        setBudgets(prev => ({
            ...prev,
            [channelName]: parseInt(value)
        }));
    };

    // Reset budgets
    const handleReset = () => {
        setBudgets(originalBudgets);
        setMaxBudget(total_budget);
    };

    // Optimize budgets based on mROAS
    const handleOptimize = () => {
        // Calculate optimal allocation based on mROAS
        const totalMROAS = channels.reduce((sum, ch) => sum + ch.mROAS, 0);
        const newBudgets = {};

        channels.forEach(ch => {
            // Allocate budget proportionally to mROAS
            const weight = ch.mROAS / totalMROAS;
            const curve = saturation_curves.find(c => c.channel === ch.name);
            const optimalSpend = Math.min(
                weight * maxBudget,
                curve?.max_capacity || ch.spend * 2
            );
            newBudgets[ch.name] = Math.round(optimalSpend / 100000) * 100000; // Round to nearest 100k
        });

        setBudgets(newBudgets);
    };

    // Generate saturation curve data points with marker
    const generateCurveData = (curve, currentBudget) => {
        const points = [];
        const maxX = curve.max_capacity * 1.2;
        const step = maxX / 50;

        for (let x = 0; x <= maxX; x += step) {
            const y = Math.pow(x, curve.slope) /
                (Math.pow(curve.half_saturation, curve.slope) + Math.pow(x, curve.slope));
            points.push({ x, y: y * 100, isMarker: false });
        }

        // Add the current position as a specific point for the marker
        const currentY = Math.pow(currentBudget, curve.slope) /
            (Math.pow(curve.half_saturation, curve.slope) + Math.pow(currentBudget, curve.slope)) * 100;

        // Find where to insert the marker point
        const insertIndex = points.findIndex(p => p.x > currentBudget);
        if (insertIndex > 0) {
            points.splice(insertIndex, 0, { x: currentBudget, y: currentY, isMarker: true });
        }

        return { points, currentX: currentBudget, currentY };
    };

    return (
        <div className="grid lg:grid-cols-3 gap-5">
            {/* Left Column - Budget Allocator */}
            <div
                className="bg-white rounded-xl p-5 border border-slate-200"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-semibold text-slate-800">Budget Allocator</h3>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <RotateCcw size={12} />
                        Reset
                    </button>
                </div>

                {/* Budget Controls - Now at the top */}
                <div className="mb-5 pb-5 border-b border-slate-200">
                    {/* Max Budget Input */}
                    <div className="mb-4">
                        <label className="text-xs text-slate-500 block mb-1.5">Max Budget Constraint</label>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm">$</span>
                            <input
                                type="number"
                                value={maxBudget}
                                onChange={(e) => setMaxBudget(Math.max(0, parseInt(e.target.value) || 0))}
                                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter max budget"
                            />
                        </div>
                    </div>

                    {/* Optimize Button */}
                    <button
                        onClick={handleOptimize}
                        className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-sm"
                    >
                        <Zap size={14} />
                        Set to Optimal Spending
                    </button>

                    {/* Current Total Bar */}
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500">Current Total</span>
                        <span className="text-base font-bold text-slate-800">
                            {formatCurrency(currentTotal)}
                        </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-300 rounded-full ${currentTotal > maxBudget ? 'bg-rose-500' : 'bg-indigo-500'}`}
                            style={{ width: `${Math.min(100, (currentTotal / maxBudget) * 100)}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] mt-1.5">
                        <span className={`${currentTotal > maxBudget ? 'text-rose-500 font-medium' : 'text-slate-400'}`}>
                            {currentTotal > maxBudget ? 'Over budget!' : ''}
                        </span>
                        <span className="text-slate-400">Max: {formatCurrency(maxBudget)}</span>
                    </div>
                </div>

                {/* Channel Sliders */}
                <div className="space-y-5">
                    {channels.map((channel) => {
                        const curve = saturation_curves.find(c => c.channel === channel.name);
                        const maxSpend = curve?.max_capacity || channel.spend * 2;
                        const diff = budgets[channel.name] - originalBudgets[channel.name];
                        const diffPct = ((diff / originalBudgets[channel.name]) * 100).toFixed(0);

                        return (
                            <div key={channel.name} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: channel.color }}
                                        />
                                        <span className="text-xs font-medium text-slate-700">
                                            {channel.name}
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-800">
                                        {formatCurrency(budgets[channel.name])}
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min={0}
                                    max={maxSpend}
                                    step={100000}
                                    value={budgets[channel.name]}
                                    onChange={(e) => handleSliderChange(channel.name, e.target.value)}
                                    className="w-full h-1 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, ${channel.color} 0%, ${channel.color} ${(budgets[channel.name] / maxSpend) * 100}%, #e2e8f0 ${(budgets[channel.name] / maxSpend) * 100}%, #e2e8f0 100%)`
                                    }}
                                />

                                <div className="flex items-center justify-between mt-1.5">
                                    <span className="text-[10px] font-medium" style={{ color: channel.color }}>
                                        mROAS: {channel.mROAS.toFixed(2)}x
                                    </span>
                                    <span className={`text-[10px] ${diff === 0 ? 'text-slate-400' : diff > 0 ? 'text-slate-500' : 'text-rose-500'}`}>
                                        Diff: {diff >= 0 ? '+' : ''}{diffPct}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Column - Simulation Results */}
            <div className="lg:col-span-2 space-y-5">
                {/* Simulation Forecast KPIs */}
                <div className="bg-slate-800 rounded-xl p-5">
                    <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Simulation Forecast
                    </h3>

                    <div className="grid grid-cols-3 gap-5">
                        <div>
                            <div className="text-2xl font-bold text-white mb-0.5">
                                {formatCurrency(simulation.projectedRevenue)}
                            </div>
                            <div className="text-[10px] text-slate-400 mb-0.5">Proj. Revenue</div>
                            <div className={`text-xs font-medium ${simulation.revenueChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {simulation.revenueChange >= 0 ? '+' : ''}{formatCurrency(Math.abs(simulation.revenueChange))} vs Current
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white mb-0.5">
                                {simulation.blendedROAS.toFixed(2)}x
                            </div>
                            <div className="text-[10px] text-slate-400 mb-0.5">Blended ROAS</div>
                            <div className="text-xs text-slate-500">Target: 3.0x</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white mb-0.5">
                                {simulation.optimizationScore}/100
                            </div>
                            <div className="text-[10px] text-slate-400 mb-0.5">Optimization Score</div>
                            <div className="text-xs text-slate-500">Based on Hill functions</div>
                        </div>
                    </div>
                </div>

                {/* Saturation Curves */}
                <div
                    className="bg-white rounded-xl p-5 border border-slate-200"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                    <h3 className="text-sm font-semibold text-slate-800 mb-5">
                        Channel Response Curves (Diminishing Returns)
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        {saturation_curves.map((curve) => {
                            const currentBudget = budgets[curve.channel] || curve.current_spend;
                            const { points, currentX, currentY } = generateCurveData(curve, currentBudget);
                            const maxX = curve.max_capacity * 1.2;

                            return (
                                <div key={curve.channel} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="text-xs font-semibold text-slate-700">
                                            {curve.channel}
                                        </div>
                                        <div className="text-[10px] font-medium text-slate-500">
                                            {formatCurrency(currentBudget)} ({currentY.toFixed(0)}% capacity)
                                        </div>
                                    </div>
                                    <div className="h-32 relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={points} margin={{ top: 10, right: 15, bottom: 10, left: 5 }}>
                                                <XAxis
                                                    dataKey="x"
                                                    tick={false}
                                                    axisLine={{ stroke: '#e2e8f0' }}
                                                    domain={[0, maxX]}
                                                    type="number"
                                                />
                                                <YAxis
                                                    tick={false}
                                                    axisLine={{ stroke: '#e2e8f0' }}
                                                    domain={[0, 100]}
                                                />
                                                <Tooltip
                                                    formatter={(value) => [`${value.toFixed(1)}%`, 'Saturation']}
                                                    labelFormatter={(value) => `Spend: ${formatCurrency(value)}`}
                                                    contentStyle={{
                                                        backgroundColor: '#fff',
                                                        borderColor: '#e2e8f0',
                                                        borderRadius: '8px',
                                                        fontSize: '11px'
                                                    }}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="y"
                                                    stroke={curve.color}
                                                    strokeWidth={2.5}
                                                    dot={false}
                                                />
                                                <ReferenceDot
                                                    x={currentX}
                                                    y={currentY}
                                                    r={8}
                                                    fill={curve.color}
                                                    stroke="#fff"
                                                    strokeWidth={3}
                                                    style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))' }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>

                                        {/* Current position indicator */}
                                        <div
                                            className="absolute bottom-8 text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-700 text-white whitespace-nowrap"
                                            style={{
                                                left: `${Math.min(85, Math.max(5, (currentX / maxX) * 100))}%`,
                                                transform: 'translateX(-50%)'
                                            }}
                                        >
                                            You are here
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-[10px] mt-1">
                                        <span className="text-slate-400">$0</span>
                                        <span className="text-indigo-500 font-medium">Max: {formatCurrency(curve.max_capacity)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
