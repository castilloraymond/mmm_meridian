from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.mmm import mmm_service
from app.services.sample_data import get_sample_data
from app.models.schemas import UploadResponse, MMMResult
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=MMMResult)
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Process the file immediately for this demo
        result = mmm_service.process_data(file_path)
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sample-data/{scenario}", response_model=MMMResult)
async def get_sample_dataset(scenario: str):
    """
    Get a pre-built sample dataset for demo purposes.
    
    Args:
        scenario: One of "high", "mid", or "low" quality scenarios
    """
    try:
        result = get_sample_data(scenario)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
