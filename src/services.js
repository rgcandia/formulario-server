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

//Crea formulario 
const createForm = async (user) => {
    let form = await Form.create({
      email: user,
    });
    return form;
    
  };

// Elimina un formulario pendiente
const deleteFormPending =  async (id)=>{
    let value = false;
     Form.destroy({
      where: {
        id
      }
    })
    .then(() => {
      console.log('Formulario eliminado exitosamente');
    })
    .catch(err => {
      console.error('Error al intentar eliminar el formulario:', err);
    });
    
    
    
    }


  // exports

  module.exports = {getFormsByEmail,createForm,deleteFormPending}