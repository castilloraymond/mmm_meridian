"""
Sample Data Service - Provides pre-built sample datasets for demo purposes
"""
import numpy as np
from app.models.schemas import (
    MMMResult, ChannelMetrics, KPIs, ModelDiagnostics,
    ModelParameters, SaturationCurve, MarginalEfficiency
)

# Extended channel configurations with 8 channels
CHANNELS = [
    {"name": "Linear TV", "color": "#6366f1"},          # Indigo
    {"name": "Meta (FB/IG)", "color": "#22c55e"},       # Green
    {"name": "TikTok", "color": "#f43f5e"},             # Rose
    {"name": "Brand Search", "color": "#3b82f6"},       # Blue
    {"name": "YouTube", "color": "#ef4444"},            # Red
    {"name": "Programmatic Display", "color": "#f59e0b"},  # Amber
    {"name": "Podcasts", "color": "#8b5cf6"},           # Purple
    {"name": "OOH (Outdoor)", "color": "#06b6d4"},      # Cyan
]

def generate_weekly_data(weeks: int, r_squared: float) -> list:
    """Generate weekly actual vs predicted data based on model quality."""
    np.random.seed(42)
    base = 5.5  # Base revenue in millions
    weekly_data = []
    
    # Create a seasonal pattern with more variance
    for week in range(1, weeks + 1):
        # Multiple seasonal components
        seasonal = np.sin(2 * np.pi * week / 52) * 1.2 + np.cos(4 * np.pi * week / 52) * 0.4
        trend = week * 0.015
        noise = np.random.normal(0, 0.4)
        
        actual = base + seasonal + trend + noise
        # Predicted values are closer to actual with higher R²
        prediction_noise = np.random.normal(0, 0.6 * (1 - r_squared))
        predicted = actual + prediction_noise
        
        weekly_data.append({
            "week": f"W{week}",
            "actual": round(actual, 2),
            "predicted": round(predicted, 2)
        })
    
    return weekly_data


def get_high_quality_sample() -> MMMResult:
    """High quality MMM results - excellent model fit with 8 channels."""
    channels = [
        ChannelMetrics(
            name="Linear TV", spend=12000000, mROAS=0.58,
            contribution=9200000, contribution_pct=4.2, color="#6366f1"
        ),
        ChannelMetrics(
            name="Meta (FB/IG)", spend=8500000, mROAS=1.45,
            contribution=8900000, contribution_pct=4.1, color="#22c55e"
        ),
        ChannelMetrics(
            name="TikTok", spend=3500000, mROAS=1.82,
            contribution=5100000, contribution_pct=2.3, color="#f43f5e"
        ),
        ChannelMetrics(
            name="Brand Search", spend=5000000, mROAS=0.92,
            contribution=3800000, contribution_pct=1.7, color="#3b82f6"
        ),
        ChannelMetrics(
            name="YouTube", spend=6500000, mROAS=1.15,
            contribution=6200000, contribution_pct=2.8, color="#ef4444"
        ),
        ChannelMetrics(
            name="Programmatic Display", spend=4000000, mROAS=0.38,
            contribution=2100000, contribution_pct=1.0, color="#f59e0b"
        ),
        ChannelMetrics(
            name="Podcasts", spend=2000000, mROAS=1.65,
            contribution=2800000, contribution_pct=1.3, color="#8b5cf6"
        ),
        ChannelMetrics(
            name="OOH (Outdoor)", spend=3500000, mROAS=0.72,
            contribution=2400000, contribution_pct=1.1, color="#06b6d4"
        ),
    ]
    
    return MMMResult(
        roi={
            "Linear TV": 1.9, "Meta (FB/IG)": 3.8, "TikTok": 4.2, "Brand Search": 2.8,
            "YouTube": 3.1, "Programmatic Display": 1.4, "Podcasts": 3.6, "OOH (Outdoor)": 2.1
        },
        attribution={
            "Linear TV": 22, "Meta (FB/IG)": 21, "TikTok": 12, "Brand Search": 9,
            "YouTube": 15, "Programmatic Display": 5, "Podcasts": 7, "OOH (Outdoor)": 6
        },
        model_fit=0.94,
        predictions=[],  # Legacy field
        channels=channels,
        kpis=KPIs(
            total_incremental_revenue=40500000,
            revenue_delta_pct=12.4,
            total_roas=0.91,
            roas_delta_pct=4.2,
            base_sales=180000000,
            base_sales_delta_pct=2.8,
            marginal_cpa=38.50,
            marginal_cpa_delta_pct=-8.5
        ),
        diagnostics=ModelDiagnostics(
            r_squared=0.94,
            mape=4.2,
            durbin_watson=1.98
        ),
        model_parameters=[
            ModelParameters(channel="Linear TV", adstock=0.48, slope=3.5),
            ModelParameters(channel="Meta (FB/IG)", adstock=0.62, slope=4.8),
            ModelParameters(channel="TikTok", adstock=0.75, slope=5.2),
            ModelParameters(channel="Brand Search", adstock=0.35, slope=2.8),
            ModelParameters(channel="YouTube", adstock=0.58, slope=4.1),
            ModelParameters(channel="Programmatic Display", adstock=0.42, slope=3.2),
            ModelParameters(channel="Podcasts", adstock=0.68, slope=4.5),
            ModelParameters(channel="OOH (Outdoor)", adstock=0.52, slope=3.8),
        ],
        saturation_curves=[
            SaturationCurve(
                channel="Linear TV", color="#6366f1",
                current_spend=12000000, max_capacity=22000000,
                half_saturation=9000000, slope=2.5
            ),
            SaturationCurve(
                channel="Meta (FB/IG)", color="#22c55e",
                current_spend=8500000, max_capacity=18000000,
                half_saturation=7000000, slope=2.2
            ),
            SaturationCurve(
                channel="TikTok", color="#f43f5e",
                current_spend=3500000, max_capacity=12000000,
                half_saturation=4500000, slope=1.8
            ),
            SaturationCurve(
                channel="Brand Search", color="#3b82f6",
                current_spend=5000000, max_capacity=14000000,
                half_saturation=5500000, slope=2.0
            ),
            SaturationCurve(
                channel="YouTube", color="#ef4444",
                current_spend=6500000, max_capacity=15000000,
                half_saturation=6000000, slope=2.3
            ),
            SaturationCurve(
                channel="Programmatic Display", color="#f59e0b",
                current_spend=4000000, max_capacity=10000000,
                half_saturation=4500000, slope=1.9
            ),
            SaturationCurve(
                channel="Podcasts", color="#8b5cf6",
                current_spend=2000000, max_capacity=8000000,
                half_saturation=3000000, slope=1.6
            ),
            SaturationCurve(
                channel="OOH (Outdoor)", color="#06b6d4",
                current_spend=3500000, max_capacity=9000000,
                half_saturation=4000000, slope=2.1
            ),
        ],
        marginal_efficiency=[
            MarginalEfficiency(
                channel="Linear TV", mROAS=0.58, current_spend=12000000,
                recommendation="CUT", color="#6366f1"
            ),
            MarginalEfficiency(
                channel="Meta (FB/IG)", mROAS=1.45, current_spend=8500000,
                recommendation="INCREASE", color="#22c55e"
            ),
            MarginalEfficiency(
                channel="TikTok", mROAS=1.82, current_spend=3500000,
                recommendation="INCREASE", color="#f43f5e"
            ),
            MarginalEfficiency(
                channel="Brand Search", mROAS=0.92, current_spend=5000000,
                recommendation="MAINTAIN", color="#3b82f6"
            ),
            MarginalEfficiency(
                channel="YouTube", mROAS=1.15, current_spend=6500000,
                recommendation="INCREASE", color="#ef4444"
            ),
            MarginalEfficiency(
                channel="Programmatic Display", mROAS=0.38, current_spend=4000000,
                recommendation="CUT", color="#f59e0b"
            ),
            MarginalEfficiency(
                channel="Podcasts", mROAS=1.65, current_spend=2000000,
                recommendation="INCREASE", color="#8b5cf6"
            ),
            MarginalEfficiency(
                channel="OOH (Outdoor)", mROAS=0.72, current_spend=3500000,
                recommendation="MAINTAIN", color="#06b6d4"
            ),
        ],
        weekly_data=generate_weekly_data(52, 0.94),
        total_budget=45000000,
        scenario_quality="high"
    )


def get_mid_quality_sample() -> MMMResult:
    """Mid quality MMM results - moderate model fit with 8 channels."""
    channels = [
        ChannelMetrics(
            name="Linear TV", spend=10000000, mROAS=0.42,
            contribution=7100000, contribution_pct=3.5, color="#6366f1"
        ),
        ChannelMetrics(
            name="Meta (FB/IG)", spend=7000000, mROAS=1.05,
            contribution=6200000, contribution_pct=3.1, color="#22c55e"
        ),
        ChannelMetrics(
            name="TikTok", spend=4000000, mROAS=1.28,
            contribution=4100000, contribution_pct=2.0, color="#f43f5e"
        ),
        ChannelMetrics(
            name="Brand Search", spend=4500000, mROAS=0.68,
            contribution=2900000, contribution_pct=1.4, color="#3b82f6"
        ),
        ChannelMetrics(
            name="YouTube", spend=5500000, mROAS=0.85,
            contribution=4500000, contribution_pct=2.2, color="#ef4444"
        ),
        ChannelMetrics(
            name="Programmatic Display", spend=3500000, mROAS=0.25,
            contribution=1400000, contribution_pct=0.7, color="#f59e0b"
        ),
        ChannelMetrics(
            name="Podcasts", spend=1800000, mROAS=1.12,
            contribution=1900000, contribution_pct=0.9, color="#8b5cf6"
        ),
        ChannelMetrics(
            name="OOH (Outdoor)", spend=3000000, mROAS=0.55,
            contribution=1800000, contribution_pct=0.9, color="#06b6d4"
        ),
    ]
    
    return MMMResult(
        roi={
            "Linear TV": 1.6, "Meta (FB/IG)": 2.8, "TikTok": 3.2, "Brand Search": 2.2,
            "YouTube": 2.4, "Programmatic Display": 1.1, "Podcasts": 2.9, "OOH (Outdoor)": 1.7
        },
        attribution={
            "Linear TV": 23, "Meta (FB/IG)": 20, "TikTok": 13, "Brand Search": 10,
            "YouTube": 14, "Programmatic Display": 5, "Podcasts": 6, "OOH (Outdoor)": 6
        },
        model_fit=0.78,
        predictions=[],
        channels=channels,
        kpis=KPIs(
            total_incremental_revenue=29900000,
            revenue_delta_pct=5.8,
            total_roas=0.76,
            roas_delta_pct=-3.2,
            base_sales=168000000,
            base_sales_delta_pct=0.8,
            marginal_cpa=52.80,
            marginal_cpa_delta_pct=4.5
        ),
        diagnostics=ModelDiagnostics(
            r_squared=0.78,
            mape=12.5,
            durbin_watson=1.62
        ),
        model_parameters=[
            ModelParameters(channel="Linear TV", adstock=0.42, slope=2.8),
            ModelParameters(channel="Meta (FB/IG)", adstock=0.55, slope=3.5),
            ModelParameters(channel="TikTok", adstock=0.68, slope=4.2),
            ModelParameters(channel="Brand Search", adstock=0.38, slope=2.4),
            ModelParameters(channel="YouTube", adstock=0.48, slope=3.2),
            ModelParameters(channel="Programmatic Display", adstock=0.35, slope=2.6),
            ModelParameters(channel="Podcasts", adstock=0.58, slope=3.8),
            ModelParameters(channel="OOH (Outdoor)", adstock=0.45, slope=3.0),
        ],
        saturation_curves=[
            SaturationCurve(
                channel="Linear TV", color="#6366f1",
                current_spend=10000000, max_capacity=18000000,
                half_saturation=7500000, slope=2.2
            ),
            SaturationCurve(
                channel="Meta (FB/IG)", color="#22c55e",
                current_spend=7000000, max_capacity=14000000,
                half_saturation=5500000, slope=2.0
            ),
            SaturationCurve(
                channel="TikTok", color="#f43f5e",
                current_spend=4000000, max_capacity=10000000,
                half_saturation=3800000, slope=1.6
            ),
            SaturationCurve(
                channel="Brand Search", color="#3b82f6",
                current_spend=4500000, max_capacity=11000000,
                half_saturation=4800000, slope=1.8
            ),
            SaturationCurve(
                channel="YouTube", color="#ef4444",
                current_spend=5500000, max_capacity=12000000,
                half_saturation=5000000, slope=2.1
            ),
            SaturationCurve(
                channel="Programmatic Display", color="#f59e0b",
                current_spend=3500000, max_capacity=8000000,
                half_saturation=3800000, slope=1.7
            ),
            SaturationCurve(
                channel="Podcasts", color="#8b5cf6",
                current_spend=1800000, max_capacity=6000000,
                half_saturation=2500000, slope=1.5
            ),
            SaturationCurve(
                channel="OOH (Outdoor)", color="#06b6d4",
                current_spend=3000000, max_capacity=7500000,
                half_saturation=3500000, slope=1.9
            ),
        ],
        marginal_efficiency=[
            MarginalEfficiency(
                channel="Linear TV", mROAS=0.42, current_spend=10000000,
                recommendation="CUT", color="#6366f1"
            ),
            MarginalEfficiency(
                channel="Meta (FB/IG)", mROAS=1.05, current_spend=7000000,
                recommendation="INCREASE", color="#22c55e"
            ),
            MarginalEfficiency(
                channel="TikTok", mROAS=1.28, current_spend=4000000,
                recommendation="INCREASE", color="#f43f5e"
            ),
            MarginalEfficiency(
                channel="Brand Search", mROAS=0.68, current_spend=4500000,
                recommendation="MAINTAIN", color="#3b82f6"
            ),
            MarginalEfficiency(
                channel="YouTube", mROAS=0.85, current_spend=5500000,
                recommendation="MAINTAIN", color="#ef4444"
            ),
            MarginalEfficiency(
                channel="Programmatic Display", mROAS=0.25, current_spend=3500000,
                recommendation="CUT", color="#f59e0b"
            ),
            MarginalEfficiency(
                channel="Podcasts", mROAS=1.12, current_spend=1800000,
                recommendation="INCREASE", color="#8b5cf6"
            ),
            MarginalEfficiency(
                channel="OOH (Outdoor)", mROAS=0.55, current_spend=3000000,
                recommendation="CUT", color="#06b6d4"
            ),
        ],
        weekly_data=generate_weekly_data(52, 0.78),
        total_budget=39300000,
        scenario_quality="mid"
    )


def get_low_quality_sample() -> MMMResult:
    """Low quality MMM results - poor model fit, needs improvement with 8 channels."""
    channels = [
        ChannelMetrics(
            name="Linear TV", spend=8000000, mROAS=0.22,
            contribution=4200000, contribution_pct=2.5, color="#6366f1"
        ),
        ChannelMetrics(
            name="Meta (FB/IG)", spend=5500000, mROAS=0.58,
            contribution=3800000, contribution_pct=2.3, color="#22c55e"
        ),
        ChannelMetrics(
            name="TikTok", spend=4500000, mROAS=0.75,
            contribution=2900000, contribution_pct=1.7, color="#f43f5e"
        ),
        ChannelMetrics(
            name="Brand Search", spend=3500000, mROAS=0.42,
            contribution=1800000, contribution_pct=1.1, color="#3b82f6"
        ),
        ChannelMetrics(
            name="YouTube", spend=4000000, mROAS=0.48,
            contribution=2200000, contribution_pct=1.3, color="#ef4444"
        ),
        ChannelMetrics(
            name="Programmatic Display", spend=3000000, mROAS=0.15,
            contribution=800000, contribution_pct=0.5, color="#f59e0b"
        ),
        ChannelMetrics(
            name="Podcasts", spend=1500000, mROAS=0.62,
            contribution=1100000, contribution_pct=0.7, color="#8b5cf6"
        ),
        ChannelMetrics(
            name="OOH (Outdoor)", spend=2500000, mROAS=0.28,
            contribution=900000, contribution_pct=0.5, color="#06b6d4"
        ),
    ]
    
    return MMMResult(
        roi={
            "Linear TV": 1.1, "Meta (FB/IG)": 1.8, "TikTok": 2.0, "Brand Search": 1.5,
            "YouTube": 1.6, "Programmatic Display": 0.8, "Podcasts": 1.9, "OOH (Outdoor)": 1.2
        },
        attribution={
            "Linear TV": 24, "Meta (FB/IG)": 21, "TikTok": 16, "Brand Search": 10,
            "YouTube": 12, "Programmatic Display": 5, "Podcasts": 6, "OOH (Outdoor)": 5
        },
        model_fit=0.52,
        predictions=[],
        channels=channels,
        kpis=KPIs(
            total_incremental_revenue=17700000,
            revenue_delta_pct=-4.2,
            total_roas=0.55,
            roas_delta_pct=-15.8,
            base_sales=148000000,
            base_sales_delta_pct=-2.5,
            marginal_cpa=82.40,
            marginal_cpa_delta_pct=18.2
        ),
        diagnostics=ModelDiagnostics(
            r_squared=0.52,
            mape=28.3,
            durbin_watson=1.24
        ),
        model_parameters=[
            ModelParameters(channel="Linear TV", adstock=0.32, slope=1.8),
            ModelParameters(channel="Meta (FB/IG)", adstock=0.45, slope=2.5),
            ModelParameters(channel="TikTok", adstock=0.58, slope=3.2),
            ModelParameters(channel="Brand Search", adstock=0.28, slope=1.6),
            ModelParameters(channel="YouTube", adstock=0.38, slope=2.2),
            ModelParameters(channel="Programmatic Display", adstock=0.25, slope=1.8),
            ModelParameters(channel="Podcasts", adstock=0.48, slope=2.8),
            ModelParameters(channel="OOH (Outdoor)", adstock=0.35, slope=2.0),
        ],
        saturation_curves=[
            SaturationCurve(
                channel="Linear TV", color="#6366f1",
                current_spend=8000000, max_capacity=14000000,
                half_saturation=6000000, slope=1.8
            ),
            SaturationCurve(
                channel="Meta (FB/IG)", color="#22c55e",
                current_spend=5500000, max_capacity=11000000,
                half_saturation=4500000, slope=1.6
            ),
            SaturationCurve(
                channel="TikTok", color="#f43f5e",
                current_spend=4500000, max_capacity=8000000,
                half_saturation=3200000, slope=1.4
            ),
            SaturationCurve(
                channel="Brand Search", color="#3b82f6",
                current_spend=3500000, max_capacity=8000000,
                half_saturation=3800000, slope=1.5
            ),
            SaturationCurve(
                channel="YouTube", color="#ef4444",
                current_spend=4000000, max_capacity=9000000,
                half_saturation=4200000, slope=1.7
            ),
            SaturationCurve(
                channel="Programmatic Display", color="#f59e0b",
                current_spend=3000000, max_capacity=6000000,
                half_saturation=3000000, slope=1.4
            ),
            SaturationCurve(
                channel="Podcasts", color="#8b5cf6",
                current_spend=1500000, max_capacity=5000000,
                half_saturation=2000000, slope=1.3
            ),
            SaturationCurve(
                channel="OOH (Outdoor)", color="#06b6d4",
                current_spend=2500000, max_capacity=6000000,
                half_saturation=2800000, slope=1.5
            ),
        ],
        marginal_efficiency=[
            MarginalEfficiency(
                channel="Linear TV", mROAS=0.22, current_spend=8000000,
                recommendation="CUT", color="#6366f1"
            ),
            MarginalEfficiency(
                channel="Meta (FB/IG)", mROAS=0.58, current_spend=5500000,
                recommendation="MAINTAIN", color="#22c55e"
            ),
            MarginalEfficiency(
                channel="TikTok", mROAS=0.75, current_spend=4500000,
                recommendation="MAINTAIN", color="#f43f5e"
            ),
            MarginalEfficiency(
                channel="Brand Search", mROAS=0.42, current_spend=3500000,
                recommendation="CUT", color="#3b82f6"
            ),
            MarginalEfficiency(
                channel="YouTube", mROAS=0.48, current_spend=4000000,
                recommendation="CUT", color="#ef4444"
            ),
            MarginalEfficiency(
                channel="Programmatic Display", mROAS=0.15, current_spend=3000000,
                recommendation="CUT", color="#f59e0b"
            ),
            MarginalEfficiency(
                channel="Podcasts", mROAS=0.62, current_spend=1500000,
                recommendation="MAINTAIN", color="#8b5cf6"
            ),
            MarginalEfficiency(
                channel="OOH (Outdoor)", mROAS=0.28, current_spend=2500000,
                recommendation="CUT", color="#06b6d4"
            ),
        ],
        weekly_data=generate_weekly_data(52, 0.52),
        total_budget=32500000,
        scenario_quality="low"
    )


def get_sample_data(scenario: str) -> MMMResult:
    """Get sample data for the specified scenario."""
    scenarios = {
        "high": get_high_quality_sample,
        "mid": get_mid_quality_sample,
        "low": get_low_quality_sample,
    }
    
    if scenario not in scenarios:
        raise ValueError(f"Invalid scenario: {scenario}. Must be one of: {list(scenarios.keys())}")
    
    return scenarios[scenario]()
