import React from 'react';
import './Article.css';

const Icon = () => (
  <span className="article-icon" aria-hidden>
    {/* simple themed circle icon */}
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="var(--brand-gold)" opacity="0.12" />
  <circle cx="12" cy="12" r="4" fill="var(--brand-charcoal)" />
    </svg>
  </span>
);

const Article = ({ title, excerpt, href, image }) => (
  <article className="card article-card h-100 animate-card">
    {image && (
      <div style={{height:140, overflow:'hidden'}}>
        <img src={image} alt={title} style={{width:'100%', height:'140px', objectFit:'cover'}} />
      </div>
    )}
    <div className="card-body d-flex flex-column">
      <div className="d-flex align-items-start gap-3">
        <Icon />
        <h5 className="card-title mb-0">{title}</h5>
      </div>
      <p className="card-text flex-grow-1 mt-3">{excerpt}</p>
      {href && <a href={href} className="btn btn-primary mt-3 align-self-start">Read more</a>}
    </div>
  </article>
);

export default Article;
