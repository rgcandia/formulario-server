const {Server} = require('socket.io');
const {
  getFormsByEmail,
  createForm,
  deleteFormPending,
  updateForm,
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
  socket.on('createForm', async ({email}) => {
    let form = await createForm(email);
    const forms = await getFormsByEmail(email);
    io.emit(email, {forms,alertCreateForm:true});    
  });

  // Escucho evento deleteFormPending
  socket.on('deleteFormPending',async({id,user})=>{
    await deleteFormPending(id);
     const forms = await getFormsByEmail(user)
     io.emit(user, {forms});   
 })

    //config updateForm
    socket.on('updateForm',async ({id,form})=>{
      const email = await updateForm({id,form});
      const forms = await getFormsByEmail(email)
      await emailHandler(form);
      io.emit(email, {forms});
     
    })




    });

    return io;
  }
  
  module.exports = initialSocket;