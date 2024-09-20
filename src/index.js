const express = require('express')

//Inicializaciones
const app = express();

// ajustes del Servidor
app.set('port', process.env.PORT || 4000);

//Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Sevidor iniciado en el puerto:', app.get('port'));
});