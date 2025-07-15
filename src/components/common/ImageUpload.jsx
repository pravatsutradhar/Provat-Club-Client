import React, { useState } from 'react';
import { uploadImage } from '../../services/api';

const ImageUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setError('');
    try {
      const url = await uploadImage(file);
      onUpload(url);
    } catch (err) {
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: 200, marginTop: 8 }} />}
    </div>
  );
};

export default ImageUpload; 