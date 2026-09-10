import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardAdmin from './CardAdmin.jsx';
import { useCap } from '../../context/CapContext.jsx';
import {useAdmins} from '../../context/AdminContext.jsx';

export default function AllCardsAdmin() {
  const { caps, capLoadAdmin } = useCap();
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = caps.slice(indexOfFirstCard, indexOfLastCard);
  useEffect(() => { capLoadAdmin(); }, []);
  const totalPages = Math.ceil(caps.length / cardsPerPage);
  const paginate = n => { if(n>=1&&n<=totalPages) setCurrentPage(n) };
  const { deleteAdmin } = useAdmins();
  const navigate = useNavigate();
  const handleDelete = (id) => { if(confirm('¿Eliminar administrador?')) deleteAdmin(id); };

  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      {currentCards.length===0 ? <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-plomo-light"><p className="text-plomo">Sin administradores</p></div> : (
        <div className="grid gap-5 md:grid-cols-3">
          {currentCards.map((cap,i)=> (
            <div key={i} className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-plomo-light hover:shadow-float transition">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-negro text-white font-bold">{cap.nomAdmin?.[0]}</div>
                <div>
                  <p className="text-sm font-bold text-negro">{cap.nomAdmin} {cap.apeAdmin}</p>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${cap.typeAdmin==='superadmin'?'bg-nilo text-white':'bg-plomo-lighter text-plomo-dark'}`}>{cap.typeAdmin}</span>
                </div>
              </div>
              <CardAdmin nombre={cap.nomAdmin} apellido={cap.apeAdmin} dni={cap.dniAdmin} correo={cap.correoAdmin} nacimiento={cap.bornAdmin?.slice(0,10)} celular={cap.celAdmin} tipo={cap.typeAdmin} />
              <div className="mt-4 flex gap-2">
                <button onClick={()=>navigate(`/admin/edit-admin/${cap.idAdmin}`)} className="flex-1 rounded-full bg-nilo py-2 text-xs font-bold text-white hover:bg-nilo-dark">Editar</button>
                <button onClick={()=>handleDelete(cap.idAdmin)} className="flex-1 rounded-full bg-white py-2 text-xs font-bold text-red-600 ring-1 ring-red-200 hover:bg-red-50">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {totalPages>1 && (
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-white p-1.5 shadow-card ring-1 ring-plomo-light">
            <button onClick={()=>paginate(currentPage-1)} disabled={currentPage===1} className="rounded-full px-4 py-2 text-sm font-bold disabled:opacity-30 hover:bg-plomo-lighter">‹</button>
            {[...Array(totalPages)].map((_,n)=><button key={n} onClick={()=>paginate(n+1)} className={`h-9 w-9 rounded-full text-sm font-bold ${currentPage===n+1?'bg-nilo text-white':'text-plomo hover:bg-plomo-lighter'}`}>{n+1}</button>)}
            <button onClick={()=>paginate(currentPage+1)} disabled={currentPage===totalPages} className="rounded-full px-4 py-2 text-sm font-bold disabled:opacity-30 hover:bg-plomo-lighter">›</button>
          </div>
        </div>
      )}
    </div>
  );
}
