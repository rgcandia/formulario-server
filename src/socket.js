const {Server} = require('socket.io');
const {
  getUser,
  getFormsByEmail,
  createForm,
  deleteFormPending,
  updateForm,
  createUser,
  getForms,
  formatoNuevoTurno
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
  obtenerEventosCalendario,
  crearTurno
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
      const eventos = await obtenerEventosCalendario(id);
      console.log(eventos)
      socket.emit('apiCalendar',{listadoEventos:{
        data:eventos
      }})
      
     })


// evento para devolver todos los registros de eventos

    socket.on('getRegistros',async()=>{
  const forms = await getForms();
  if(forms){
    socket.emit('apiCalendar',{listadoRegistros:forms})
  }else{
    console.log("no hay formularios")
  }
});

// evento para confirmar el evento
socket.on('confirmEvent', async (form) => {
  try {
    // Obtenemos la lista de calendarios
    const calendarios = await listarCalendarios();
    
    // Buscamos el calendario con el summary que coincida con form.data.lugar
    const idCalendario = calendarios.find((el) => el.summary === form.data.home.lugar).id;
    const  nuevoEvento = formatoNuevoTurno(form);

    if (idCalendario) {
     const data = await crearTurno(idCalendario,nuevoEvento);
      

    } else {
      console.error("No se encontró un calendario con el lugar especificado:", form.data.lugar);
    }
  } catch (error) {
    console.error("Error al listar los calendarios:", error);
  }
});



    });

    return io;
  }
  
  module.exports = initialSocket;