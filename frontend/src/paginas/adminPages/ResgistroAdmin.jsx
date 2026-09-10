import { Formik, Form, Field } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmins } from '../../context/AdminContext';
import HeaderAdmi from '../../componentes/header/HeaderAdmi';
import * as Yup from 'yup';

export default function RegistroAdmin() {
  const navigate = useNavigate();
  const { createAdmin } = useAdmins();
  const initialValues = { nombre:'',apellido:'',correo:'',dni:'',celular:'',contrasena:'',dia:'',mes:'',ano:'',tipoAdmin:'' };
  const schema = Yup.object().shape({ nombre:Yup.string().required('Req'),apellido:Yup.string().required('Req'),correo:Yup.string().email('Inv').required('Req'),dni:Yup.string().matches(/^[0-9]+$/).required('Req'),celular:Yup.string().matches(/^[0-9]+$/).required('Req'),contrasena:Yup.string().min(6).required('Req'),dia:Yup.string().required('Req'),mes:Yup.string().required('Req'),ano:Yup.string().required('Req'),tipoAdmin:Yup.string().required('Req') });
  const handleSubmit = async(v)=>{ await createAdmin(v); navigate('/admin/all-admin') };
  const input="mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm outline-none focus:border-nilo focus:ring-2 focus:ring-nilo/15";
  const label="text-xs font-bold tracking-wide text-negro";
  return (
    <div className="min-h-screen bg-crema-light">
      <HeaderAdmi />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <Link to="/admin/all-admin" className="text-sm font-semibold text-plomo hover:text-nilo">← Personal</Link>
        <div className="mt-4 rounded-3xl bg-white p-6 md:p-8 shadow-card ring-1 ring-plomo-light">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nilo text-white font-bold">+</div>
            <div>
              <h1 className="font-display text-xl font-bold text-negro">Agregar administrador</h1>
              <p className="text-sm text-plomo">Crea una nueva cuenta con permisos de gestión.</p>
            </div>
          </div>
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
            {({isSubmitting,errors,touched})=>(
              <Form className="mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div><label className={label}>Nombre</label><Field name="nombre" placeholder="Carlos" className={input} /></div>
                  <div><label className={label}>Apellido</label><Field name="apellido" placeholder="Mendoza" className={input} /></div>
                  <div><label className={label}>Correo</label><Field name="correo" type="email" placeholder="admin@demo.com" className={input} /></div>
                  <div><label className={label}>Contraseña</label><Field name="contrasena" type="password" className={input} /></div>
                  <div><label className={label}>DNI</label><Field name="dni" placeholder="45123678" className={input} /></div>
                  <div><label className={label}>Celular</label><Field name="celular" placeholder="951236478" className={input} /></div>
                  <div className="md:col-span-2"><label className={label}>Fecha nacimiento</label><div className="mt-1.5 grid grid-cols-3 gap-3"><Field as="select" name="dia" className={input}><option value="">Día</option>{[...Array(31)].map((_,i)=><option key={i} value={i+1}>{i+1}</option>)}</Field><Field as="select" name="mes" className={input}><option value="">Mes</option>{["01","02","03","04","05","06","07","08","09","10","11","12"].map((m,i)=><option key={m} value={i+1}>{m}</option>)}</Field><Field as="select" name="ano" className={input}><option value="">Año</option>{Array.from({length:60},(_,i)=>new Date().getFullYear()-i).map(y=><option key={y} value={y}>{y}</option>)}</Field></div></div>
                  <div className="md:col-span-2"><label className={label}>Tipo de administrador</label><Field as="select" name="tipoAdmin" className={input}><option value="">Seleccionar tipo</option><option value="superadmin">Superadmin</option><option value="admin">Admin</option><option value="editor">Editor</option></Field></div>
                </div>
                <button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-full bg-nilo py-3.5 text-sm font-bold text-white hover:bg-nilo-dark">{isSubmitting?"Creando...":"Crear administrador"}</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
