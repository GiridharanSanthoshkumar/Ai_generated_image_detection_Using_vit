import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload1() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setResult(null);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
const handleUpload = async () => {
  if (!image) return;

  const formData = new FormData();
  formData.append("file", image);

  try {
    setLoading(true);
    const res = await axios.post("http://127.0.0.1:8000/predict/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setResult(res.data);  // Save full object instead of .probabilities
  } catch (err) {
    console.error("Upload failed", err);
    alert("Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={styles.container}>
      {loading && (
        <div style={styles.loaderOverlay}>
          <div style={styles.loaderText}>Analyzing Image...</div>
        </div>
      )}
      <div style={styles.card}>
        <h2 style={styles.heading}>🧠 AI Image Classifier</h2>

        <input type="file" onChange={handleImageChange} style={styles.input} />

        {preview && (
          <div style={styles.previewContainer}>
            <img src={preview} alt="preview" style={styles.imagePreview} />
          </div>
        )}

        <button onClick={handleUpload} style={styles.button}>
          Classify
        </button>

        {result && (
  <div style={styles.resultBox}>
    <h3 style={styles.resultTitle}>Prediction:</h3>
    <p style={styles.resultItem}>
      <strong>Label:</strong> {result.label}
    </p>
    
    <h4 style={{ marginTop: "15px" }}>Full Class Probabilities:</h4>
    {Object.entries(result.raw_probs).map(([label, prob], i) => (
      <p key={i} style={styles.resultItem}>
        {label}: <strong>{prob}%</strong>
      </p>
    ))}
  </div>
)}

      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #1f1c2c, #928dab)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.08)',
    padding: '30px',
    borderRadius: '20px',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    color: '#fff',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '1.8rem',
    letterSpacing: '1px',
  },
  input: {
    marginBottom: '20px',
    color: '#fff',
  },
  previewContainer: {
    marginBottom: '20px',
  },
  imagePreview: {
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  },
  button: {
    padding: '10px 20px',
    background: '#4A00E0',
    backgroundImage: 'linear-gradient(to right, #8e2de2, #4a00e0)',
    border: 'none',
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: '0.3s',
  },
  resultBox: {
    marginTop: '20px',
    textAlign: 'left',
  },
  resultTitle: {
    fontSize: '1.2rem',
    borderBottom: '1px solid rgba(255,255,255,0.3)',
    paddingBottom: '5px',
    marginBottom: '10px',
  },
  resultItem: {
    fontSize: '1rem',
    margin: '5px 0',
  },
  loaderOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
};

export default ImageUpload1;
