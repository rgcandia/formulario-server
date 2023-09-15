const {Server} = require('socket.io');
const {getFormsByEmail} = require('./services.js')
let io;


// Función para inicializar el SOCKET con el httpServer pasado por parámetro.
function initialSocket(httpServer) {
    io = new Server(httpServer, {
      cors: {
        origin: '*',
      }
    });
  
    // Pongo a escuchar eventos de conexión
    io.on('connection', (socket) => {
      console.log(`Connected: ${socket.id}`);
  
      socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
      });


         // Pongo a escuchar evento "join" para obtener los formularios por email
     socket.on('join', async (email) => {
      const forms = await getFormsByEmail(email);
      socket.emit('forms', forms);
    });

    });

   



    

    return io;
  }
  
  module.exports = initialSocket;