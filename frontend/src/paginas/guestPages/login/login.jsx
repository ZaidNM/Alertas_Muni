import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    authenticateUserRequest,
    authenticateAdminRequest,
    authenticateEmailsRequest,
} from "../../../api/verif.api.js"; // Importar las funciones de la API
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../context/LoginContext.jsx";//
import "./login.css";
import img_f from '../../../assets/img/huanuco.jpg';

const Login = () => {
    const navigate = useNavigate();
    const { login, setLogin } = useLogin();
    const [task, setTask] = useState({
        correo: "",
        contrasena: "",
    });
    const [adminEmails, setAdminEmails] = useState([]);

    useEffect(() => {
        const fetchAdminEmails = async () => {
            try {
                const response = await authenticateEmailsRequest();
                setAdminEmails(response.data);
                //console.log(response.data)
            } catch (error) {
                console.error("Error al obtener correos de administradores:", error);
            }
        };
        fetchAdminEmails();
    }, []);

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const isAdmin = adminEmails.includes(values.correo);
            console.log("is admin:", isAdmin)

            let response;
            if (isAdmin) {
                response = await authenticateAdminRequest(values);
                console.log("Este es el reponse: ",response)
                const adminData = { 
                    nombre: response.data.admin.nomAdmin, 
                    apellido: response.data.admin.apeAdmin,
                    isAdmin: true
                };
                setLogin(adminData);
                localStorage.setItem('login', JSON.stringify(adminData));
                console.log("Estos son los datos: ",adminData)
            } else {
                response = await authenticateUserRequest(values);
                console.log("Este es el reponse: ", response)
                const userData = {
                    nombre: response.data.user.nomUser,
                    apellido: response.data.user.apeUser,
                    isAdmin: false
                };
                setLogin(userData);
                localStorage.setItem('login', JSON.stringify(userData));
                console.log("Estos son los datos: ", userData)
            }

            if (isAdmin) {
                navigate("/admin/home");
            } else {
                navigate("/user/home");
            }

        } catch (error) {
            console.error("Error en handleSubmit:", error);
            setErrors({ submit: "Correo o contraseña incorrectos" });
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        correo: Yup.string().email("Correo inválido").required("Correo requerido"),
        contrasena: Yup.string()
            .min(6, "Contraseña debe tener al menos 6 caracteres")
            .required("Contraseña requerida"),
    });

    return (
        <div className="login-container relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${img_f})`, backgroundSize: "cover", backgroundPosition: "0% 10%" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Formik
                initialValues={task}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="login-form relative">
                        <h2>Iniciar Sesión</h2>
                        <label>
                            Correo:
                            <Field type="email" name="correo" required />
                            {errors.correo && touched.correo && (
                                <div className="error text-red-500 text-justify font-semibold">{errors.correo}</div>
                            )}
                        </label>
                        <label>
                            Contraseña:
                            <Field type="password" name="contrasena" required />
                            {errors.contrasena && touched.contrasena && (
                                <div className="error text-red-500 text-justify font-semibold">{errors.contrasena}</div>
                            )}
                        </label>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
                        </button>
                        {errors.submit && <div className="error">{errors.submit}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
