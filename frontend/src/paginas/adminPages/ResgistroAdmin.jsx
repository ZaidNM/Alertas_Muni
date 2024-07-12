import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmins } from '../../context/AdminContext';
import * as Yup from 'yup';
import imgF from '../../assets/img/fondo-registro.jpg';

const RegistroAdmin = () => {
    const navigate = useNavigate();
    const { createAdmin, updateAdmin, getAdmin } = useAdmins();
    const { id } = useParams()

    const initialValues = {
        nombre: '',
        apellido: '',
        correo: '',
        dni: '',
        celular: '',
        contrasena: '',
        dia: '',
        mes: '',
        ano: '',
        tipoAdmin:''
    };

    const [formData, setFormData] = useState(initialValues);

    useEffect(() => {
        const loadAdmin = async () => {
            if (id) {
                try {
                    const admin = await getAdmin(id);
                    setFormData({
                        nombre: admin.nomAdmin || '',
                        apellido: admin.apeAdmin || '',
                        dni: admin.dniAdmin || '',
                        correo: admin.correoAdmin || '',
                        contrasena: admin.contraAdmin || '',
                        celular: admin.celAdmin || '',
                        dia: admin.bornAdmin ? admin.bornAdmin.split('-')[2] : '',
                        mes: admin.bornAdmin ? admin.bornAdmin.split('-')[1] : '',
                        ano: admin.bornAdmin ? admin.bornAdmin.split('-')[0] : '',
                        tipoAdmin: admin.typeAdmin || ''
                    });
                } catch (error) {
                    console.error('Error al cargar admin:', error);
                }
            }
        };
        loadAdmin();
    }, [id, getAdmin]);

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
        ano: Yup.string().required('Año es requerido'),
        tipoAdmin: Yup.string().required('Tipo de administrado es requerido')
    });

    const handleSubmit = async (values, actions) => {
        try {
            if (id) {
                await updateAdmin(id, values);
                console.log("Admin actualizado");
            } else {
                await createAdmin(values);
                console.log("Admin creado");
            }
            navigate('/admin/all-admin'); // Redirige después del registro exitoso
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const mError = "text-red-500 text-justify font-semibold text-xs";

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed p-5" style={{ backgroundImage: `url(${imgF})` }}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="flex flex-wrap max-w-3xl p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
                        <div className="flex-1 min-w-[300px] p-4">
                            <label className="block mb-4">
                                Nombre:
                                <Field type="text" name="nombre" required className="w-full mt-1 p-2 border rounded" />
                                {errors.nombre && touched.nombre && <div className="text-red-500 font-semibold">{errors.nombre}</div>}
                            </label>
                            <label className="block mb-4">
                                Correo:
                                <Field type="email" name="correo" required className="w-full mt-1 p-2 border rounded" />
                                {errors.correo && touched.correo && <div className="text-red-500 font-semibold">{errors.correo}</div>}
                            </label>
                            <label className="block mb-4">
                                DNI:
                                <Field type="text" name="dni" required className="w-full mt-1 p-2 border rounded" />
                                {errors.dni && touched.dni && <div className="text-red-500 font-semibold">{errors.dni}</div>}
                            </label>
                            <label className="block mb-4">
                                Celular:
                                <Field type="tel" name="celular" required className="w-full mt-1 p-2 border rounded" />
                                {errors.celular && touched.celular && <div className="text-red-500 font-semibold">{errors.celular}</div>}
                            </label>
                        </div>
                        <div className="flex-1 min-w-[300px] p-4">
                            <label className="block mb-4">
                                Apellido:
                                <Field type="text" name="apellido" required className="w-full mt-1 p-2 border rounded" />
                                {errors.apellido && touched.apellido && <div className="text-red-500 font-semibold">{errors.apellido}</div>}
                            </label>
                            <label className="block mb-4">
                                Contraseña:
                                <Field type="password" name="contrasena" required className="w-full mt-1 p-2 border rounded" />
                                {errors.contrasena && touched.contrasena && <div className="text-red-500 font-semibold">{errors.contrasena}</div>}
                            </label>
                            <label className="block mb-4">
                                Fecha de Nacimiento:
                                <div className="flex justify-between space-x-2">
                                    <Field as="select" name="dia" required className="w-1/3 p-2 border rounded">
                                        <option value="">Día</option>
                                        {[...Array(31).keys()].map(day => (
                                            <option key={day + 1} value={day + 1}>{day + 1}</option>
                                        ))}
                                    </Field>
                                    <Field as="select" name="mes" required className="w-1/3 p-2 border rounded">
                                        <option value="">Mes</option>
                                        {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((month, index) => (
                                            <option key={index + 1} value={index + 1}>{month}</option>
                                        ))}
                                    </Field>
                                    <Field as="select" name="ano" required className="w-1/3 p-2 border rounded">
                                        <option value="">Año</option>
                                        {Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </Field>
                                </div>
                                {errors.dia && touched.dia && <div className="text-red-500 font-semibold py-2">{errors.dia}</div>}
                                {errors.mes && touched.mes && <div className="text-red-500 font-semibold">{errors.mes}</div>}
                                {errors.ano && touched.ano && <div className="text-red-500 font-semibold py-2">{errors.ano}</div>}
                            </label>
                            <label className="block mb-4">
                                Tipo de Administrador:
                                <Field as="select" name="tipoAdmin" required className="w-full mt-1 p-2 border rounded">
                                    <option value="basico">básico</option>
                                    <option value="superior">superior</option>
                                </Field>
                            </label>
                        </div>
                        <div className="w-full text-center mt-4">
                            <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 border-2 border-black">
                                {isSubmitting ? "Registrando..." : "Registrarse"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegistroAdmin;
