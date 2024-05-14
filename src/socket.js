const {Server} = require('socket.io');
const {
  getUser,
  getFormsByEmail,
  createForm,
  deleteFormPending,
  updateForm,
  createUser
} = require('./services.js')

// const {authorize,listCalendars} = require('./apiCalendar.js');
const {emailHandler} = require('./emailHandler.js')
let io;
// importo funciones de calendar
const {
  listarCalendarios,
  crearCalendario,
  compartirCalendario,
  eliminarCalendario,
  obtenerEventosCalendario
} = require('./api_google/api.js');

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
      // inicia sesion un usuario
      // obtener datos del usuario
        const user = await getUser(email);
        // obtener los formularios del usuario
        const forms = await getFormsByEmail(email);
      // obtener la lista de calendarios
        const listaCalendarios = await listarCalendarios()
    
    // mandar los datos a eventos de socket
  
        user.length===0?console.log("no hay usuario"): socket.emit(email,{dataUser:user[0].dataValues})
        socket.emit(email,{dataForms:forms})
          // se emite un evento con la informacion de los calendarios
        socket.emit("apiCalendar",{calendarios:listaCalendarios})

    });




    // Evento creación de formulario

    socket.on('createForm',async ({user,data})=>{
       // realizar comprobaciones    
       // creo formulario y lo dejo pendiente si cumplió con los requisitos
       const form = await createForm(user,data);
       // obtengo todos los fosm de un mail especifico
       const forms = await getFormsByEmail(user.email);
      // mando evento de form al usuario
      forms.length===0?socket.emit(user.email,{dataForms:forms}):socket.emit(user.email,{dataForms:forms[0].dataValues})
       // mando alerta de que se creó correctamente el form
       socket.emit(user.email,{alertCreateForm:true})
    })


     socket.on('apiCalendar',async ({compartir,getCalendar})=>{
      
      try {
        // Compartir calendario
        if(compartir){
        
         const seCompartio = await compartirCalendario(compartir.id,compartir.email,'reader')
         socket.emit('Alerts',{compartido:seCompartio}) 
        }
       if(getCalendar){
 // se obtiene la lista de calendarios
 let listaCalendarios = await listarCalendarios()
 // se emite un evento con la informacion de los calendarios
 socket.emit("apiCalendar",{calendarios:listaCalendarios})

       }
      } catch (error) {
        console.log(error)
      }

     }) 


     socket.on('getEvents',async(id)=>{
      // recibo la petición para ver el calendario dependiendo del id
      // Se debe obtener los evento del calendario correspondiente
      const eventos = obtenerEventosCalendario(id);
      socket.emit('apiCalendar',{listadoEventos:{
        data:eventos
      }})
      

     })





    });

    return io;
  }
  
  module.exports = initialSocket;