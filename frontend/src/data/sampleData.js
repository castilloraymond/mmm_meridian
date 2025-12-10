/**
 * Sample Data - Pre-built datasets for demo purposes
 * Ported from backend/app/services/sample_data.py
 */

// Generate weekly actual vs predicted data based on model quality
function generateWeeklyData(weeks, rSquared) {
    const weeklyData = [];
    const base = 5.5; // Base revenue in millions

    // Use seeded random for consistency
    let seed = 42;
    const random = () => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return (seed / 0x7fffffff - 0.5) * 2;
    };

    for (let week = 1; week <= weeks; week++) {
        // Multiple seasonal components
        const seasonal = Math.sin(2 * Math.PI * week / 52) * 1.2 + Math.cos(4 * Math.PI * week / 52) * 0.4;
        const trend = week * 0.015;
        const noise = random() * 0.4;

        const actual = base + seasonal + trend + noise;
        // Predicted values are closer to actual with higher R²
        const predictionNoise = random() * 0.6 * (1 - rSquared);
        const predicted = actual + predictionNoise;

        weeklyData.push({
            week: `W${week}`,
            actual: Math.round(actual * 100) / 100,
            predicted: Math.round(predicted * 100) / 100
        });
    }

    return weeklyData;
}

// High quality MMM results - excellent model fit with 8 channels
const highQualitySample = {
    roi: {
        "Linear TV": 1.9, "Meta (FB/IG)": 3.8, "TikTok": 4.2, "Brand Search": 2.8,
        "YouTube": 3.1, "Programmatic Display": 1.4, "Podcasts": 3.6, "OOH (Outdoor)": 2.1
    },
    attribution: {
        "Linear TV": 22, "Meta (FB/IG)": 21, "TikTok": 12, "Brand Search": 9,
        "YouTube": 15, "Programmatic Display": 5, "Podcasts": 7, "OOH (Outdoor)": 6
    },
    model_fit: 0.94,
    predictions: [],
    channels: [
        { name: "Linear TV", spend: 12000000, mROAS: 0.58, contribution: 9200000, contribution_pct: 4.2, color: "#6366f1" },
        { name: "Meta (FB/IG)", spend: 8500000, mROAS: 1.45, contribution: 8900000, contribution_pct: 4.1, color: "#22c55e" },
        { name: "TikTok", spend: 3500000, mROAS: 1.82, contribution: 5100000, contribution_pct: 2.3, color: "#f43f5e" },
        { name: "Brand Search", spend: 5000000, mROAS: 0.92, contribution: 3800000, contribution_pct: 1.7, color: "#3b82f6" },
        { name: "YouTube", spend: 6500000, mROAS: 1.15, contribution: 6200000, contribution_pct: 2.8, color: "#ef4444" },
        { name: "Programmatic Display", spend: 4000000, mROAS: 0.38, contribution: 2100000, contribution_pct: 1.0, color: "#f59e0b" },
        { name: "Podcasts", spend: 2000000, mROAS: 1.65, contribution: 2800000, contribution_pct: 1.3, color: "#8b5cf6" },
        { name: "OOH (Outdoor)", spend: 3500000, mROAS: 0.72, contribution: 2400000, contribution_pct: 1.1, color: "#06b6d4" },
    ],
    kpis: {
        total_incremental_revenue: 40500000,
        revenue_delta_pct: 12.4,
        total_roas: 0.91,
        roas_delta_pct: 4.2,
        base_sales: 180000000,
        base_sales_delta_pct: 2.8,
        marginal_cpa: 38.50,
        marginal_cpa_delta_pct: -8.5
    },
    diagnostics: {
        r_squared: 0.94,
        mape: 4.2,
        durbin_watson: 1.98
    },
    model_parameters: [
        { channel: "Linear TV", adstock: 0.48, slope: 3.5 },
        { channel: "Meta (FB/IG)", adstock: 0.62, slope: 4.8 },
        { channel: "TikTok", adstock: 0.75, slope: 5.2 },
        { channel: "Brand Search", adstock: 0.35, slope: 2.8 },
        { channel: "YouTube", adstock: 0.58, slope: 4.1 },
        { channel: "Programmatic Display", adstock: 0.42, slope: 3.2 },
        { channel: "Podcasts", adstock: 0.68, slope: 4.5 },
        { channel: "OOH (Outdoor)", adstock: 0.52, slope: 3.8 },
    ],
    saturation_curves: [
        { channel: "Linear TV", color: "#6366f1", current_spend: 12000000, max_capacity: 22000000, half_saturation: 9000000, slope: 2.5 },
        { channel: "Meta (FB/IG)", color: "#22c55e", current_spend: 8500000, max_capacity: 18000000, half_saturation: 7000000, slope: 2.2 },
        { channel: "TikTok", color: "#f43f5e", current_spend: 3500000, max_capacity: 12000000, half_saturation: 4500000, slope: 1.8 },
        { channel: "Brand Search", color: "#3b82f6", current_spend: 5000000, max_capacity: 14000000, half_saturation: 5500000, slope: 2.0 },
        { channel: "YouTube", color: "#ef4444", current_spend: 6500000, max_capacity: 15000000, half_saturation: 6000000, slope: 2.3 },
        { channel: "Programmatic Display", color: "#f59e0b", current_spend: 4000000, max_capacity: 10000000, half_saturation: 4500000, slope: 1.9 },
        { channel: "Podcasts", color: "#8b5cf6", current_spend: 2000000, max_capacity: 8000000, half_saturation: 3000000, slope: 1.6 },
        { channel: "OOH (Outdoor)", color: "#06b6d4", current_spend: 3500000, max_capacity: 9000000, half_saturation: 4000000, slope: 2.1 },
    ],
    marginal_efficiency: [
        { channel: "Linear TV", mROAS: 0.58, current_spend: 12000000, recommendation: "CUT", color: "#6366f1" },
        { channel: "Meta (FB/IG)", mROAS: 1.45, current_spend: 8500000, recommendation: "INCREASE", color: "#22c55e" },
        { channel: "TikTok", mROAS: 1.82, current_spend: 3500000, recommendation: "INCREASE", color: "#f43f5e" },
        { channel: "Brand Search", mROAS: 0.92, current_spend: 5000000, recommendation: "MAINTAIN", color: "#3b82f6" },
        { channel: "YouTube", mROAS: 1.15, current_spend: 6500000, recommendation: "INCREASE", color: "#ef4444" },
        { channel: "Programmatic Display", mROAS: 0.38, current_spend: 4000000, recommendation: "CUT", color: "#f59e0b" },
        { channel: "Podcasts", mROAS: 1.65, current_spend: 2000000, recommendation: "INCREASE", color: "#8b5cf6" },
        { channel: "OOH (Outdoor)", mROAS: 0.72, current_spend: 3500000, recommendation: "MAINTAIN", color: "#06b6d4" },
    ],
    weekly_data: generateWeeklyData(52, 0.94),
    total_budget: 45000000,
    scenario_quality: "high"
};

// Mid quality MMM results - moderate model fit with 8 channels
const midQualitySample = {
    roi: {
        "Linear TV": 1.6, "Meta (FB/IG)": 2.8, "TikTok": 3.2, "Brand Search": 2.2,
        "YouTube": 2.4, "Programmatic Display": 1.1, "Podcasts": 2.9, "OOH (Outdoor)": 1.7
    },
    attribution: {
        "Linear TV": 23, "Meta (FB/IG)": 20, "TikTok": 13, "Brand Search": 10,
        "YouTube": 14, "Programmatic Display": 5, "Podcasts": 6, "OOH (Outdoor)": 6
    },
    model_fit: 0.78,
    predictions: [],
    channels: [
        { name: "Linear TV", spend: 10000000, mROAS: 0.42, contribution: 7100000, contribution_pct: 3.5, color: "#6366f1" },
        { name: "Meta (FB/IG)", spend: 7000000, mROAS: 1.05, contribution: 6200000, contribution_pct: 3.1, color: "#22c55e" },
        { name: "TikTok", spend: 4000000, mROAS: 1.28, contribution: 4100000, contribution_pct: 2.0, color: "#f43f5e" },
        { name: "Brand Search", spend: 4500000, mROAS: 0.68, contribution: 2900000, contribution_pct: 1.4, color: "#3b82f6" },
        { name: "YouTube", spend: 5500000, mROAS: 0.85, contribution: 4500000, contribution_pct: 2.2, color: "#ef4444" },
        { name: "Programmatic Display", spend: 3500000, mROAS: 0.25, contribution: 1400000, contribution_pct: 0.7, color: "#f59e0b" },
        { name: "Podcasts", spend: 1800000, mROAS: 1.12, contribution: 1900000, contribution_pct: 0.9, color: "#8b5cf6" },
        { name: "OOH (Outdoor)", spend: 3000000, mROAS: 0.55, contribution: 1800000, contribution_pct: 0.9, color: "#06b6d4" },
    ],
    kpis: {
        total_incremental_revenue: 29900000,
        revenue_delta_pct: 5.8,
        total_roas: 0.76,
        roas_delta_pct: -3.2,
        base_sales: 168000000,
        base_sales_delta_pct: 0.8,
        marginal_cpa: 52.80,
        marginal_cpa_delta_pct: 4.5
    },
    diagnostics: {
        r_squared: 0.78,
        mape: 12.5,
        durbin_watson: 1.62
    },
    model_parameters: [
        { channel: "Linear TV", adstock: 0.42, slope: 2.8 },
        { channel: "Meta (FB/IG)", adstock: 0.55, slope: 3.5 },
        { channel: "TikTok", adstock: 0.68, slope: 4.2 },
        { channel: "Brand Search", adstock: 0.38, slope: 2.4 },
        { channel: "YouTube", adstock: 0.48, slope: 3.2 },
        { channel: "Programmatic Display", adstock: 0.35, slope: 2.6 },
        { channel: "Podcasts", adstock: 0.58, slope: 3.8 },
        { channel: "OOH (Outdoor)", adstock: 0.45, slope: 3.0 },
    ],
    saturation_curves: [
        { channel: "Linear TV", color: "#6366f1", current_spend: 10000000, max_capacity: 18000000, half_saturation: 7500000, slope: 2.2 },
        { channel: "Meta (FB/IG)", color: "#22c55e", current_spend: 7000000, max_capacity: 14000000, half_saturation: 5500000, slope: 2.0 },
        { channel: "TikTok", color: "#f43f5e", current_spend: 4000000, max_capacity: 10000000, half_saturation: 3800000, slope: 1.6 },
        { channel: "Brand Search", color: "#3b82f6", current_spend: 4500000, max_capacity: 11000000, half_saturation: 4800000, slope: 1.8 },
        { channel: "YouTube", color: "#ef4444", current_spend: 5500000, max_capacity: 12000000, half_saturation: 5000000, slope: 2.1 },
        { channel: "Programmatic Display", color: "#f59e0b", current_spend: 3500000, max_capacity: 8000000, half_saturation: 3800000, slope: 1.7 },
        { channel: "Podcasts", color: "#8b5cf6", current_spend: 1800000, max_capacity: 6000000, half_saturation: 2500000, slope: 1.5 },
        { channel: "OOH (Outdoor)", color: "#06b6d4", current_spend: 3000000, max_capacity: 7500000, half_saturation: 3500000, slope: 1.9 },
    ],
    marginal_efficiency: [
        { channel: "Linear TV", mROAS: 0.42, current_spend: 10000000, recommendation: "CUT", color: "#6366f1" },
        { channel: "Meta (FB/IG)", mROAS: 1.05, current_spend: 7000000, recommendation: "INCREASE", color: "#22c55e" },
        { channel: "TikTok", mROAS: 1.28, current_spend: 4000000, recommendation: "INCREASE", color: "#f43f5e" },
        { channel: "Brand Search", mROAS: 0.68, current_spend: 4500000, recommendation: "MAINTAIN", color: "#3b82f6" },
        { channel: "YouTube", mROAS: 0.85, current_spend: 5500000, recommendation: "MAINTAIN", color: "#ef4444" },
        { channel: "Programmatic Display", mROAS: 0.25, current_spend: 3500000, recommendation: "CUT", color: "#f59e0b" },
        { channel: "Podcasts", mROAS: 1.12, current_spend: 1800000, recommendation: "INCREASE", color: "#8b5cf6" },
        { channel: "OOH (Outdoor)", mROAS: 0.55, current_spend: 3000000, recommendation: "CUT", color: "#06b6d4" },
    ],
    weekly_data: generateWeeklyData(52, 0.78),
    total_budget: 39300000,
    scenario_quality: "mid"
};

// Low quality MMM results - poor model fit, needs improvement with 8 channels
const lowQualitySample = {
    roi: {
        "Linear TV": 1.1, "Meta (FB/IG)": 1.8, "TikTok": 2.0, "Brand Search": 1.5,
        "YouTube": 1.6, "Programmatic Display": 0.8, "Podcasts": 1.9, "OOH (Outdoor)": 1.2
    },
    attribution: {
        "Linear TV": 24, "Meta (FB/IG)": 21, "TikTok": 16, "Brand Search": 10,
        "YouTube": 12, "Programmatic Display": 5, "Podcasts": 6, "OOH (Outdoor)": 5
    },
    model_fit: 0.52,
    predictions: [],
    channels: [
        { name: "Linear TV", spend: 8000000, mROAS: 0.22, contribution: 4200000, contribution_pct: 2.5, color: "#6366f1" },
        { name: "Meta (FB/IG)", spend: 5500000, mROAS: 0.58, contribution: 3800000, contribution_pct: 2.3, color: "#22c55e" },
        { name: "TikTok", spend: 4500000, mROAS: 0.75, contribution: 2900000, contribution_pct: 1.7, color: "#f43f5e" },
        { name: "Brand Search", spend: 3500000, mROAS: 0.42, contribution: 1800000, contribution_pct: 1.1, color: "#3b82f6" },
        { name: "YouTube", spend: 4000000, mROAS: 0.48, contribution: 2200000, contribution_pct: 1.3, color: "#ef4444" },
        { name: "Programmatic Display", spend: 3000000, mROAS: 0.15, contribution: 800000, contribution_pct: 0.5, color: "#f59e0b" },
        { name: "Podcasts", spend: 1500000, mROAS: 0.62, contribution: 1100000, contribution_pct: 0.7, color: "#8b5cf6" },
        { name: "OOH (Outdoor)", spend: 2500000, mROAS: 0.28, contribution: 900000, contribution_pct: 0.5, color: "#06b6d4" },
    ],
    kpis: {
        total_incremental_revenue: 17700000,
        revenue_delta_pct: -4.2,
        total_roas: 0.55,
        roas_delta_pct: -15.8,
        base_sales: 148000000,
        base_sales_delta_pct: -2.5,
        marginal_cpa: 82.40,
        marginal_cpa_delta_pct: 18.2
    },
    diagnostics: {
        r_squared: 0.52,
        mape: 28.3,
        durbin_watson: 1.24
    },
    model_parameters: [
        { channel: "Linear TV", adstock: 0.32, slope: 1.8 },
        { channel: "Meta (FB/IG)", adstock: 0.45, slope: 2.5 },
        { channel: "TikTok", adstock: 0.58, slope: 3.2 },
        { channel: "Brand Search", adstock: 0.28, slope: 1.6 },
        { channel: "YouTube", adstock: 0.38, slope: 2.2 },
        { channel: "Programmatic Display", adstock: 0.25, slope: 1.8 },
        { channel: "Podcasts", adstock: 0.48, slope: 2.8 },
        { channel: "OOH (Outdoor)", adstock: 0.35, slope: 2.0 },
    ],
    saturation_curves: [
        { channel: "Linear TV", color: "#6366f1", current_spend: 8000000, max_capacity: 14000000, half_saturation: 6000000, slope: 1.8 },
        { channel: "Meta (FB/IG)", color: "#22c55e", current_spend: 5500000, max_capacity: 11000000, half_saturation: 4500000, slope: 1.6 },
        { channel: "TikTok", color: "#f43f5e", current_spend: 4500000, max_capacity: 8000000, half_saturation: 3200000, slope: 1.4 },
        { channel: "Brand Search", color: "#3b82f6", current_spend: 3500000, max_capacity: 8000000, half_saturation: 3800000, slope: 1.5 },
        { channel: "YouTube", color: "#ef4444", current_spend: 4000000, max_capacity: 9000000, half_saturation: 4200000, slope: 1.7 },
        { channel: "Programmatic Display", color: "#f59e0b", current_spend: 3000000, max_capacity: 6000000, half_saturation: 3000000, slope: 1.4 },
        { channel: "Podcasts", color: "#8b5cf6", current_spend: 1500000, max_capacity: 5000000, half_saturation: 2000000, slope: 1.3 },
        { channel: "OOH (Outdoor)", color: "#06b6d4", current_spend: 2500000, max_capacity: 6000000, half_saturation: 2800000, slope: 1.5 },
    ],
    marginal_efficiency: [
        { channel: "Linear TV", mROAS: 0.22, current_spend: 8000000, recommendation: "CUT", color: "#6366f1" },
        { channel: "Meta (FB/IG)", mROAS: 0.58, current_spend: 5500000, recommendation: "MAINTAIN", color: "#22c55e" },
        { channel: "TikTok", mROAS: 0.75, current_spend: 4500000, recommendation: "MAINTAIN", color: "#f43f5e" },
        { channel: "Brand Search", mROAS: 0.42, current_spend: 3500000, recommendation: "CUT", color: "#3b82f6" },
        { channel: "YouTube", mROAS: 0.48, current_spend: 4000000, recommendation: "CUT", color: "#ef4444" },
        { channel: "Programmatic Display", mROAS: 0.15, current_spend: 3000000, recommendation: "CUT", color: "#f59e0b" },
        { channel: "Podcasts", mROAS: 0.62, current_spend: 1500000, recommendation: "MAINTAIN", color: "#8b5cf6" },
        { channel: "OOH (Outdoor)", mROAS: 0.28, current_spend: 2500000, recommendation: "CUT", color: "#06b6d4" },
    ],
    weekly_data: generateWeeklyData(52, 0.52),
    total_budget: 32500000,
    scenario_quality: "low"
};

/**
 * Get sample data for the specified scenario
 * @param {string} scenario - One of "high", "mid", or "low"
 * @returns {Object} The sample data for the scenario
 */
export function getSampleData(scenario) {
    const scenarios = {
        high: highQualitySample,
        mid: midQualitySample,
        low: lowQualitySample,
    };

    if (!scenarios[scenario]) {
        throw new Error(`Invalid scenario: ${scenario}. Must be one of: ${Object.keys(scenarios).join(', ')}`);
    }

    return scenarios[scenario];
}

export { highQualitySample, midQualitySample, lowQualitySample };
