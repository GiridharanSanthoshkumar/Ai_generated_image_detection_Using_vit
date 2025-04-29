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

# Verify the running model 

 Open the browser, in "http://localhost:3000/",the app is running.You can upload the image and check its working.


# How the VIT gets trained?
 
 We have attached the google colab link of the VIT training notebook for you reference:
 https://colab.research.google.com/drive/1QfCwoTmJXivFkyANGD_9HqVAqWxMX357?usp=sharing

