const {sendEmail} =  require('./emailServices.js')
const emailHandler = async (form)=>{
    require('dotenv').config();
    const emailDani = "danielauderzo@hotmail.com";
    const emailNico ='mlatorre@wellspring.com.ar'
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
    
        <p><span class="strong-text">Email: </span> ${form.home.email}</p></br>
        <p><span class="strong-text">Nombre completo: </span> ${form.home.nombreCompleto}</p></br>
        <p><span class="strong-text">Nombre del Evento: </span> ${form.home.nombreEvento}</p></br>
        <p><span class="strong-text">Sector: ${form.home.sector}</span></p></br>
        <p><span class="strong-text">Fecha: </span> ${form.home.fecha}</p></br>
        <p><span class="strong-text">Hora: </span> ${form.home.hora}</p></br>
        <p><span class="strong-text">Lugar: </span>${form.home.lugar} </p></br>

    <p>RESTO DEL FORMULARIO DEPENDIENDO DE QUIEN LO RECIBE</p></br></br>
    <p><span class="strong-text">:</span> </p></br>
</body>
</html>
`;
 
let message = {
    from: USER_EMAIL,
    to: "alejandrogcandia@gmail.com",
    subject: "Formulario Evento",
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
  //  await sendEmail(messageDani);
    
    
}
module.exports = {emailHandler};