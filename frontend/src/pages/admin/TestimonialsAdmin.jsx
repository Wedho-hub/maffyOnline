import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import ImageUploader from '../../components/admin/ImageUploader';

const empty = { name:'', role:'', message:'', company:'', image:'' };

const TestimonialsAdmin = () => {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = async () => { const r = await API.get('/api/testimonials'); setList(r.data); };
  useEffect(()=>{ load(); }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const startCreate = () => { setEditing(null); setForm(empty); };

  const submit = async e => {
    e.preventDefault();
    try{
      if (editing) await API.put(`/api/testimonials/${editing}`, form);
      else await API.post('/api/testimonials', form);
      await load(); setForm(empty); setEditing(null);
    }catch(err){ console.error(err); alert('Save failed'); }
  };

  const remove = async id => { if (!confirm('Delete?')) return; await API.delete(`/api/testimonials/${id}`); load(); };

  return (
    <div className="admin-area">
      <h2>Testimonials</h2>
      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={startCreate}>New</button>
        <button className="btn btn-secondary" onClick={load}>Refresh</button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {list.map(t => (
              <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{t.name}</strong> <div className="text-muted small">{t.role} — {t.company}</div>
                  <div className="mt-1">{t.message?.slice(0,120)}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>{ setEditing(t._id); setForm({ name:t.name, role:t.role, message:t.message, company:t.company, image:t.image||'' }); }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>remove(t._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <form onSubmit={submit} className="card card-body">
            <div className="mb-2"><input className="form-control" name="name" placeholder="Name" value={form.name} onChange={handle} required/></div>
            <div className="mb-2"><input className="form-control" name="role" placeholder="Role" value={form.role} onChange={handle} /></div>
            <div className="mb-2"><input className="form-control" name="company" placeholder="Company" value={form.company} onChange={handle} /></div>
            <div className="mb-2"><textarea className="form-control" name="message" placeholder="Message" value={form.message} onChange={handle} rows={5} required/></div>
            <div className="mb-2">
              {form.image && <div className="mb-2"><img src={form.image} alt="avatar" style={{maxWidth:160}}/></div>}
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

export default TestimonialsAdmin;
