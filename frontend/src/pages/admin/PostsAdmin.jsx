import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import ImageUploader from '../../components/admin/ImageUploader';
import Article from '../../components/article/Article';

const empty = { title:'', slug:'', content:'', image:'' };

const PostsAdmin = () => {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = async () => { const r = await API.get('/api/posts'); setList(r.data); };
  useEffect(()=>{ load(); }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const startCreate = () => { setEditing(null); setForm(empty); };

  const submit = async e => {
    e.preventDefault();
    try{
      if (editing) await API.put(`/api/posts/${editing}`, form);
      else await API.post('/api/posts', form);
      await load(); setForm(empty); setEditing(null);
    }catch(err){ console.error(err); alert('Save failed'); }
  };

  const remove = async id => { if (!confirm('Delete?')) return; await API.delete(`/api/posts/${id}`); load(); };

  return (
    <div className="admin-area">
      <h2>Blogs</h2>
      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={startCreate}>New Post</button>
        <button className="btn btn-secondary" onClick={load}>Refresh</button>
      </div>

      <div className="row">
        <div className="col-md-6">
          {list.map(p => (
            <div key={p._id} className="card mb-2">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div style={{flex:1}}>
                  <h5>{p.title}</h5>
                  <p className="text-muted small">by {p.author?.name || '—'}</p>
                </div>
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>{ setForm({ title:p.title, slug:p.slug, content:p.content, image:p.image||'' }); setEditing(p._id); }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>remove(p._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-6">
          <form onSubmit={submit} className="card card-body">
            <div className="mb-2"><input className="form-control" name="title" placeholder="Title" value={form.title} onChange={handle} required/></div>
            <div className="mb-2">
              <input className="form-control" name="slug" placeholder="Slug (use hyphens)" value={form.slug} onChange={handle} required/>
              <small className="form-text text-muted">Slug is a URL-friendly version of the title, used for SEO and readable URLs (e.g., 'my-blog-post').</small>
            </div>
            <div className="mb-2"><textarea className="form-control" name="content" placeholder="Content (HTML allowed)" value={form.content} onChange={handle} rows={8} required/></div>
            <div className="mb-2">
              {form.image && <div className="mb-2"><img src={form.image} alt="post" style={{maxWidth:200}}/></div>}
              <ImageUploader onUploaded={url => setForm({ ...form, image: url })} />
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary" type="submit">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setForm(empty); setEditing(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <hr />
      <h3>Preview</h3>
      <div className="row">
        {list.map(p => (
          <div className="col-md-6" key={p._id}><Article title={p.title} excerpt={p.content?.slice(0,150)} image={p.image} /></div>
        ))}
      </div>
    </div>
  );
};

export default PostsAdmin;
