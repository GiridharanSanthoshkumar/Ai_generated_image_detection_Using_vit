from transformers import pipeline
from PIL import Image

pipe = pipeline("image-classification", model="model")
image = Image.open("test.jpg").convert("RGB")
print(pipe(image))
