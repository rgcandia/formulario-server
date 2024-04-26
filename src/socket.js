const {Server} = require('socket.io');
const {
  getFormsByEmail,
  createForm,
  deleteFormPending,
  updateForm,
  createUser
} = require('./services.js')
const {emailHandler} = require('./emailHandler.js')
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



  // Pongo a escuchar evento "createForm" para crear un formulario para el email pasado por parámetro
  socket.on('createForm', async ({email,data}) => {
    const  form = await createForm(email,data);
    const forms = await getFormsByEmail(email);
    io.emit(email, {forms,updateForm:true});  
    await emailHandler(data);



  });

  // Escucho evento deleteFormPending
  socket.on('deleteFormPending',async({id,user})=>{
    await deleteFormPending(id);
     const forms = await getFormsByEmail(user)
     io.emit(user, {forms,deleteForm:true});   
 })

    //config updateForm
    socket.on('updateForm',async ({id,form})=>{
      const email = await updateForm({id,form});
      const forms = await getFormsByEmail(email)
      await emailHandler(form);
      io.emit(email, {forms,updateForm:true});
     
    })

 // crear usuarios
  socket.on('createUser', async ({email,name})=>{
    const userCreado =  await createUser(email,name);
    // enviar  a los admin la lista de usuarios 
    // y 
    
  });

    });

    return io;
  }
  
  module.exports = initialSocket;