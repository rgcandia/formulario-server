const {Server} = require('socket.io');
const {
  getUser,
  getFormsByEmail,
  createForm,
  deleteForm,
  updateForm,
  createUser,
  getForms,
  formatoNuevoTurno,
  confirmarEstadoForm,
  obtenerFormulariosPorLugarYEstado
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
  crearTurno,
  eliminarTodosLosEventos
  
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
      // forms.length===0?io.emit(user.email,{dataForms:forms}):io.emit(user.email,{dataForms:forms[0].dataValues})
      io.emit(user.email,{dataForms:forms}) 
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

// listener de evento para eliminar todos los eventos de un calendario
socket.on('eliminarEventos',async (id)=>{
  const seElimino = await eliminarTodosLosEventos(id);
  if(seElimino){
   // eventos
    const forms = await getForms();
    // calendarios
    const calendarios =  await listarCalendarios();
    const calendario = calendarios.find(e=>e.id===id).summary;
    const nombreCalendario = calendario==="Campo de Deporte"?"CampoDeporte":calendario;
    // Crear un conjunto para almacenar correos electrónicos únicos
    const emailsSet = new Set();

            // Filtrar y eliminar los formularios que coinciden con el lugar del calendario
            const formsAEliminar = forms.filter(form => form.data.home.lugar === nombreCalendario);

            for (const form of formsAEliminar) {
                emailsSet.add(form.email);
                deleteForm(form.id);
            }

            console.log(`Se eliminaron ${formsAEliminar.length} formularios del lugar "${nombreCalendario}".`);
            
      // Convertir el conjunto a un array
      const emailsUnicos = Array.from(emailsSet);
     
       const newForms = await getForms();
       socket.emit('apiCalendar',{listadoRegistros:newForms})
       socket.emit('apiCalendar',{alertDeleteEventsOk:true})
      // enviar Alertas y formularios
       for (const email of emailsUnicos){
        const formsByEmail = getFormsByEmail(email);
        io.emit(email, {dataForms:formsByEmail}); // Enviar el evento al socket suscrito al evento con el nombre del email
 
       }
  }else{
console.log("no se pudo eliminar por alguna razón")
  }
});

// evento para confirmar el evento
socket.on('confirmEvent', async (form) => {
  try {
    // Obtenemos la lista de calendarios
    const calendarios = await listarCalendarios();
    // en caso de el lugar ser CampoDeporte se cambia
    const lugar = form.data.home.lugar==="CampoDeporte"?"Campo de Deporte":form.data.home.lugar;
    // Buscamos el calendario con el summary que coincida con form.data.home.lugar
    const idCalendario = calendarios.find((el) => el.summary === lugar).id;
    const  nuevoEvento = formatoNuevoTurno(form);
    
    if (idCalendario) {
     const data = await crearTurno(idCalendario,nuevoEvento);
      if(data){
        // se tiene que cambiar a confirmado el estado del evento
        const estado = await confirmarEstadoForm(form.id);
        const forms = await getFormsByEmail(form.email);
        const allForms = await getForms();
        // Se debe enviar las confirmaciones de que se realizo correctamente

        if(estado){
          // confirmado
          socket.emit(form.email,{dataForms:forms});
          socket.emit('apiCalendar',{listadoRegistros:forms});
          socket.emit(form.email,{alertConfirmEvent:true});
        }else{
          // error al cambiar estado
        }

      
      }else{
        // se debe mandar el error ocurrido
      }


    } else {
      console.error("No se encontró un calendario con el lugar especificado:", form.data.home.lugar);
    }
  } catch (error) {
    console.error("Error al listar los calendarios:", error);
  }
});

// evento para obtener los formularios del calendario seleccionado, ya sea  pendiente o confirmado
socket.on('getFormsCalendarioSeleccionado', async (lugar)=>{
  const forms = await obtenerFormulariosPorLugarYEstado(lugar);
  socket.emit('apiCalendar',{formsCalendarioSeleccionado:forms});
});

 // evento para crear usuario
 socket.on('createUser', async (data) => {
  try {
    // Verifica si el usuario ya existe en la base de datos
    let user = await getUser(data.email);

    if (!user) {
      // Si el usuario no existe, crea uno nuevo
      user = await createUser(data.email, data.name);
      console.log('Usuario creado:', user);
    } else {
      console.log('El usuario ya existe:', user);
    }

    // Envía una respuesta al cliente si es necesario
    socket.emit('Alerts', { alertUserCreated:true});

  } catch (error) {
    console.error('Error al crear el usuario:', error);

    // Envía una respuesta al cliente si es necesario
    socket.emit('Alerts', { alertUserNotCreated:true });
  }
});

    });

    return io;
  }
  
  module.exports = initialSocket;