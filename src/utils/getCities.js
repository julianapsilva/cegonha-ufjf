import api from "../services/api";

const getCities = async (estado) => {
    const {data} = await api.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
        return data
}

export default getCities