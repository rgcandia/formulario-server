const {sendEmail} =  require('./emailServices.js')
const {formatEmail} =  require('./services.js')
const emailHandler = async (form)=>{
    require('dotenv').config();
    const emailDani = "danielauderzo@hotmail.com";
    const emailNico ='mlatorre@wellspring.com.ar'
    const {USER_EMAIL} = process.env;
    
 // Contenido HTML del correo
const emailContent = formatEmail(form);
 
let message = {
    from: USER_EMAIL,
    to: "alejandrogcandia@gmail.com",
    subject: "Formulario de Eventos",
    text: "Has creado un  evento !",
    html:emailContent,
  }; 

  let messageNico = {
    from: USER_EMAIL,
    to: emailNico,
    subject: "Formulario de Evento",
    text: "Has programado un evento!",
    html:emailContent,
  };
  
   await sendEmail(message);
  //  await sendEmail(messageNico);
    
    
}
module.exports = {emailHandler};