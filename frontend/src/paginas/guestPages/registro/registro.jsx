import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useUsers } from '../../../context/UsersContext';
import * as Yup from 'yup';

export default function Registro() {
  const navigate = useNavigate();
  const { createUser, getUser, updateUser } = useUsers();
  const initialValues = { nombre: '', apellido: '', correo: '', dni: '', celular: '', contrasena: '', dia: '', mes: '', ano: '' };
  const [formData, setFormData] = useState(initialValues);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Requerido'),
    apellido: Yup.string().required('Requerido'),
    correo: Yup.string().email('Inválido').required('Requerido'),
    dni: Yup.string().matches(/^[0-9]+$/, "Solo números").length(8, "8 dígitos").required('Requerido'),
    celular: Yup.string().matches(/^[0-9]+$/, "Solo números").required('Requerido'),
    contrasena: Yup.string().min(6, 'Mínimo 6').required('Requerido'),
    dia: Yup.string().required('Req'), mes: Yup.string().required('Req'), ano: Yup.string().required('Req'),
  });

  const handleSubmit = async (values) => {
    try { await createUser(values); navigate('/login'); } catch(e){ console.error(e) }
  };

  const inputCls = "mt-1.5 w-full rounded-xl border border-plomo-light bg-white px-4 py-3 text-sm outline-none focus:border-nilo focus:ring-2 focus:ring-nilo/15 transition";
  const labelCls = "text-xs font-bold tracking-wide text-negro";
  const errCls = "mt-1 text-xs font-semibold text-red-500";

  return (
    <div className="min-h-screen bg-crema-light py-8 px-4">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-plomo hover:text-nilo">← Volver</Link>
        <div className="mt-4 rounded-3xl bg-white p-6 md:p-8 shadow-card ring-1 ring-plomo-light">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nilo text-white font-bold">RC</div>
            <div>
              <h1 className="font-display text-xl font-bold text-negro">Crear cuenta ciudadana</h1>
              <p className="text-sm text-plomo">Únete y reporta en segundos. Datos protegidos.</p>
            </div>
          </div>

          <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ isSubmitting, errors, touched }) => (
              <Form className="mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelCls}>Nombre</label>
                    <Field name="nombre" placeholder="Ana" className={inputCls} />
                    {errors.nombre && touched.nombre && <p className={errCls}>{errors.nombre}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Apellido</label>
                    <Field name="apellido" placeholder="García" className={inputCls} />
                    {errors.apellido && touched.apellido && <p className={errCls}>{errors.apellido}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Correo</label>
                    <Field name="correo" type="email" placeholder="ana@demo.com" className={inputCls} />
                    {errors.correo && touched.correo && <p className={errCls}>{errors.correo}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Contraseña</label>
                    <Field name="contrasena" type="password" placeholder="••••••" className={inputCls} />
                    {errors.contrasena && touched.contrasena && <p className={errCls}>{errors.contrasena}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>DNI</label>
                    <Field name="dni" placeholder="70123456" className={inputCls} />
                    {errors.dni && touched.dni && <p className={errCls}>{errors.dni}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Celular</label>
                    <Field name="celular" placeholder="912345678" className={inputCls} />
                    {errors.celular && touched.celular && <p className={errCls}>{errors.celular}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls}>Fecha de nacimiento</label>
                    <div className="mt-1.5 grid grid-cols-3 gap-3">
                      <Field as="select" name="dia" className={inputCls}><option value="">Día</option>{[...Array(31)].map((_,i)=><option key={i} value={i+1}>{i+1}</option>)}</Field>
                      <Field as="select" name="mes" className={inputCls}><option value="">Mes</option>{["01","02","03","04","05","06","07","08","09","10","11","12"].map((m,i)=><option key={m} value={i+1}>{m}</option>)}</Field>
                      <Field as="select" name="ano" className={inputCls}><option value="">Año</option>{Array.from({length:60},(_,i)=>new Date().getFullYear()-18-i).map(y=><option key={y} value={y}>{y}</option>)}</Field>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-full bg-nilo py-3.5 text-sm font-bold text-white shadow-soft hover:bg-nilo-dark transition disabled:opacity-60">
                  {isSubmitting ? "Registrando..." : "Crear cuenta"}
                </button>
                <p className="mt-3 text-center text-sm text-plomo">¿Ya tienes cuenta? <Link to="/login" className="font-bold text-nilo hover:underline">Inicia sesión</Link></p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
