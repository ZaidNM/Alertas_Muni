import { useEffect, useState } from 'react'
import Header from '../../../componentes/header/header'
import Footer from '../../../componentes/footer/footer'
import banPr from '../../../assets/img/preguntas.png'
import { captPreguntasRequest } from '../../../api/capt.api'

export default function PrFrecuentes() {
  const [questions, setQuestions] = useState([])
  const [open, setOpen] = useState(0)
  useEffect(() => { captPreguntasRequest().then(r=>setQuestions(r.data)).catch(console.error) }, [])
  return (
    <div className="min-h-screen bg-crema-light">
      <Header />
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-3xl bg-white p-6 md:p-8 shadow-card ring-1 ring-plomo-light">
          <div className="flex flex-col items-center text-center">
            <img src={banPr} alt="banner" className="w-full max-w-md rounded-2xl" />
            <h1 className="mt-6 font-display text-3xl font-bold text-negro">Preguntas frecuentes</h1>
            <p className="mt-2 max-w-xl text-sm text-plomo">Resolvemos tus dudas sobre cómo reportar, tiempos de respuesta y seguimiento.</p>
          </div>

          <div className="mt-8 space-y-3">
            {questions.map((faq,i)=> (
              <div key={faq.idPregunta || i} className="overflow-hidden rounded-2xl border border-plomo-light bg-crema-light/50">
                <button onClick={()=>setOpen(open===i? -1 : i)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                  <span className="font-display text-sm font-bold text-negro">{faq.pregunta}</span>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-nilo text-white transition ${open===i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {open===i && <div className="border-t border-plomo-light bg-white px-5 py-4 text-sm leading-relaxed text-plomo-dark">{faq.respuesta}</div>}
              </div>
            ))}
            {questions.length===0 && <p className="py-8 text-center text-sm text-plomo">Cargando preguntas...</p>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
