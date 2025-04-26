from transformers import pipeline
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or set your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model from local directory
model_path = "model"  # relative path to model directory
pipe = pipeline("image-classification", model=model_path)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    print("hello")
    contents = await file.read()
    try:
       image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
      return {"error": "Invalid image file"}

    result = pipe(image)
    return {"predictions": result}

