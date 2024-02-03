import { getConnection } from "./../database/database"

const getZapatillas = async (req, res) => {
    try{
        const conecction = await getConnection();
        const result = await conecction.query("SELECT modelozapatilla.id, marca.nombre AS 'Marca', modelozapatilla.Nombre, color, precio, imagen FROM modelozapatilla, marca")
        console.log(result)
        res.json(result)
    } catch(error){
        res.status(500)
        res.semd(error.message)
    }
}

const getZapatilla = async (req, res) => {
    try{
        const { id } = req.params
        const conecction = await getConnection();
        const result = await conecction.query("SELECT modelozapatilla.id, marca.nombre AS 'Marca', modelozapatilla.Nombre, color, precio FROM modelozapatilla, marca WHERE modelozapatilla.ID_MARCA = marca.ID and modelozapatilla.ID = ?", id)
        console.log(result)
        res.json(result)
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const addZapatilla = async (req,res) => {
    try {
        const {Nombre, Color, Precio, Imagen, ImagenBlob, ID_Marca} = req.body

        if(Nombre === undefined || Color === undefined || Precio === undefined || ID_Marca === undefined){
            res.status(400).json({message: "Mala respuesta, error al enviar"})
        }

        const zapatilla = {Nombre, Color, Precio, Imagen, ImagenBlob, ID_Marca}
        const conecction = await getConnection();
        await conecction.query("INSERT INTO modelozapatilla SET ?", zapatilla)
        res.json({ message: "Zapatilla agregada con exito" })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const deleteZapatilla = async (req, res) => {
    try{
        const { id } = req.params
        const conecction = await getConnection();
        const result = await conecction.query("DELETE FROM modelozapatilla WHERE ID = ?", id)
        console.log(result)
        res.json(result)
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const updateZapatilla = async (req, res) => {
    try{
        const { id } = req.params

        const zapatilla = {Nombre, Color, Precio, Imagen, ImagenBlob, ID_Marca} = req.body

        if(Nombre === undefined || Color === undefined || Precio === undefined || ID_Marca === undefined){
            res.status(400).json({message: "Mala respuesta, rellena los campos necesarios"})
        }

        const conecction = await getConnection();
        const result = await conecction.query("UPDATE modelozapatilla SET ? WHERE ID = ?", [zapatilla, id])
        console.log(result)
        res.json(result)
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

export const methods = {
    getZapatillas,
    getZapatilla,
    addZapatilla,
    deleteZapatilla,
    updateZapatilla
}