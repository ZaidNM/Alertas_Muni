import axios from 'axios';

export const captAdminsRequest = async () => {
    return await axios.get('http://localhost:4000/capt/admin')
}

export const captUsersRequest = async () => {
    return await axios.get('http://localhost:4000/capt/users')
}

export const captNoticiasRequest = async () => {
    return await axios.get('http://localhost:4000/capt/noticias')
}

export const captReportesRequest = async (slug) => {
    return await axios.get(`http://localhost:4000/capt/reportes/${slug}`)
}

export const captDestacadosRequest = async () => {
    return await axios.get('http://localhost:4000/capt/destacados')
}

export const captPreguntasRequest = async () => {
    return await axios.get('http://localhost:4000/capt/preguntas')
}

export const captSliderRequest = async (section) => {
    return await axios.get(`http://localhost:4000/capt/slider/${section}`)
}

// FIX MAPA ADMIN: Llama a GET /capt/reportes/mapa del backend
// ¿Para qué? Trae todos los reportes con latitud/longitud para pintarlos como Markers en el mapa del admin.
// Sin esto, el frontend solo podía pedir reportes por distrito (/capt/reportes/:slug) y no había vista global.
export const captReportesMapaRequest = async () => {
    return await axios.get('http://localhost:4000/capt/reportes/mapa')
}

// FIX FORMULARIO: Endpoints para formulario con geolocalización del dispositivo
export const getMunicipalidadesRequest = async () => axios.get('http://localhost:4000/reportes/municipalidades')
export const getCategoriasRequest = async () => axios.get('http://localhost:4000/reportes/categorias')
export const createReporteRequest = async (data) => axios.post('http://localhost:4000/reportes', data)