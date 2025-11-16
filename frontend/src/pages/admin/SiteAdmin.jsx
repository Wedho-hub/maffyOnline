import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import ImageUploader from '../../components/admin/ImageUploader';

const SiteAdmin = () => {
  const [about, setAbout] = useState(null);
  const [home, setHome] = useState(null);

  const load = async () => {
    try{
      const a = await API.get('/api/site/about').then(r=>r.data).catch(()=>null);
      const h = await API.get('/api/site/home').then(r=>r.data).catch(()=>null);
      setAbout(a); setHome(h);
    }catch(err){ console.error(err); }
  };

  useEffect(()=>{ load(); }, []);

  const save = async (key, payload, file) => {
    try{
      const fd = new FormData();
      Object.keys(payload).forEach(k => fd.append(k, payload[k]));
      if (file) fd.append('image', file);
      const r = await API.post(`/api/site/${key}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      key === 'about' ? setAbout(r.data) : setHome(r.data);
      alert('Saved');
    }catch(err){ console.error(err); alert('Save failed'); }
  };

  return (
    <div className="admin-area">
      <h2>Site Content</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>About</h3>
          <form onSubmit={e=>{ e.preventDefault(); const payload = { title:e.target.title.value, subtitle:e.target.subtitle.value, body: e.target.body.value }; save('about', payload); }} className="card card-body">
            <div className="mb-2"><input name="title" defaultValue={about?.title||''} className="form-control" placeholder="Title"/></div>
            <div className="mb-2"><input name="subtitle" defaultValue={about?.subtitle||''} className="form-control" placeholder="Subtitle"/></div>
            <div className="mb-2"><textarea name="body" defaultValue={about?.body||''} className="form-control" rows={6} placeholder="Body (HTML allowed)"/></div>
            <div className="mb-2">
              {about?.image && <div className="mb-2"><img src={about.image} alt="about" style={{maxWidth:200}}/></div>}
              <ImageUploader onUploaded={url => { save('about', { image: url }); }} />
            </div>
            <button className="btn btn-primary">Save About</button>
          </form>
        </div>

        <div className="col-md-6">
          <h3>Home</h3>
          <form onSubmit={e=>{ e.preventDefault(); const payload = { title:e.target.title.value, subtitle:e.target.subtitle.value, body: e.target.body.value }; save('home', payload); }} className="card card-body">
            <div className="mb-2"><input name="title" defaultValue={home?.title||''} className="form-control" placeholder="Hero Title"/></div>
            <div className="mb-2"><input name="subtitle" defaultValue={home?.subtitle||''} className="form-control" placeholder="Hero subtitle"/></div>
            <div className="mb-2"><textarea name="body" defaultValue={home?.body||''} className="form-control" rows={4} placeholder="Body (short)"/></div>
            <div className="mb-2">
              {home?.image && <div className="mb-2"><img src={home.image} alt="home" style={{maxWidth:200}}/></div>}
              <ImageUploader onUploaded={url => { save('home', { image: url }); }} />
            </div>
            <button className="btn btn-primary">Save Home</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SiteAdmin;
