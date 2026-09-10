import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useUsers } from '../../context/UsersContext';
import HeaderAdmi from '../../componentes/header/HeaderAdmi';
import * as Yup from 'yup';

export default function EditUser() {
  const navigate = useNavigate();
  const { updateUser, editUser } = useUsers();
  const { id } = useParams();
  const [formData, setFormData] = useState({ nombre:'',apellido:'',correo:'',dni:'',celular:'',contrasena:'',dia:'',mes:'',ano:'' });
  useEffect(()=>{ if(id) editUser(id).then(u=>setFormData({ nombre:u.nomUser||'',apellido:u.apeUser||'',dni:u.dniUser||'',correo:u.correoUser||'',contrasena:u.contraUser||'',celular:u.celUser||'',dia:u.bornUser?.split('-')[2]||'',mes:u.bornUser?.split('-')[1]||'',ano:u.bornUser?.split('-')[0]||''})).catch(console.error)},[id])
  const schema = Yup.object().shape({ nombre:Yup.string().required('Req'),apellido:Yup.string().required('Req'),correo:Yup.string().email('Inv').required('Req'),dni:Yup.string().matches(/^[0-9]+$/).required('Req'),celular:Yup.string().matches(/^[0-9]+$/).required('Req'),contrasena:Yup.string().min(6).required('Req'),dia:Yup.string().required('Req'),mes:Yup.string().required('Req'),ano:Yup.string().required('Req') });
  const handleSubmit = async(v)=>{ await updateUser(id,v); navigate('/admin/all-user') };
  const input="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm outline-none focus:border-nilo focus:ring-2 focus:ring-nilo/15";
  const label="text-xs font-bold tracking-wide text-negro";
  return (
    <div className="min-h-screen bg-crema-light">
      <HeaderAdmi />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <Link to="/admin/all-user" className="text-sm font-semibold text-plomo hover:text-nilo">← Usuarios</Link>
        <div className="mt-4 rounded-3xl bg-white p-6 md:p-8 shadow-card ring-1 ring-plomo-light">
          <h1 className="font-display text-xl font-bold text-negro">Editar usuario</h1>
          <p className="text-sm text-plomo">Actualiza los datos del ciudadano.</p>
          <Formik initialValues={formData} validationSchema={schema} onSubmit={handleSubmit} enableReinitialize>
            {({isSubmitting,errors,touched})=>(
              <Form className="mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div><label className={label}>Nombre</label><Field name="nombre" className={input} />{errors.nombre&&touched.nombre&&<p className="text-xs text-red-500">{errors.nombre}</p>}</div>
                  <div><label className={label}>Apellido</label><Field name="apellido" className={input} />{errors.apellido&&touched.apellido&&<p className="text-xs text-red-500">{errors.apellido}</p>}</div>
                  <div><label className={label}>Correo</label><Field name="correo" type="email" className={input} /></div>
                  <div><label className={label}>Contraseña</label><Field name="contrasena" type="password" className={input} /></div>
                  <div><label className={label}>DNI</label><Field name="dni" className={input} /></div>
                  <div><label className={label}>Celular</label><Field name="celular" className={input} /></div>
                  <div className="md:col-span-2"><label className={label}>Fecha nacimiento</label><div className="mt-1.5 grid grid-cols-3 gap-3"><Field as="select" name="dia" className={input}><option value="">Día</option>{[...Array(31)].map((_,i)=><option key={i} value={i+1}>{i+1}</option>)}</Field><Field as="select" name="mes" className={input}><option value="">Mes</option>{["01","02","03","04","05","06","07","08","09","10","11","12"].map((m,i)=><option key={m} value={i+1}>{m}</option>)}</Field><Field as="select" name="ano" className={input}><option value="">Año</option>{Array.from({length:80},(_,i)=>new Date().getFullYear()-i).map(y=><option key={y} value={y}>{y}</option>)}</Field></div></div>
                </div>
                <button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-full bg-nilo py-3.5 text-sm font-bold text-white hover:bg-nilo-dark">{isSubmitting?"Actualizando...":"Actualizar usuario"}</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
