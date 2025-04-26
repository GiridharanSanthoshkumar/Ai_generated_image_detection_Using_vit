from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import io
import torch
import timm
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from torchvision import transforms

app = FastAPI()


# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or set your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Define model and load weights
model = timm.create_model('tf_efficientnetv2_s.in21k_ft_in1k',
                          pretrained=True,
                          num_classes=2)
model.load_state_dict(torch.load('best_model.pth', map_location=device))
model.to(device)
model.eval()

# Image size used during training
IMG_SIZE = 224  # update this if your training size is different

from torchvision import transforms

val_transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=(0.485, 0.456, 0.406),
                         std=(0.229, 0.224, 0.225))
])
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    # Apply transforms
    input_tensor = val_transform(image).unsqueeze(0).to(device)

    # Inference
    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)[0]  # get probs of shape (2,)
        predicted_class = torch.argmax(probs).item()
        confidence = probs[predicted_class].item()

    # Mapping class index to label
    label_map = {0: "REAL", 1: "FAKE"}  # Adjust based on your training
    label = label_map[predicted_class]

    return JSONResponse(content={
        "label": label,
        "confidence": round(confidence * 100, 2),  # percentage format
        "raw_probs": {
            "REAL": round(probs[0].item() * 100, 2),
            "FAKE": round(probs[1].item() * 100, 2)
        }
    })

   

