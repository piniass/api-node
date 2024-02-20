import { getConnection } from "./../database/database"
// const fs = require('node:fs');
// const multer = require('multer');

// const upload = multer({ dest: './static/img' });


const getZapatillas = async (req, res) => {
    try{
        const conecction = await getConnection();
        // const result = await conecction.query("SELECT modelozapatilla.id, marcazapa.nombre AS 'Marca', modelozapatilla.Nombre, color, precio, imagen, imagenblob FROM modelozapatilla, marcazapa WHERE modelozapatilla.ID_MARCA = marcazapa.ID and modelozapatilla.ID ORDER BY modelozapatilla.id")
        const result = await conecction.query("SELECT modelozapatilla.id, marca.nombre AS 'Marca', modelozapatilla.Nombre, color, precio, imagen, imagenblob FROM modelozapatilla, marca WHERE modelozapatilla.ID_MARCA = marca.ID and modelozapatilla.ID ORDER BY modelozapatilla.id")

        console.log(result)
        res.json(result)
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const getZapatilla = async (req, res) => {
    try{
        const { id } = req.params
        const conecction = await getConnection();
        const result = await conecction.query("SELECT modelozapatilla.id, marcazapa.nombre AS 'Marca', modelozapatilla.Nombre, color, precio FROM modelozapatilla, marcazapaarca WHERE modelozapatilla.ID_MARCA = marcazapa.ID and modelozapatilla.ID = ?", id)
        console.log(result)
        res.json(result)
    } catch(error){
        res.status(500)
        res.send(error.message)
    }
}

const addZapatilla = async (req, res) => {
    console.log("Entro al post");

    try {
        console.log("Entro al post");
        const { Nombre, Color, Precio, ID_Marca } = req.body;
        //Esto en docker no va a funcionar, comentar esta linea de aquí debajo cuando vaya a subirlo a Docker
        const Imagen = req.file ? saveImage(req.file) : null;
        console.log(req.body)
        console.log(Imagen)
        if (Nombre === undefined || Color === undefined || Precio === undefined || ID_Marca === undefined) {
            return res.status(400).json({ message: "Mala respuesta, rellena los campos necesarios" });
        }

        const ImagenBlob = req.file ? req.file.path : null;

        const zapatilla = { Nombre, Color, Precio,Imagen, ImagenBlob, ID_Marca };
        const connection = await getConnection();
        await connection.query("INSERT INTO modelozapatilla SET ?", zapatilla);
        res.json({ message: "Zapatilla agregada con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};


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
    try {
        const { Nombre, Color, Precio, ID_Marca } = req.body;
        const Imagen = req.file ? saveImage(req.file) : null;
        const ImagenBlob = req.file ? req.file.path : null;
        console.log(req.query)
        const { id } = req.params;
        console.log(req.body)
        //Esto en docker no va a funcionar, comentar esta linea de aquí debajo cuando vaya a subirlo a Docker
        

        if (Nombre === undefined || Color === undefined || Precio === undefined || ID_Marca === undefined) {
            return res.status(400).json({ message: "Mala respuesta, rellena los campos necesarios" });
        }


        const zapatilla = { Nombre, Color, Precio, Imagen, ImagenBlob, ID_Marca };
        const connection = await getConnection();
        const result = await connection.query("UPDATE modelozapatilla SET ? WHERE ID = ?", [zapatilla, id]);
        console.log("Actualizado");
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
}


const getZapatillasSorted = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT modelozapatilla.id, marcazapa.nombre AS 'Marca', modelozapatilla.Nombre, color, precio, imagen FROM modelozapatilla, marca WHERE modelozapatilla.ID_MARCA = marcazapa.ID ORDER BY precio DESC")
        console.log(result)
        res.json(result)
    } catch(error){
        res.status(500)
        res.semd(error.message)
    }
}

function saveImage(file){
    const newPath = `./static/img/${file.originalname}`
    // fs.renameSync(file.path, newPath)
    return newPath
      
}

// Ruta para manejar la subida de archivos
//  const uploadZapatillaImage = async (req, res, next) => {
//     try {
//         upload.single('ImagenBlob')(req, res, function (err) {
//             if (err instanceof multer.MulterError) {
//                 return res.status(500).json({ message: "Error al subir la imagen" });
//             } else if (err) {
//                 return res.status(500).json({ message: "Error al procesar la solicitud" });
//             }
//             next();
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error.message);
//     }
// };

export const methods = {
    getZapatillas,
    getZapatilla,
    addZapatilla,
    deleteZapatilla,
    updateZapatilla,
    getZapatillasSorted
    // uploadZapatillaImage
}