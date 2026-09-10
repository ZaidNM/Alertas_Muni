import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { authenticateUserRequest, authenticateAdminRequest, authenticateEmailsRequest } from "../../../api/verif.api.js";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../../../context/LoginContext.jsx";
import img_f from '../../../assets/img/huanuco.jpg';

export default function Login() {
  const navigate = useNavigate();
  const { setLogin } = useLogin();
  const [adminEmails, setAdminEmails] = useState([]);

  useEffect(() => {
    authenticateEmailsRequest().then(r=>setAdminEmails(r.data)).catch(()=>{});
  }, []);

  const validationSchema = Yup.object().shape({
    correo: Yup.string().email("Correo inválido").required("Correo requerido"),
    contrasena: Yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña requerida"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const isAdmin = adminEmails.includes(values.correo);
      let response;
      if (isAdmin) {
        response = await authenticateAdminRequest(values);
        const adminData = { nombre: response.data.admin.nomAdmin, apellido: response.data.admin.apeAdmin, isAdmin: true };
        setLogin(adminData);
        localStorage.setItem('login', JSON.stringify(adminData));
        navigate("/admin/home");
      } else {
        response = await authenticateUserRequest(values);
        const userData = { nombre: response.data.user.nomUser, apellido: response.data.user.apeUser, isAdmin: false };
        setLogin(userData);
        localStorage.setItem('login', JSON.stringify(userData));
        navigate("/user/home");
      }
    } catch (e) {
      setErrors({ submit: "Correo o contraseña incorrectos" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-crema-light">
      <div className="relative hidden md:block">
        <img src={img_f} alt="Huánuco" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-nilo-900/80 via-nilo-700/30 to-transparent" />
        <div className="absolute bottom-0 p-10 text-white">
          <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-widest ring-1 ring-white/20">HUÁNUCO TE NECESITA</p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight">Reporta, participa<br/>y transforma tu ciudad</h2>
          <p className="mt-3 max-w-md text-sm text-white/80">Accede como ciudadano o administrador y gestiona reportes en segundos.</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-plomo hover:text-nilo">← Volver al inicio</Link>
          <div className="mt-6 rounded-3xl bg-white p-8 shadow-card ring-1 ring-plomo-light">
            <h1 className="font-display text-2xl font-bold text-negro">Iniciar sesión</h1>
            <p className="mt-1 text-sm text-plomo">Ingresa tus credenciales para continuar</p>

            <Formik initialValues={{ correo: "", contrasena: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting, errors, touched }) => (
                <Form className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-negro">Correo electrónico</label>
                    <Field name="correo" type="email" placeholder="tucorreo@demo.com" className="mt-1.5 w-full rounded-xl border border-plomo-light bg-plomo-lighter px-4 py-3 text-sm outline-none focus:border-nilo focus:ring-2 focus:ring-nilo/20 transition" />
                    {errors.correo && touched.correo && <p className="mt-1 text-xs font-semibold text-red-500">{errors.correo}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-negro">Contraseña</label>
                    <Field name="contrasena" type="password" placeholder="••••••••" className="mt-1.5 w-full rounded-xl border border-plomo-light bg-plomo-lighter px-4 py-3 text-sm outline-none focus:border-nilo focus:ring-2 focus:ring-nilo/20 transition" />
                    {errors.contrasena && touched.contrasena && <p className="mt-1 text-xs font-semibold text-red-500">{errors.contrasena}</p>}
                  </div>

                  {errors.submit && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 ring-1 ring-red-200">{errors.submit}</div>}

                  <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-nilo py-3.5 text-sm font-bold text-white shadow-soft hover:bg-nilo-dark transition disabled:opacity-60">
                    {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
                  </button>

                  <p className="text-center text-sm text-plomo">¿No tienes cuenta? <Link to="/registro" className="font-bold text-nilo hover:underline">Regístrate</Link></p>

                  <div className="rounded-xl bg-crema-light p-3 text-xs leading-relaxed text-plomo ring-1 ring-nilo/10">
                    <p className="font-bold text-nilo-dark">Demo:</p>
                    <p>Usuario: ana.garcia@demo.com / ana1234</p>
                    <p>Admin: admin@demo.com / admin123</p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
