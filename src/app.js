import express from 'express';
import morgan from 'morgan';
import zapatillasRoutes from './routes/zapatillas.routes';
import marcaRoutes from './routes/marca.routes';
// import multer from 'multer';

const app = express();

// Configuración de Multer para manejar la carga de archivos y formularios multipart
// const upload = multer({ dest: './static/img' });

// Settings
app.set('port', 80);

// Middlewares
app.use(morgan('dev'));

// Middleware para analizar los cuerpos de las solicitudes entrantes como JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Middleware para analizar los cuerpos de las solicitudes codificadas en URL


//

// Middleware para manejar formularios multipart
// app.use(upload.single('ImagenBlob'));

// Rutas
app.use('/api/zapatillas', zapatillasRoutes);
app.use('/api/marca', marcaRoutes);

export default app;
