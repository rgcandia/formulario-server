const { Form} = require('./db.js');


//  devolver Forms
async function getFormsByEmail(email) {
    try {
      const forms = await Form.findAll({
        where: {
          email: email,
        },
      });
      return forms;
    } catch (error) {
      console.error('Error al buscar los formularios por email:', error);
      
    }
  }

//Crea formulario pendiente con modelo.
const createForm = async (user, model) => {
    let form = await Form.create({
      email: user,
      model,
    });
    return form;
    
  };

  // exports

  module.exports = {getFormsByEmail,createForm}