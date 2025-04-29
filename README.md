# Ai_generated_image_detection_Using_vit

# pre-requisites
install node ,npm ,python3 and pip


# install dependencies

For the backend,

pip install fastapi uvicorn transformers torch torchvision gdown pillow

For the frontend,

npm install 


# Download the trained Vit Model

After Cloning the repository,run the DOWNLOAD_MODEL.SH file in backend to download the trained model in the backend repository.

  # OR

if you face difficulties, here is the model's link:https://drive.google.com/drive/folders/1t5KG9hk1JUfhTVCfrrA1d2OAUAedAgeL?usp=sharing.

you can download manually and store inside the backend folder.

# start the backend and frontend server scripts

backend:

uvicorn main:app --reload


frontend:

npm start
