import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../../context/UsersContext';
import './registro.css';
import * as Yup from 'yup';

const Registro = () => {
    const navigate = useNavigate();
    const { createUser, updateUser, getUser } = useUsers();
    const { id } = useParams();

    const initialValues = {
        nombre: '',
        apellido: '',
        correo: '',
        dni: '',
        celular: '',
        contrasena: '',
        dia: '',
        mes: '',
        ano: ''
    };

    const [formData, setFormData] = useState(initialValues);

    useEffect(() => {
        const loadUser = async () => {
            if (id) {
                try {
                    const user = await getUser(id);
                    setFormData({
                        nombre: user.nomUser || '',
                        apellido: user.apeUser || '',
                        dni: user.dniUser || '',
                        correo: user.correoUser || '',
                        contrasena: user.contraUser || '',
                        celular: user.celUser || '',
                        dia: user.bornUser ? user.bornUser.split('-')[2] : '',
                        mes: user.bornUser ? user.bornUser.split('-')[1] : '',
                        ano: user.bornUser ? user.bornUser.split('-')[0] : ''
                    });
                } catch (error) {
                    console.error('Error al cargar usuario:', error);
                }
            }
        };
        loadUser();
    }, [id, getUser]);

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('Nombre es requerido'),
        apellido: Yup.string().required('Apellido es requerido'),
        correo: Yup.string().email('Correo inválido').required('Correo es requerido'),
        dni: Yup.string()
            .matches(/^[0-9]+$/, "Solo se permiten números")
            .required('DNI es requerido'),
        celular: Yup.string()
            .matches(/^[0-9]+$/, "Solo se permiten números")
            .required('Celular es requerido'),
        contrasena: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('Contraseña es requerida'),
        dia: Yup.string().required('Día es requerido'),
        mes: Yup.string().required('Mes es requerido'),
        ano: Yup.string().required('Año es requerido')
    });

    const handleSubmit = async (values, actions) => {
        try {
            if (id) {
                await updateUser(id, values);
                console.log("Usuario actualizado");
            } else {
                await createUser(values);
                console.log("Usuario creado");
            }
            navigate('/'); // Redirige después del registro exitoso
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const mError = "text-red-500 text-justify font-semibold text-xs";

    return (
        <div className="register-container">
            <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="register-form">
                        <div className="form-column">
                            <label>
                                Nombre:
                                <Field type="text" name="nombre" required />
                                {errors.nombre && touched.nombre && <div className={`error ${mError}`}>{errors.nombre}</div>}
                            </label>
                            <label>
                                Correo:
                                <Field type="email" name="correo" required />
                                {errors.correo && touched.correo && <div className={`error ${mError}`}>{errors.correo}</div>}
                            </label>
                            <label>
                                DNI:
                                <Field type="text" name="dni" required />
                                {errors.dni && touched.dni && <div className={`error ${mError}`}>{errors.dni}</div>}
                            </label>
                            <label>
                                Celular:
                                <Field type="tel" name="celular" required />
                                {errors.celular && touched.celular && <div className={`error ${mError}`}>{errors.celular}</div>}
                            </label>
                        </div>
                        <div className="form-column">
                            <label>
                                Apellido:
                                <Field type="text" name="apellido" required />
                                {errors.apellido && touched.apellido && <div className={`error ${mError}`}>{errors.apellido}</div>}
                            </label>
                            <label>
                                Contraseña:
                                <Field type="password" name="contrasena" required />
                                {errors.contrasena && touched.contrasena && <div className={`error ${mError}`}>{errors.contrasena}</div>}
                            </label>
                            <label>
                                Fecha de Nacimiento:
                                <div className="birth-date">
                                    <Field as="select" name="dia" required>
                                        <option value="">Día</option>
                                        {[...Array(31).keys()].map(day => (
                                            <option key={day + 1} value={day + 1}>{day + 1}</option>
                                        ))}
                                    </Field>
                                    <Field as="select" name="mes" required>
                                        <option value="">Mes</option>
                                        {[
                                            "01", "02", "03", "04", "05", "06",
                                            "07", "08", "09", "10", "11", "12"
                                        ].map((month, index) => (
                                            <option key={index + 1} value={index + 1}>{month}</option>
                                        ))}
                                    </Field>
                                    <Field as="select" name="ano" required>
                                        <option value="">Año</option>
                                        {Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </Field>
                                </div>
                                {errors.dia && touched.dia && <div className={`error ${mError} py-2`}>{errors.dia}</div>}
                                {errors.mes && touched.mes && <div className={`error ${mError}`}>{errors.mes}</div>}
                                {errors.ano && touched.ano && <div className={`error ${mError} py-2`}>{errors.ano}</div>}
                            </label>
                        </div>
                        <div className="form-full">
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Registrando..." : "Registrarse"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Registro;
