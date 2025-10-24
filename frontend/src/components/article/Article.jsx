import React from 'react';
import './Article.css';

const Article = ({ title, excerpt, href }) => (
  <article className="card article-card h-100">
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{title}</h5>
      <p className="card-text flex-grow-1">{excerpt}</p>
      {href && <a href={href} className="btn btn-primary mt-3 align-self-start">Read more</a>}
    </div>
  </article>
);

export default Article;
