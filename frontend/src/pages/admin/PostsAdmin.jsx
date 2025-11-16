import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import ImageUploader from '../../components/admin/ImageUploader';
import Article from '../../components/article/Article';

const empty = {
  title: '',
  slug: '',
  content: '',
  image: '',
  paragraphs: ['', '', '', '', '', ''],
  inlineImages: ['', '', '', '', '', '']
};

const PostsAdmin = () => {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = async () => { const r = await API.get('/api/posts'); setList(r.data); };
  useEffect(()=>{ load(); }, []);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleParagraph = (index, value) => {
    const newParagraphs = [...form.paragraphs];
    newParagraphs[index] = value;
    setForm({ ...form, paragraphs: newParagraphs });
  };

  const handleInlineImage = (index, url) => {
    const newImages = [...form.inlineImages];
    newImages[index] = url;
    setForm({ ...form, inlineImages: newImages });
  };

  const startCreate = () => { setEditing(null); setForm(empty); };

  const submit = async e => {
    e.preventDefault();
    try {
      // Concatenate paragraphs and inline images into HTML content
      let htmlContent = '';
      for (let i = 0; i < 6; i++) {
        if (form.paragraphs[i]) {
          htmlContent += `<p>${form.paragraphs[i]}</p>`;
        }
        if (form.inlineImages[i]) {
          htmlContent += `<figure><img src="${form.inlineImages[i]}" alt="Inline image ${i+1}" /><figcaption>Figure ${i+1}</figcaption></figure>`;
        }
      }

      const postData = {
        title: form.title,
        slug: form.slug,
        content: htmlContent,
        image: form.image
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
                    // Parse content back to paragraphs and images for editing
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(p.content, 'text/html');
                    const paragraphs = Array.from(doc.querySelectorAll('p')).map(p => p.textContent);
                    const images = Array.from(doc.querySelectorAll('img')).map(img => img.src);
                    setForm({
                      title: p.title,
                      slug: p.slug,
                      content: p.content,
                      image: p.image || '',
                      paragraphs: [...paragraphs, '', '', '', '', '', ''].slice(0, 6),
                      inlineImages: [...images, '', '', '', '', '', ''].slice(0, 6)
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

            {/* Featured Image */}
            <div className="mb-3">
              <label className="form-label">Featured Image (Big)</label>
              {form.image && <div className="mb-2"><img src={form.image} alt="Featured" style={{maxWidth:200, borderRadius:8}}/></div>}
              <ImageUploader onUploaded={url => setForm({ ...form, image: url })} />
            </div>

            {/* 6 Paragraphs with Inline Images */}
            {form.paragraphs.map((para, index) => (
              <div key={index} className="mb-3 border p-3 rounded">
                <label className="form-label">Paragraph {index + 1}</label>
                <textarea
                  className="form-control mb-2"
                  placeholder={`Enter paragraph ${index + 1} content`}
                  value={para}
                  onChange={(e) => handleParagraph(index, e.target.value)}
                  rows={4}
                />
                <label className="form-label">Inline Image (Optional)</label>
                {form.inlineImages[index] && <div className="mb-2"><img src={form.inlineImages[index]} alt={`Inline ${index+1}`} style={{maxWidth:150, borderRadius:4}}/></div>}
                <ImageUploader onUploaded={url => handleInlineImage(index, url)} />
              </div>
            ))}

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
