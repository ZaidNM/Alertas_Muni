// FIX: Card siempre muestra imagen con fallback y onError, antes imgSrc podía ser null y dejaba card sin cabecera o con ícono roto
import fallbackCard from "../../assets/img/huanuco.jpg";
export default function Card({ imgSrc, title, description, link, linkText }){
  const src = imgSrc || fallbackCard;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-plomo-light transition hover:shadow-float hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-plomo-lighter">
        <img
          src={src}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e)=>{ e.currentTarget.src = fallbackCard; }} // FIX: si la URL del backend es 404 (/img/slider/...), usa huanuco.jpg
        />
        <div className="absolute left-3 top-3 rounded-full bg-nilo px-3 py-1 text-xs font-bold text-white shadow">Reporte</div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[15px] font-bold leading-tight text-negro line-clamp-2">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-plomo">{description}</p>
        <a href={link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-nilo hover:text-nilo-dark">
          {linkText} <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  )
}
