import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../../context/UsersContext';
import imgF from '../../assets/img/fondo-registro.jpg';
import * as Yup from 'yup';

const EditUser = () => {
    const navigate = useNavigate();
    const { updateUser, editUser } = useUsers();
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
                    const user = await editUser(id);
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
    }, [id, editUser]);

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
            await updateUser(id, values);
            console.log("Usuario actualizado");
            navigate('/admin/all-user'); // Redirige después de la actualización
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    const mError = "text-red-500 text-justify font-semibold text-xs";

    return (
        <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-fixed bg-no-repeat"
            style={{ backgroundImage: `url(${imgF})` }}>
            <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="max-w-3xl w-full p-8 bg-white bg-opacity-80 rounded-lg shadow-md flex flex-wrap">
                        <div className="flex-1 min-w-0 pr-4">
                            <label className="block mb-4 text-lg">
                                Nombre:
                                <Field type="text" name="nombre" required className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                                {errors.nombre && touched.nombre && <div className={`error ${mError}`}>{errors.nombre}</div>}
                            </label>
                            <label className="block mb-4 text-lg">
                                Correo:
                                <Field type="email" name="correo" required className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                                {errors.correo && touched.correo && <div className={`error ${mError}`}>{errors.correo}</div>}
                            </label>
                            <label className="block mb-4 text-lg">
                                DNI:
                                <Field type="text" name="dni" required className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                                {errors.dni && touched.dni && <div className={`error ${mError}`}>{errors.dni}</div>}
                            </label>
                            <label className="block mb-4 text-lg">
                                Celular:
                                <Field type="tel" name="celular" required className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                                {errors.celular && touched.celular && <div className={`error ${mError}`}>{errors.celular}</div>}
                            </label>
                        </div>
                        <div className="flex-1 min-w-0 pl-4">
                            <label className="block mb-4 text-lg">
                                Apellido:
                                <Field type="text" name="apellido" required className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                                {errors.apellido && touched.apellido && <div className={`error ${mError}`}>{errors.apellido}</div>}
                            </label>
                            <label className="block mb-4 text-lg">
                                Contraseña:
                                <Field type="password" name="contrasena" required className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
                                {errors.contrasena && touched.contrasena && <div className={`error ${mError}`}>{errors.contrasena}</div>}
                            </label>
                            <label className="block mb-4 text-lg">
                                Fecha de Nacimiento:
                                <div className="birth-date flex justify-between">
                                    <Field as="select" name="dia" required className="block w-32 mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
                                        <option value="">Día</option>
                                        {[...Array(31).keys()].map(day => (
                                            <option key={day + 1} value={day + 1}>{day + 1}</option>
                                        ))}
                                    </Field>
                                    <Field as="select" name="mes" required className="block w-32 mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
                                        <option value="">Mes</option>
                                        {[
                                            "01", "02", "03", "04", "05", "06",
                                            "07", "08", "09", "10", "11", "12"
                                        ].map((month, index) => (
                                            <option key={index + 1} value={index + 1}>{month}</option>
                                        ))}
                                    </Field>
                                    <Field as="select" name="ano" required className="block w-32 mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
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
                        <div className="w-full text-center mt-4">
                            <button type="submit" disabled={isSubmitting} className="py-2 px-6 text-lg font-semibold text-white bg-blue-500 rounded-md cursor-pointer border-2 border-black hover:bg-blue-600">
                                {isSubmitting ? "Actualizando..." : "Actualizar"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditUser;
