const transport  =  require('./mailer.js')
//ejemplo del msj
// var message = {
//     from: "sender@server.com",
//     to: "receiver@sender.com",
//     subject: "Message title",
//     text: "Plaintext version of the message",
//     html: "<p>HTML version of the message</p>"
//   }; 

const sendEmail = async (message)=>{
await transport.sendMail(message)
}

module.exports = {sendEmail};