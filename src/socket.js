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
const {listarCalendarios,crearCalendario,compartirCalendario,eliminarCalendario} = require('./api_google/api.js');

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
        socket.emit("API",{calendarios:listaCalendarios})

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


     socket.on('apiCalendar',async ()=>{
      
      try {
        // se obtiene la lista de calendarios
        let listaCalendarios = await listarCalendarios()
        // se emite un evento con la informacion de los calendarios
        socket.emit("API",{calendarios:listaCalendarios})
    
      
        
      } catch (error) {
        console.log(error)
      }

     



     }) 


//   // Pongo a escuchar evento "createForm" para crear un formulario para el email pasado por parámetro
//   socket.on('createForm', async ({email,data}) => {
//     const  form = await createForm(email,data);
//     const forms = await getFormsByEmail(email);
//     io.emit(email, {forms,updateForm:true});  
//     await emailHandler(data);



//   });

//   // Escucho evento deleteFormPending
//   socket.on('deleteFormPending',async({id,user})=>{
//     await deleteFormPending(id);
//      const forms = await getFormsByEmail(user)
//      io.emit(user, {forms,deleteForm:true});   
//  })

//     //config updateForm
//     socket.on('updateForm',async ({id,form})=>{
//       const email = await updateForm({id,form});
//       const forms = await getFormsByEmail(email)
//       await emailHandler(form);
//       io.emit(email, {forms,updateForm:true});
     
//     })

//  // crear usuarios
//   socket.on('createUser', async ({email,name})=>{
//     const userCreado =  await createUser(email,name);
//     // enviar  a los admin la lista de usuarios 
//     // y 
    
//   });

    });

    return io;
  }
  
  module.exports = initialSocket;