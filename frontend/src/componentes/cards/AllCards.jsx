// FIX: AllCards también necesitaba fallback de imagen, igual que Swiper
import { useState } from 'react';
import Card from './cards';
import fallbackAll from "../../assets/img/huanuco.jpg";

export default function AllCards({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const paginate = n => { if (n>=1 && n<=totalPages) setCurrentPage(n) };

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {currentCards.length===0 ? (
        <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-plomo-light">
          <p className="font-display font-bold text-negro">Sin resultados</p>
          <p className="text-sm text-plomo">No hay elementos para mostrar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {currentCards.map((dat, i) => (
            <Card key={i} imgSrc={dat.imgSrc || dat.imagen || dat.evidencia || fallbackAll} title={dat.title || dat.titulo} description={dat.description || dat.descripcion} link={dat.link || dat.ubicacion || '#'} linkText={dat.linkText || dat.linkTexto || (dat.estado ? `Estado: ${dat.estado}` : 'Ver detalle →')} />
          ))}
        </div>
      )}

      {totalPages>1 && (
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-white p-1.5 shadow-card ring-1 ring-plomo-light">
            <button onClick={()=>paginate(currentPage-1)} disabled={currentPage===1} className="rounded-full px-4 py-2 text-sm font-bold disabled:opacity-30 hover:bg-plomo-lighter">‹ Prev</button>
            {[...Array(totalPages)].map((_,n)=> (
              <button key={n} onClick={()=>paginate(n+1)} className={`h-9 w-9 rounded-full text-sm font-bold ${currentPage===n+1 ? 'bg-nilo text-white shadow' : 'text-plomo hover:bg-plomo-lighter'}`}>{n+1}</button>
            ))}
            <button onClick={()=>paginate(currentPage+1)} disabled={currentPage===totalPages} className="rounded-full px-4 py-2 text-sm font-bold disabled:opacity-30 hover:bg-plomo-lighter">Next ›</button>
          </div>
        </div>
      )}
    </div>
  );
}
