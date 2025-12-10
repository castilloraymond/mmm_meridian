from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class ChannelMetrics(BaseModel):
    name: str
    spend: float
    mROAS: float
    contribution: float
    contribution_pct: float
    color: str

class ModelDiagnostics(BaseModel):
    r_squared: float
    mape: float
    durbin_watson: float

class ModelParameters(BaseModel):
    channel: str
    adstock: float
    slope: float

class SaturationCurve(BaseModel):
    channel: str
    color: str
    current_spend: float
    max_capacity: float
    # Hill function parameters
    half_saturation: float
    slope: float

class KPIs(BaseModel):
    total_incremental_revenue: float
    revenue_delta_pct: float
    total_roas: float
    roas_delta_pct: float
    base_sales: float
    base_sales_delta_pct: float
    marginal_cpa: float
    marginal_cpa_delta_pct: float

class MarginalEfficiency(BaseModel):
    channel: str
    mROAS: float
    current_spend: float
    recommendation: str  # "CUT", "MAINTAIN", "INCREASE"
    color: str

class SimulationResult(BaseModel):
    projected_revenue: float
    revenue_vs_current: float
    blended_roas: float
    optimization_score: int

class MMMResult(BaseModel):
    # Original fields (for backward compatibility)
    roi: Dict[str, float]
    attribution: Dict[str, float]
    model_fit: float
    predictions: List[Dict[str, Any]]
    
    # Enhanced fields
    channels: List[ChannelMetrics]
    kpis: KPIs
    diagnostics: ModelDiagnostics
    model_parameters: List[ModelParameters]
    saturation_curves: List[SaturationCurve]
    marginal_efficiency: List[MarginalEfficiency]
    weekly_data: List[Dict[str, Any]]  # 52 weeks of actual vs predicted
    total_budget: float
    scenario_quality: str  # "high", "mid", "low"

class UploadResponse(BaseModel):
    filename: str
    message: str
    status: str
