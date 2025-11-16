import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import ImageUploader from '../../components/admin/ImageUploader';

const empty = { title:'', description:'', image:'' };

const ServicesAdmin = () => {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = async () => {
    const r = await API.get('/api/services');
    setList(r.data);
  };

  useEffect(()=>{ load(); }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const startCreate = () => { setEditing(null); setForm(empty); };
  const startEdit = item => { setEditing(item._id); setForm({ title:item.title, description:item.description, image:item.image||'' }); };

  const submit = async e => {
    e.preventDefault();
    try{
      if (editing) {
        await API.put(`/api/services/${editing}`, form);
      } else {
        await API.post('/api/services', form);
      }
      await load(); setForm(empty); setEditing(null);
    }catch(err){ console.error(err); alert('Save failed'); }
  };

  const remove = async id => { if (!confirm('Delete?')) return; await API.delete(`/api/services/${id}`); load(); };

  return (
    <div className="admin-area">
      <h2>Services</h2>
      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={startCreate}>New Service</button>
        <button className="btn btn-secondary" onClick={load}>Refresh</button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {list.map(s => (
              <li key={s._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{s.title}</strong>
                  <div className="text-muted small">{s.description?.slice(0,120)}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>startEdit(s)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>remove(s._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <form onSubmit={submit} className="card card-body">
            <div className="mb-2"><input className="form-control" name="title" placeholder="Title" value={form.title} onChange={handle} required/></div>
            <div className="mb-2"><textarea className="form-control" name="description" placeholder="Description" value={form.description} onChange={handle} rows={5} required/></div>
            <div className="mb-2">
              <label className="form-label">Image</label>
              {form.image && <div className="mb-2"><img src={form.image} alt="service" style={{maxWidth:160}}/></div>}
              <ImageUploader onUploaded={url => setForm({ ...form, image: url })} />
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary" type="submit">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setForm(empty); setEditing(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServicesAdmin;
