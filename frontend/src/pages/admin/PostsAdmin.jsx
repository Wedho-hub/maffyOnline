import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import ImageUploader from '../../components/admin/ImageUploader';
import Article from '../../components/article/Article';

const empty = {
  title: '',
  slug: '',
  content: '',
  mainImage: '',
  subImage1: '',
  subImage2: ''
};

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
    try {
      // Use content as entered (single textarea)
      const postData = {
        title: form.title,
        slug: form.slug,
        content: form.content,
        mainImage: form.mainImage,
        subImage1: form.subImage1,
        subImage2: form.subImage2
      };
      if (editing) await API.put(`/api/posts/${editing}`, postData);
      else await API.post('/api/posts', postData);
      await load(); setForm(empty); setEditing(null);
    } catch(err) { console.error(err); alert('Save failed'); }
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
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>{
                    setForm({
                      title: p.title,
                      slug: p.slug,
                      content: p.content,
                      mainImage: p.mainImage || '',
                      subImage1: p.subImage1 || '',
                      subImage2: p.subImage2 || ''
                    });
                    setEditing(p._id);
                  }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={()=>remove(p._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-6">
          <form onSubmit={submit} className="card card-body">
            <div className="mb-2">
              <input className="form-control" name="title" placeholder="Title" value={form.title} onChange={handle} required/>
            </div>
            <div className="mb-2">
              <input className="form-control" name="slug" placeholder="Slug (use hyphens)" value={form.slug} onChange={handle} required/>
              <small className="form-text text-muted">Slug is a URL-friendly version of the title, used for SEO and readable URLs (e.g., 'my-blog-post').</small>
            </div>

            {/* Main Image */}
            <div className="mb-3">
              <label className="form-label">Main Image (Top/Featured)</label>
              {form.mainImage && <div className="mb-2"><img src={form.mainImage} alt="Main" style={{maxWidth:200, borderRadius:8}}/></div>}
              <ImageUploader onUploaded={url => setForm({ ...form, mainImage: url })} />
            </div>

            {/* Content */}
            <div className="mb-3">
              <label className="form-label">Blog Content (HTML allowed)</label>
              <textarea
                className="form-control"
                name="content"
                placeholder="Enter blog content (HTML allowed)"
                value={form.content}
                onChange={handle}
                rows={10}
                required
              />
            </div>

            {/* Sub Images */}
            <div className="mb-3">
              <label className="form-label">Sub Image 1 (End of Blog)</label>
              {form.subImage1 && <div className="mb-2"><img src={form.subImage1} alt="Sub 1" style={{maxWidth:150, borderRadius:6}}/></div>}
              <ImageUploader onUploaded={url => setForm({ ...form, subImage1: url })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Sub Image 2 (End of Blog)</label>
              {form.subImage2 && <div className="mb-2"><img src={form.subImage2} alt="Sub 2" style={{maxWidth:150, borderRadius:6}}/></div>}
              <ImageUploader onUploaded={url => setForm({ ...form, subImage2: url })} />
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
          <div className="col-md-6" key={p._id}>
            <Article title={p.title} excerpt={p.content?.slice(0,150)} image={p.mainImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsAdmin;
