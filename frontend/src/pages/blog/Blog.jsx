import React, { useEffect, useState, useRef } from 'react';
import Article from '../../components/article/Article';
import API from '../../services/api';
import './Blog.css';

const placeholders = [
  { _id: 'ph-1', title: 'Hiring for Growth: what to look for', excerpt: 'When companies grow rapidly hiring the right people becomes crucial — focus on adaptability, alignment and potential.', content: 'When companies grow rapidly hiring the right people becomes crucial — focus on adaptability, alignment and potential. In this article we explore how to identify candidates who can scale with your business, how to structure interviews, and what red flags to avoid.', image: '/images/blog-1.jpg', author: 'Maffy Online', date: 'Oct 10, 2025' },
  { _id: 'ph-2', title: 'Onboarding that sticks', excerpt: 'A structured onboarding process boosts retention. Small rituals, clear ownership and early wins help new hires succeed.', content: 'A structured onboarding process boosts retention. Small rituals, clear ownership and early wins help new hires succeed. We outline a 30/60/90 day plan and practical tips to get managers involved.', image: '/images/blog-2.jpg', author: 'Maffy Online', date: 'Sep 22, 2025' },
  { _id: 'ph-3', title: 'Building resilient teams', excerpt: 'Resilience comes from psychological safety, clarity of roles and investment in capability.', content: 'Resilience comes from psychological safety, clarity of roles and investment in capability. Learn how to build a culture of learning and adaptability across your teams.', image: '/images/blog-3.jpg', author: 'Maffy Online', date: 'Aug 19, 2025' },
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPost, setModalPost] = useState(null);
  const closeBtnRef = useRef(null);

  useEffect(()=>{ API.get('/api/posts').then(r=>setPosts(r.data)).catch(()=>{}); }, []);

  // use API posts if available, otherwise placeholders
  const list = posts.length ? posts : placeholders;

  // modal keyboard handler & focus management
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setModalOpen(false); };
    if (modalOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      setTimeout(()=> closeBtnRef.current?.focus(), 80);
    }
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [modalOpen]);

  const openModal = (p) => { setModalPost(p); setModalOpen(true); };

  return (
    <div className="blog-page container">
      <header className="hero">
        <h1>Insights & Articles</h1>
        <p className="lead">Practical advice on recruitment, HR and building teams in Zimbabwe and beyond.</p>
      </header>

      <section className="blog-list">
        <div className="row blog-grid">
          {list.map(p => (
            <div key={p._id} className="col-md-4">
              <div onClick={() => openModal(p)} style={{cursor:'pointer'}}>
                <Article title={p.title} excerpt={p.excerpt || p.content?.slice(0,140)} image={p.image} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expanded modal view */}
      {modalOpen && modalPost && (
        <div className="blog-modal" role="dialog" aria-modal="true">
          <div className="blog-modal-backdrop" onClick={() => setModalOpen(false)} />
          <div className="blog-modal-panel">
            <div className="blog-modal-body">
              <div className="blog-modal-header">
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div>
                    <h3 className="blog-modal-title">{modalPost.title}</h3>
                    <div className="blog-modal-meta">{modalPost.author} · {modalPost.date}</div>
                  </div>
                  {modalPost.image && <img src={modalPost.image} alt="" className="blog-modal-image" />}
                </div>
                <div>
                  <button ref={closeBtnRef} className="blog-modal-close" onClick={() => setModalOpen(false)}>Close · Esc</button>
                </div>
              </div>

              {/* Featured Image */}
              {modalPost.image && (
                <img src={modalPost.image} alt={modalPost.title} className="blog-modal-featured-image" />
              )}

              {/* Content with HTML support */}
              <div style={{marginTop:16, lineHeight:1.7}} dangerouslySetInnerHTML={{ __html: modalPost.content || modalPost.excerpt }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
