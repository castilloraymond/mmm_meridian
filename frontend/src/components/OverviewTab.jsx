import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, ArrowRight } from 'lucide-react';

export default function OverviewTab({ data, onNavigate }) {
    const { kpis, channels, marginal_efficiency } = data;

    // Animation state
    const [isAnimated, setIsAnimated] = useState(false);

    // Trigger animation after mount
    useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

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

    // KPI Cards data
    const kpiCards = [
        {
            label: 'TOTAL INCREMENTAL REVENUE',
            value: formatCurrency(kpis.total_incremental_revenue),
            delta: kpis.revenue_delta_pct,
            subtitle: 'Attributed to Media Activity'
        },
        {
            label: 'TOTAL ROAS (BLENDED)',
            value: `${kpis.total_roas.toFixed(2)}x`,
            delta: kpis.roas_delta_pct,
            subtitle: 'Return on Ad Spend'
        },
        {
            label: 'BASE SALES (BRAND EQUITY)',
            value: formatCurrency(kpis.base_sales),
            delta: kpis.base_sales_delta_pct,
            subtitle: 'Non-Marketing Baseline'
        },
        {
            label: 'MARGINAL CPA',
            value: `$${kpis.marginal_cpa.toFixed(2)}`,
            delta: kpis.marginal_cpa_delta_pct,
            subtitle: 'Cost per Incremental Acq.'
        },
    ];

    // Contribution data for horizontal bar chart
    const contributionData = [
        {
            name: 'BASELINE',
            value: 89.5,
            amount: kpis.base_sales,
            color: '#facc15' // Yellow
        },
        ...channels.map(ch => ({
            name: ch.name,
            value: ch.contribution_pct,
            amount: ch.contribution,
            color: ch.color
        }))
    ];

    // Sort channels by contribution (excluding baseline which stays first)
    const baseline = contributionData[0];
    const sortedChannels = contributionData.slice(1).sort((a, b) => b.value - a.value);
    const sortedContribution = [baseline, ...sortedChannels];

    return (
        <div className="space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-4 gap-4">
                {kpiCards.map((kpi, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-5 border border-slate-200"
                        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                {kpi.label}
                            </span>
                            <span
                                className={`px-2.5 py-1 rounded text-sm font-bold ${kpi.delta >= 0
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-rose-50 text-rose-600'
                                    }`}
                            >
                                {kpi.delta >= 0 ? '+' : ''}{Math.abs(kpi.delta).toFixed(1)}%
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 mb-0.5">
                            {kpi.value}
                        </div>
                        <div className="text-xs text-slate-400">
                            {kpi.subtitle}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-3 gap-5">
                {/* Left: Contribution Chart (2/3 width) */}
                <div
                    className="col-span-2 bg-white rounded-xl p-6 border border-slate-200"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="w-4 h-4 text-slate-400" />
                        <h3 className="text-sm font-semibold text-slate-800">
                            Contribution by Baseline & Marketing Channels
                        </h3>
                    </div>

                    {/* Horizontal Bar Chart */}
                    <div className="space-y-4">
                        {sortedContribution.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className="w-24 text-xs text-slate-500 font-medium shrink-0">
                                    {item.name}
                                </div>
                                <div className="flex-1 flex items-center gap-3">
                                    <div className="flex-1 h-5 bg-slate-50 rounded relative overflow-hidden">
                                        <div
                                            className="absolute inset-y-0 left-0 rounded transition-all ease-out"
                                            style={{
                                                width: isAnimated ? `${item.value}%` : '0%',
                                                backgroundColor: item.color,
                                                transitionDuration: '800ms',
                                                transitionDelay: `${index * 80}ms`
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="w-28 text-xs text-slate-500 text-right shrink-0 transition-opacity duration-500"
                                        style={{
                                            opacity: isAnimated ? 1 : 0,
                                            transitionDelay: `${index * 80 + 400}ms`
                                        }}
                                    >
                                        <span className="font-medium text-slate-700">{item.value.toFixed(1)}%</span>
                                        <span className="text-slate-400 ml-1">({formatCurrency(item.amount)})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* X-Axis Labels */}
                    <div className="flex mt-5 ml-24 mr-28">
                        <div className="flex-1 flex justify-between text-[10px] text-slate-300 font-medium relative">
                            {/* Vertical dashed gridlines */}
                            <div className="absolute inset-0 flex justify-between pointer-events-none" style={{ top: '-150px', height: '150px' }}>
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="border-l border-dashed border-slate-200" style={{ height: '100%' }} />
                                ))}
                            </div>
                            <span>0%</span>
                            <span>20%</span>
                            <span>40%</span>
                            <span>60%</span>
                            <span>80%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    <p className="mt-4 text-[10px] text-slate-400 italic">
                        Note: This chart breaks down revenue drivers, ordering marketing channels by contribution size on top of the baseline.
                    </p>
                </div>

                {/* Right: Marginal Efficiency (1/3 width) */}
                <div
                    className="bg-white rounded-xl p-6 border border-slate-200"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-slate-500" />
                        <h3 className="text-sm font-semibold text-slate-800">Recommendations</h3>
                    </div>

                    <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                        High mROAS = Opportunity to scale.<br />
                        Low mROAS = Saturated.
                    </p>
                    <button
                        onClick={() => onNavigate && onNavigate('simulator')}
                        className="text-[11px] text-indigo-500 hover:text-indigo-600 font-medium flex items-center gap-1 mb-4 transition-colors"
                    >
                        Go to Simulator for more details
                        <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="space-y-4">
                        {marginal_efficiency.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        {item.mROAS.toFixed(1)}x
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-slate-800">{item.channel}</div>
                                        <div className="text-[10px] text-slate-400">
                                            Current Spend: {formatCurrency(item.current_spend)}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`text-[11px] font-semibold flex items-center gap-1 ${item.recommendation === 'MAINTAIN'
                                        ? 'text-amber-500'
                                        : item.recommendation === 'INCREASE'
                                            ? 'text-emerald-500'
                                            : 'text-rose-500'
                                        }`}
                                >
                                    {item.recommendation}
                                    {item.recommendation === 'CUT' && <TrendingDown size={12} />}
                                    {item.recommendation === 'INCREASE' && <TrendingUp size={12} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
