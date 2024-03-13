const {sendEmail} =  require('./emailServices.js')
const {formatEmail,
  filterTaloba,
  formatTaloba
} =  require('./services.js')
const emailHandler = async (form)=>{
    require('dotenv').config();
    const emailDani = "danielauderzo@hotmail.com";
   
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
  
  //  await sendEmail(message);
  

  // Filtrado para Taloba de envio de mail

 if(filterTaloba(form)){
  let htmlTaloba = formatTaloba(form);
  let message = {
    from: USER_EMAIL,
    to: "alejandrogcandia@gmail.com",
    subject: "Formulario de Eventos",
    text: "Has creado un  evento !",
    html:htmlTaloba,
  }; 
  await sendEmail(message)
 }

}
module.exports = {emailHandler};