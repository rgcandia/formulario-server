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
const createForm = async (user,data) => {
    let form = await Form.create({
      email: user,
      data: data,
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


    // update Form
 const updateForm = async ({ id, form }) => {
  try {
    // Buscar el formulario por el id
    const existingForm = await Form.findByPk(id);

    if (!existingForm) {
      // Si no se encuentra el formulario con el id dado, retornar un error o lanzar una excepción
      throw new Error('Formulario no encontrado');
    }

    // Actualizar los atributos del formulario
    existingForm.pending = false;
    existingForm.data = form;

    // Guardar los cambios en la base de datos
    await existingForm.save();

    // Retornar el formulario actualizado
    return existingForm.email;
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante el proceso
    console.error('Error al actualizar el formulario:', error.message);
    throw error;
  }
};






//  SERVICIOS PARA EL EMAIL

const arrayObjetos = [
  {
    id:'limpiezaInicio',
    value:'Limpieza antes de evento'
  },
  {
    id:'limpiezaFinal',
    value:'Limpieza final de Evento'
  },
  {
    id:'cantidadPadres',
    value:'Padres (cantidad)'
  },{
    id:'cantidadAlumnos',
    value:'Alumnos (cantidad)'
  },
  {
    id: 'fondoEscenario',
    value: 'Fondo de escenario Blanco'
  },
  {
    id: 'escudoFondo',
    value: 'Escudo para fondo'
  },
  {
    id: 'mesas',
    value: 'Mesas (cantidad)'
  },
  {
    id: 'pupitres',
    value: 'Pupitres (cantidad)'
  },
  {
    id: 'mantelBlanco',
    value: 'Mantel Blanco (cantidad)'
  },
  {
    id: 'mantelAzul',
    value: 'Mantel Azul (cantidad)'
  },
  {
    id: 'sillas',
    value: 'Sillas (cantidad)'
  },
  {
    id: 'gradas',
    value: 'Gradas (cantidad)'
  },
  {
    id: 'microfonoInalambrico',
    value: 'Micrófono inalámbrico (cantidad)'
  },
  {
    id: 'pieMicrofono',
    value: 'Pie de micrófono'
  },
  {
    id: 'lucesYPulsadores',
    value: 'Luces y pulsadores (cantidad)'
  },
  {
    id: 'alargues',
    value: 'Alargues (cantidad)'
  },
  {
    id: 'proyectorA',
    value: 'Proyector sobre escenario'
  },
  {
    id: 'proyectorB',
    value: 'Proyector Arriba'
  },
  {
    id: 'puntero',
    value: 'Puntero'
  },
  {
    id: 'pantalla',
    value: 'Pantalla'
  },
  {
    id: 'computadora',
    value: 'Computadora'
  },
  {
    id: 'manteles',
    value: 'Manteles (cantidad)'
  },
  {
    id: 'observacionesSillas',
    value: 'Observaciones disposición de sillas'
  },
  {
    id: 'tarimas',
    value: 'Tarimas (cantidad)'
  },
  {
    id: 'escaleras',
    value: 'Escaleras (cantidad)'
  },
  {
    id: 'fondoPrensa',
    value: 'Fondo de prensa'
  },
  {
    id: 'aireAcondicionado',
    value: 'Aire Acondicionado'
  },
  {
    id: 'cafe',
    value: 'Café'
  },
  {
    id: 'aguaCaliente',
    value: 'Agua Caliente'
  },
  {
    id: 'te',
    value: 'Té'
  },
  {
    id: 'jarraAguaHielo',
    value: 'Jarra con agua y hielo'
  },
  {
    id: 'azucar',
    value: 'Azucar'
  },
  {
    id: 'edulcorante',
    value: 'Edulcorante'
  },
  {
    id: 'batidores',
    value: 'Batidores'
  },
  {
    id: 'servilleta',
    value: 'Servilletas'
  },
  {
    id: 'vasosPlasticos',
    value: 'Vasos plásticos "frio" (cantidad)'
  },
  {
    id: 'vasosTelgopor',
    value: 'Vasos vidrio (cantidad)'
  },
  {
    id: 'musica',
    value: 'Múisca'
  },
  {
    id: 'video',
    value: 'Video o presentación'
  },
  {
    id: 'observacionesComunicaciones',
    value: 'Observaciones Comunicaciones'
  },
  {
    id: 'observacionesCocina',
    value: 'Observaciones Cocina'
  },
  {
    id: 'observacionesCompras',
    value: 'Observaciones Compras'
  },
  {
    id: 'observacionesMantenimiento',
    value: 'Observaciones Mantenimiento'
  },
  {
    id: 'parlante',
    value: 'Parlante'
  },
  {
    id: 'consola',
    value: 'Consola'
  },
  {
    id: 'zapatillas',
    value: 'Zapatillas (cantidad)'
  },
  {
    id: 'mesaLarga',
    value: 'Mesa larga (cantidad)'
  },
  {
    id: 'sombrillas',
    value: 'Sombrillas (cantidad)'
  },
  {
    id: 'observacionesDisposicionMesas',
    value: 'Observaciones de la disposición de las mesas'
  },
  {
    id: 'podio',
    value: 'Podio'
  },
  {
    id: 'lugarEvento',
    value: 'Lugar del Evento'
  },
  {
    id: 'lucesYPulsadores',
    value: 'Luces y pulsadores (cantidad)'
  },
  {
    id: 'tortas',
    value: 'Tortas (cantidad)'
  },
  {
    id: 'medialunas',
    value: 'Medialunas (cantidad)'
  },
  {
    id: 'sandwichesMiga',
    value: 'Sandwiches de miga (cantidad)'
  },
  {
    id: 'lecheChocolatada',
    value: 'Leche chocolatada'
  },
  {
    id: 'gaseosas',
    value: 'Gaseosas'
  }
]

// function convertirStringAFechaHora(stringFecha) {
//   try {
//     // Eliminar el carácter 'Z' al final del string
//     const fechaSinZ = stringFecha.slice(0, -1);
//     // Crear un objeto Date a partir del string
//     const fechaHora = new Date(fechaSinZ);
//     // Crear un nuevo objeto Date con la diferencia del huso horario local
//     const fechaHoraLocal = new Date(fechaHora.getTime() - fechaHora.getTimezoneOffset() * 60000);
//     // Devolver la fecha y hora en un formato legible
//     return fechaHoraLocal.toLocaleString('es-ES', { timeZone: 'UTC' });
//   } catch (error) {
//     // En caso de que el string no tenga un formato válido
//     return "Formato de fecha y hora no válido";
//   }
// }


//   // Funcion para obtener del objeto lugar las propiedades.
//  function convertirLugar(lugar){
 
//     let result = "";
//     for(const propiedad in lugar){
//         if(lugar[propiedad]){
//             result += ` ${propiedad} `
            
//         }
//     }

//     return result;
//  } 

 function customRender (value){
 
  let valor = value;
  arrayObjetos.map((e)=>{
   if(e.id===value){
     valor = e.value;
   }
  })

  return valor;

}


//servicio renderiza valor de la propiedad.
function RenderObjectProperties(objeto) {
  function render(objeto) {
    return Object.keys(objeto)
      .map((propiedad, index) => {
        if (
          typeof objeto[propiedad] === 'object' ||
          propiedad === 'padres' ||
          propiedad === 'alumnos' ||
          propiedad === 'sobreEscenario' ||
          propiedad === 'bajoEscenario'
        ) {
          return ''; // Cambia esto para evitar que se muestren comas
        } else {
          const valor = objeto[propiedad];
          const valorRenderizado =
            typeof valor === 'boolean' ? valor.toString() : valor;
          return valor === false
            ? '' // Cambia esto para evitar que se muestren comas
            : `<p><strong>${customRender(propiedad)} :</strong> &nbsp; ${valorRenderizado}</p>`;
        }
      })
      .join(''); // Usa join para unir los elementos en un solo string, sin comas
  }
  // function render(objeto) {
  //   return `<div>${Object.keys(objeto)
  //     .map((propiedad, index) => {
  //       if (
  //         typeof objeto[propiedad] === 'object' ||
  //         propiedad === 'padres' ||
  //         propiedad === 'alumnos' ||
  //         propiedad === 'sobreEscenario' ||
  //         propiedad === 'bajoEscenario'
  //       ) {
  //         return'';
  //       } else {
  //         const valor = objeto[propiedad];
  //         const valorRenderizado =
  //           typeof valor === 'boolean' ? valor.toString() : valor;
  //         return valor === false
  //           ? ''
  //           : `<p><strong>${customRender(propiedad)} :</strong> &nbsp; ${valorRenderizado}</p>`;
  //       }
  //     })}</div>`;
  // }
 let nombre = objeto.home.lugar;
  let seccion = nombre.toLowerCase();
  let html = `<div>
     <h3> Sección ${objeto.home.lugar}</h3>
     ${render(objeto[seccion])}
     ${
       objeto[seccion].sobreEscenario &&
       `<div>
         <p ><strong>DATOS SOBRE ESCENARIO</strong></p>
         ${render(objeto[seccion].dataSobreEscenario)}
       </div>`
     }
     ${
       objeto[seccion].bajoEscenario &&
       `<div>
         <p><strong>DATOS BAJO ESCENARIO</strong></p>
         ${render(objeto[seccion].dataBajoEscenario)}
       </div>`
     }
  </div>`;
  return html;
}



//servicio para renderizar los objetos en las secciones.


// servicio para el correo. Formatea el html del e-mail

const formatEmail = (form)=>{
 
   
  let html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Datos del Formulario</title>
</head>
<body>
        <h1>Datos del formulario</h1>
        <p><strong >Email: </strong> ${form.home.email}</p></br>
        <p><strong >Nombre completo: </strong> ${form.home.nombreCompleto}</p></br>
        <p><strong >Nombre del Evento: </strong> ${form.home.nombreEvento}</p></br>
        <p><strong >Sector: ${form.home.sector}</strong></p></br>
        <p><strong >Fecha: </strong> ${form.home.fecha}</p></br>
        <p><strong >Hora: </strong> ${form.home.hora}</p></br>
        <p><strong >Lugar: </strong>${form.home.lugar} </p></br>

        ${     
          RenderObjectProperties(form)
        }
</body>
</html>
`
  return html;
}

  // exports

  module.exports = {getFormsByEmail,createForm,deleteFormPending,updateForm,formatEmail}