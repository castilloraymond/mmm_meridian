import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const WITTY_STATEMENTS = [
    "Analyzing your brilliant media plan...",
    "Crunching the numbers with statistical magic...",
    "Teaching the model about your channels...",
    "Optimizing budget allocations...",
    "Calculating marginal returns...",
    "Discovering hidden ROI opportunities...",
    "Mapping saturation curves...",
    "Measuring channel synergies...",
    "Applying Bayesian inference...",
    "Running Monte Carlo simulations...",
    "Estimating adstock decay rates...",
    "Finding your marketing sweet spots...",
    "Separating signal from noise...",
    "Building your custom attribution model...",
    "Validating model fit metrics...",
    "Generating actionable insights...",
    "Polishing the final recommendations...",
    "Almost there... preparing your dashboard...",
];

export default function LoadingScreen({ scenario = 'high' }) {
    const [progress, setProgress] = useState(0);
    const [statementIndex, setStatementIndex] = useState(0);

    // Scenario display names
    const scenarioNames = {
        high: 'High Quality',
        mid: 'Mid Quality',
        low: 'Low Quality'
    };

    // Simulate progress
    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Variable speed - faster at start and end, slower in middle
                const increment = prev < 20 ? 4 : prev < 70 ? 2 : prev < 90 ? 3 : 5;
                return Math.min(prev + increment, 100);
            });
        }, 80);

        return () => clearInterval(progressInterval);
    }, []);

    // Rotate through witty statements
    useEffect(() => {
        const statementInterval = setInterval(() => {
            setStatementIndex(prev => (prev + 1) % WITTY_STATEMENTS.length);
        }, 1800);

        return () => clearInterval(statementInterval);
    }, []);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center z-50">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-xl w-full mx-6 text-center">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <span className="text-white font-bold text-xl">M</span>
                    </div>
                    <span className="text-2xl font-semibold text-white">Meridian MMM</span>
                </div>

                {/* Scenario badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-8 border border-white/10">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-white/80">Loading <span className="text-white font-medium">{scenarioNames[scenario]}</span> Scenario</span>
                </div>

                {/* Progress percentage */}
                <div className="mb-6">
                    <span className="text-7xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                        {progress}%
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-8 backdrop-blur-sm">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-200 ease-out relative"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                    </div>
                </div>

                {/* Witty statement */}
                <div className="h-8">
                    <p
                        key={statementIndex}
                        className="text-white/70 text-lg animate-fadeIn"
                    >
                        {WITTY_STATEMENTS[statementIndex]}
                    </p>
                </div>

                {/* Animated dots */}
                <div className="flex items-center justify-center gap-1.5 mt-6">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-indigo-400/60 animate-bounce"
                            style={{ animationDelay: `${i * 150}ms` }}
                        />
                    ))}
                </div>
            </div>

            {/* Custom styles for animations */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
