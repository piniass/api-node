import { getConnection } from "./../database/database"

const getZapatillasMarca = async (req, res) => {
    try{
        const { nombre } = req.params
        const conecction = await getConnection();
        const result = await conecction.query("SELECT modelozapatilla.id, marcazapa.nombre AS 'Marca', modelozapatilla.Nombre, color, precio FROM modelozapatilla, marcazapa WHERE modelozapatilla.ID_MARCA = marcazapa.ID and marcazapa.nombre = ?", nombre)
        console.log(result)
        res.json(result)
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

export const methods = {
    getZapatillasMarca
}