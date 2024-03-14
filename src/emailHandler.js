const {sendEmail} =  require('./emailServices.js')
const {formatEmail,
  formatMail,
  filterMail,
  smaspons,
  sGonzalez,
  dyc,
  taloba,

} =  require('./services.js')
const emailHandler = async (form)=>{
    require('dotenv').config();
    const  USER_EMAIL = "danielauderzo@hotmail.com";
   
    // const {USER_EMAIL} = process.env;
    
 // Contenido HTML del correo
const emailContent = formatEmail(form);
let messageFull = {
  from: USER_EMAIL,
  to: "alejandrogcandia@gmail.com",
  subject: "Formulario de Eventos",
  text: "Has creado un  evento !",
  html:emailContent,
}  
await sendEmail(messageFull)


// SE PRUEBA 
if(filterMail(form,smaspons)){
  let htmlSmaspons = formatMail(form,smaspons,"MANTENIMIENTO")
  let message = {
            from: USER_EMAIL,
            to: "alejandrogcandia@gmail.com",
            subject: "Formulario de Eventos",
            text: "Has creado un  evento !",
            html:htmlSmaspons,
          }; 
          await sendEmail(message)
}

if(filterMail(form,sGonzalez)){
  let htmlSgonzalez = formatMail(form,sGonzalez,"Silvina Gonzalez")
  let message = {
    from: USER_EMAIL,
    to: "alejandrogcandia@gmail.com",
    subject: "Formulario de Eventos",
    text: "Has creado un  evento !",
    html:htmlSgonzalez,
  }; 
  await sendEmail(message)
}

if(filterMail(form,taloba)){
  let htmlTaloba = formatMail(form,taloba,"TALOBA SRL")
  let message = {
    from: USER_EMAIL,
    to: "alejandrogcandia@gmail.com",
    subject: "Formulario de Eventos",
    text: "Has creado un  evento !",
    html:htmlTaloba,
  }; 
  await sendEmail(message)
}

if(filterMail(form,dyc)){
  let htmldyc = formatMail(form,dyc,"DISEÑO y COMUNICACIÓN")
  let message = {
    from: USER_EMAIL,
    to: "alejandrogcandia@gmail.com",
    subject: "Formulario de Eventos",
    text: "Has creado un  evento !",
    html:htmldyc,
  }; 
  await sendEmail(message)
}





 



}
module.exports = {emailHandler};