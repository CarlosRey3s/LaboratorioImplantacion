const express = require('express'); 
const morgan = require('morgan'); 
const exphbs = require('express-handlebars'); // Necesario para utilizar el motor de plantillas handlebars 
const path = require('path'); 
const flash = require('connect-flash'); // Nos permite manejar mensajes en la sesion los cuales se guardan en memoria 
// y se borran luego de ser mostrados 

const session = require('express-session'); // Permite manejar sesiones, por ejemplo, para almacenar datos en la 
// memoria del servidor, tambien se puede almacenar en la base de datos. 
const MySQLStore = require('express-mysql-session')(session); 
// Inicializaciones 
const app = express(); 
 
require('dotenv').config() 
 
const { database } = require('./config/keys'); 
 
// Ajustes del servidor 
app.set('port', process.env.PORT || 4500); 
app.set('views', path.join(__dirname, 'views')); // Configuracion de la ruta donde se encuentran las vistas 
app.engine('.hbs', exphbs.engine({ 
    defaultLayout: 'main', // Configuracion del layout principal 
    layoutsDir: path.join(app.get('views'), 'layouts'), // Configuracion de la ruta de los layouts 
    partialsDir: path.join(app.get('views'), 'partials'), // Configuracion de vistas parciales 
    extname: '.hbs', // Configura la extensión que tendran los archivos HandleBars 
    helpers: require('./lib/handlebars') // Configuracion de funciones 
})); 
 
app.set('view engine', '.hbs'); // Configuracion para ejecutar el motor de plantillas 
 
// ===== MIDDLEWARES === 
app.use(session({ 
    secret: process.env.SESSION_KEY, // Esta es la clave secreta de la sesion 
    resave: false, // Para que no renueve la sesion 
    saveUninitialized: false, // se deja en false para que no vuelva a establecer la sesion 
    store: new MySQLStore(database) // Se indica donde se debe guardar la sesion 
})); 

/*app.use(session({
    secret: process.env.SESSION_KEY || 'claveSecretaPorDefecto', // Clave secreta para sesiones
    resave: false, // No vuelve a guardar la sesión si no hubo cambios
    saveUninitialized: false, // No guarda sesiones vacías
    store: new MySQLStore(database) // Almacena las sesiones en la base de datos MySQL
}));*/


app.use(flash()); 
app.use(morgan('dev')); // Configurando el middleware morgan para visualizar que esta llegando al servidor 
app.use(express.urlencoded({extended: false })); // Sirve para poder aceptardatos desde formularios 
 
// ==== VARIABLES GLOBALES ===== 
app.use((request, response, next) => { 
    // Haciendo global el uso de flash 
    app.locals.success = request.flash('success'); 
    app.locals.error = request.flash('error'); 
    next(); // permite continuar con la ejecucion del código 
 
}); 
 
// Configuracion de rutas 
app.use(require('./routes')); // Node automaticamente busca el index.js del modulo 
app.use('/estudiantes',require('./routes/estudiantes')); // Configuracion de ruta para estudiantes 
app.use('/carreras', require('./routes/carreras')); // Configuracion de ruta para carreras 
app.use('/materias', require('./routes/materias')); // Configuracion de ruta para materias 
app.use('/profesores', require('./routes/profesores')); // Configuracion de ruta para profesores 
app.use('/grupos', require('./routes/grupos')); // Configuracion de ruta para grupos 
// Archivos publicos (aca se coloca todo el código al cual el navegador puede acceder) 
app.use(express.static(path.join(__dirname, 'public'))); 
 
// Iniciar el servidor  
app.listen(app.get('port'), () => { 
    console.log('Servidor iniciado en el puerto: ', app.get('port')); 
}); 