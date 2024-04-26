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
    // const  EMAIL_DANI = "duderzo@wellspring.com.ar";
    const  EMAIL_DANI = "alejandrogcandia@gmail.com";
    const {USER_EMAIL} = process.env;
    
 // Contenido HTML del correo
const emailContent = formatEmail(form);

// Envio de Mails al crear form
let messageFull = {
  from: USER_EMAIL,
  to: EMAIL_DANI,
  subject: "Formulario de Eventos",
  text: "Has creado un  evento !",
  html:emailContent,
}  
await sendEmail(messageFull)

if(filterMail(form,smaspons)){
  let htmlSmaspons = formatMail(form,smaspons,"MANTENIMIENTO")
  let message = {
            from: USER_EMAIL,
            to: EMAIL_DANI,
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
    to: EMAIL_DANI,
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
    to: EMAIL_DANI,
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
    to: EMAIL_DANI,
    subject: "Formulario de Eventos",
    text: "Has creado un  evento !",
    html:htmldyc,
  }; 
  await sendEmail(message)
}





 



}
module.exports = {emailHandler};