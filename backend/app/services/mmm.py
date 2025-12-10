import pandas as pd
import numpy as np
from app.models.schemas import (
    MMMResult, ChannelMetrics, KPIs, ModelDiagnostics,
    ModelParameters, SaturationCurve, MarginalEfficiency
)

class MMMService:
    def process_data(self, file_path: str) -> MMMResult:
        """
        Process uploaded CSV and return MMM results.
        In a real scenario, this would run Meridian MMM.
        For demo, returns mock data based on file analysis.
        """
        import time
        time.sleep(1)  # Simulate processing
        
        # Generate mock results similar to high-quality sample
        channels = [
            ChannelMetrics(
                name="Linear TV", spend=8000000, mROAS=0.62,
                contribution=6700000, contribution_pct=4.0, color="#6366f1"
            ),
            ChannelMetrics(
                name="Meta (FB/IG)", spend=6000000, mROAS=0.85,
                contribution=6400000, contribution_pct=3.8, color="#22c55e"
            ),
            ChannelMetrics(
                name="TikTok", spend=2000000, mROAS=0.24,
                contribution=4200000, contribution_pct=2.5, color="#f43f5e"
            ),
            ChannelMetrics(
                name="Brand Search", spend=4000000, mROAS=0.69,
                contribution=268000, contribution_pct=0.2, color="#3b82f6"
            ),
        ]
        
        # Generate 52 weeks of data
        np.random.seed(42)
        weekly_data = []
        base = 5.5
        for week in range(1, 53):
            seasonal = np.sin(2 * np.pi * week / 52) * 0.8
            trend = week * 0.01
            noise = np.random.normal(0, 0.3)
            actual = base + seasonal + trend + noise
            predicted = actual + np.random.normal(0, 0.15)
            weekly_data.append({
                "week": f"W{week}",
                "actual": round(actual, 2),
                "predicted": round(predicted, 2)
            })
        
        return MMMResult(
            roi={"Linear TV": 2.1, "Meta (FB/IG)": 3.2, "TikTok": 1.8, "Brand Search": 2.5},
            attribution={"Linear TV": 30, "Meta (FB/IG)": 35, "TikTok": 15, "Brand Search": 20},
            model_fit=0.94,
            predictions=[],
            channels=channels,
            kpis=KPIs(
                total_incremental_revenue=17500000,
                revenue_delta_pct=8.4,
                total_roas=0.88,
                roas_delta_pct=-2.1,
                base_sales=150000000,
                base_sales_delta_pct=1.2,
                marginal_cpa=42.50,
                marginal_cpa_delta_pct=-5.0
            ),
            diagnostics=ModelDiagnostics(
                r_squared=0.94,
                mape=4.2,
                durbin_watson=1.98
            ),
            model_parameters=[
                ModelParameters(channel="Linear TV", adstock=0.48, slope=3.5),
                ModelParameters(channel="Meta (FB/IG)", adstock=0.60, slope=4.2),
                ModelParameters(channel="TikTok", adstock=0.72, slope=5.1),
                ModelParameters(channel="Brand Search", adstock=0.35, slope=2.8),
            ],
            saturation_curves=[
                SaturationCurve(
                    channel="Linear TV", color="#6366f1",
                    current_spend=8000000, max_capacity=15000000,
                    half_saturation=6000000, slope=2.5
                ),
                SaturationCurve(
                    channel="Meta (FB/IG)", color="#22c55e",
                    current_spend=6000000, max_capacity=12000000,
                    half_saturation=5000000, slope=2.2
                ),
                SaturationCurve(
                    channel="TikTok", color="#f43f5e",
                    current_spend=2000000, max_capacity=8000000,
                    half_saturation=3000000, slope=1.8
                ),
                SaturationCurve(
                    channel="Brand Search", color="#3b82f6",
                    current_spend=4000000, max_capacity=10000000,
                    half_saturation=4000000, slope=2.0
                ),
            ],
            marginal_efficiency=[
                MarginalEfficiency(
                    channel="Linear TV", mROAS=0.6, current_spend=8000000,
                    recommendation="CUT", color="#6366f1"
                ),
                MarginalEfficiency(
                    channel="Meta (FB/IG)", mROAS=0.8, current_spend=6000000,
                    recommendation="MAINTAIN", color="#22c55e"
                ),
                MarginalEfficiency(
                    channel="TikTok", mROAS=0.2, current_spend=2000000,
                    recommendation="CUT", color="#f43f5e"
                ),
                MarginalEfficiency(
                    channel="Brand Search", mROAS=0.7, current_spend=4000000,
                    recommendation="CUT", color="#3b82f6"
                ),
            ],
            weekly_data=weekly_data,
            total_budget=20000000,
            scenario_quality="high"
        )

mmm_service = MMMService()
