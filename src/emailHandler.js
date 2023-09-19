const {sendEmail} =  require('./emailServices.js')
const emailHandler = async (form)=>{
    require('dotenv').config();
    const emailDani = "danielauderzo@hotmail.com";
    const {USER_EMAIL} = process.env;
 // Contenido HTML del correo
const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Datos del Formulario</title>
</head>
<body>
    
        <p><span class="strong-text">Email:</span> ${form.home.email}</p></br>
        <p><span class="strong-text">Nombre completo:</span> ${form.home.nombreCompleto}</p></br>
        <p><span class="strong-text">Nombre del Evento:</span> ${form.home.nombreEvento}</p></br>
        <p><span class="strong-text">Sector: ${form.home.sector}</span></p></br>
        <p><span class="strong-text">Fecha:</span> ${form.home.fecha}</p></br>
        <p><span class="strong-text">Hora:</span> ${form.home.hora}</p></br>
    

    <p>RESTO DEL FORMULARIO DEPENDIENDO DE QUIEN LO RECIBE</p>
</body>
</html>
`;
 
let message = {
    from: USER_EMAIL,
    to: "alejandrogcandia@gmail.com",
    subject: "Formulario Evento",
    text: "Formulario enviado desde el back",
    html:emailContent,
  }; 

  let messageDani = {
    from: USER_EMAIL,
    to: emailDani,
    subject: "Formulario Evento",
    text: "Formulario enviado desde el back",
    html:emailContent,
  };
  
   await sendEmail(message);
   await sendEmail(messageDani);
    
    
}
module.exports = {emailHandler};