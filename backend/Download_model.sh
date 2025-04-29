
# Check if gdown is installed, if not, install it
if ! command -v gdown &> /dev/null
then
    echo "gdown not found. Installing gdown..."
    python3 -m pip install gdown
fi

# Download model from Google Drive
# Replace YOUR_FILE_ID with the actual file ID from your Google Drive link
python3 -m gdown --folder "https://drive.google.com/drive/folders/1t5KG9hk1JUfhTVCfrrA1d2OAUAedAgeL?usp=sharing"


