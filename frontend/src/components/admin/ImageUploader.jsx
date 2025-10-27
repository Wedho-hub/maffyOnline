import React, { useState } from 'react';
import API from '../../services/api';

const ImageUploader = ({ onUploaded }) => {
  const [loading, setLoading] = useState(false);

  const upload = async e => {
  const f = e.target.files[0];
  if (!f) return;
    const fd = new FormData();
    fd.append('file', f);
    setLoading(true);
    try{
      const r = await API.post('/api/uploads', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      onUploaded && onUploaded(r.data.url);
    }catch(err){
      console.error(err);
      alert('Upload failed');
  } finally { setLoading(false); }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={upload} />
      {loading && <div className="mt-2">Uploading...</div>}
    </div>
  );
};

export default ImageUploader;
