import React from "react";
import './card.css'

export default function Card({ imgSrc, title, description, link, linkText }){
    return (
    <article className="tarjeta">
      {imgSrc && <img src={imgSrc} alt={title} className="card-img" />}
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={link}>{linkText}</a>
    </article>
    )
}