const { Form , User} = require('./db.js');




//  INICIO DE SESIÓN 
    // Obtener datos del usuario  que inició sesión
    // un usuario siempre tiene que tener un nombre y un correo


 // obtiene  los datos del usuario correspondiente
 const getUser = async (email)=>{
  try {
    const user = await User.findAll({
      where: {
        email: email,
      },
    });
    
    return user;
  } catch (error) {
    console.error('Error al buscar el usuario', error);
    
  }
 } 


//Crea formulario  pendiente
const createForm = async (user,data) => {
  let form = await Form.create({
  sector: data.home.sector,
  nameEvento : data.home.nombreEvento,
  nameUser: user.name,
  email: user.email,

  data: data,
  estado : "PENDIENTE"
  });
  return form;
  
};



















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




 // se obtiene todos los usuarios
 const getAllUser = async ()=>{
  try {
    const users = await Form.findAll();
    return users;
  } catch (error) {
    console.error('Error al buscar el usuario', error);
    
  }
 }

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

// Crear Usuarios
const createUser = async (email,name) => {
  let form = await User.create({
    email,
    name,
  });
  return form;
  
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
    value: 'Vasos Telgopor (cantidad)'
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
  },
  {
    id:'parlantes',
    value:'Parlantes'
  },
  {
    id:'vasoVidrio',
    value:'Vasos de Vidrio'
  },
  
]


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

  let nombre = objeto.home.lugar;
  let seccion = nombre==='CampoDeporte'?'campoDeporte':nombre.toLowerCase();
  
  let html = `<div>
     <h3> Sección ${objeto.home.lugar}</h3>
     
     ${render(objeto[seccion])}
     
    
     ${objeto[seccion].sobreEscenario ? `
       <div>
         <p><strong>DATOS SOBRE ESCENARIO</strong></p>
         ${render(objeto[seccion].dataSobreEscenario)}
       </div>`
     : ''}
     ${objeto[seccion].bajoEscenario ? `
       <div>
         <p><strong>DATOS BAJO ESCENARIO</strong></p>
         ${render(objeto[seccion].dataBajoEscenario)}
       </div>`
     : ''}
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
    <style>
        /* Aquí puedes agregar tus estilos CSS */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        h1 {
            color: #333;
        }
        p {
            margin-bottom: 10px;
        }
    </style>
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


const redirectEmail = (form,user)=>{





}
// Se realiza los arrays con los items que tiene que ver cada sector.

const smaspons = [
  {lugar:'CampoDeporte',
   items:['mesasR','sillas','sombrillas','observacionesDisposicionMesas',
   'mesaLarga','alargues','zapatillas','parlantes','consola','fondoPrensa','podio',
   'observacionesCompras','observacionesMantenimiento'
  ]
},
{
  lugar:'Otro',
  items:[
    'lugarEvento','limpiezaInicio','limpiezaFinal',,'cantidadPadres','cantidadAlumnos'
  ],
  itemsSobre:[
    'fondoEscenario','mesas','pupitres','sillas','gradas',
    'lucesYPulsadores','alargues',
  ],
  itemsBajo:[
    'pupitres','sillas','gradas','tarimas','alargues',
    'fondoPrensa','aireAcondicionado','gaseosas','lecheChocolatada',
    'sandwichesMiga','medialunas','tortas','observacionesCompras',
    'observacionesMantenimiento'
  ]
},
{
  lugar:'Tinglado',
  items:['limpiezaInicio','limpiezaFinal','cantidadPadres','cantidadAlumnos'],
  itemsSobre:['fondoEscenario','mesas','pupitres','sillas','gradas','alargues',
'pieMicrofono', 
],
  itemsBajo:[
    'pupitres','sillas','observacionesSillas','gradas','tarimas','alargues',
    'escaleras','parlante','consola','fondoPrensa','observacionesCompras','observacionesMantenimiento'
  ]
},
{
  lugar:'Teatro',
  items:['limpiezaInicio','limpiezaFinal','cantidadPadres','cantidadAlumnos'],
  itemsSobre:['fondoEscenario','mesas','pupitres','sillas','gradas','lucesYPulsadores',
'alargues','proyectorA',
],
  itemsBajo:['pupitres','sillas','observacionesSillas','gradas','tarimas','escaleras',
'alargues','proyectorB','fondoPrensa','observacionesCompras','observacionesMantenimiento'
],
}
]

const sGonzalez = [
  {
    lugar:'CampoDeporte',
    items:[
      'mantelBlanco','mantelAzul','microfonoInalambrico','alargues','zapatillas','parlantes',
      'computadora','consola','fondoPrensa','podio','musica',
    ]
  },
  {
    lugar:'Otro',
    items:[
      'cantidadPadres','cantidadAlumnos'
    ],
    itemsSobre:[
      'fondoEscenario','escudoFondo','mantelBlanco','mantelAzul','microfonoInalambrico','pieMicrofono','lucesYPulsadores','alargues','proyectorA',
      'puntero','pantalla','computadora',
    ],
    itemsBajo:[
      'manteles','microfonoInalambrico','alargues','fondoPrensa','computadora','aireAcondicionado','musica',
    ]
  },
  {
    lugar:'Teatro',
    items:[
      'cantidadPadres','cantidadAlumnos',
    ],
    itemsSobre:[
      'fondoEscenario','escudoFondo','mantelBlanco','mantelAzul','microfonoInalambrico','pieMicrofono',
      'lucesYPulsadores','alargues','proyectorA','puntero','pantalla','computadora',
    ],
    itemsBajo:[
      'manteles','microfonoInalambrico','alargues','proyectorB','fondoPrensa','computadora','aireAcondicionado','musica','video'
    ]
  },
  {
    lugar:'Tinglado',
    items:['cantidadPadres','cantidadAlumnos'],
    itemsSobre:[
      'fondoEscenario','escudoFondo','mantelBlanco','mantelAzul','microfonoInalambrico','pieMicrofono','alargues'
    ],
    itemsBajo:[
      'manteles','alargues','parlante','consola','fondoPrensa','computadora','musica',
    ]
  }
]

const dyc = [
  {
    lugar:'CampoDeporte',
    items:['fondoPrensa','podio','observacionesComunicaciones',],
  
  },
  {
    lugar:'Otro',
    items:['cantidadAlumnos','cantidadPadres'],
    itemsSobre:['fondoEscenario','escudoFondo'],
    itemsBajo:['fondoPrensa','observacionesComunicaciones']
  },
  {
    lugar:'Teatro',
    items:['cantidadAlumnos','cantidadPadres'],
    itemsSobre:['fondoEscenario','escudoFondo'],
    itemsBajo:['fondoPrensa','observacionesComunicaciones']
  },
  {
    lugar:'Tinglado',
    items:['cantidadAlumnos','cantidadPadres'],
    itemsSobre:['fondoEscenario','escudoFondo'],
    itemsBajo:['fondoPrensa','observacionesComunicaciones'],
  }
]
const taloba = [
  {
    lugar:'Otro',
    items:['cantidadAlumnos','cantidadPadres'],
    itemsBajo:['cafe','aguaCaliente','te','jarraAguaHielo','gaseosas','azucar',
  'edulcorante','lecheChocolatada','vasosPlasticos','vasosTelgopor','vasoVidrio',
  'batidores','servilleta','sandwichesMiga','medialunas','tortas','observacionesCocina',
  ],
  },
  {
    lugar:'Teatro',
    items:['cantidadAlumnos','cantidadPadres'],
    itemsBajo:['cafe','aguaCaliente','te','jarraAguaHielo','azucar','edulcorante','batidores','servilleta',
  'vasosPlasticos','vasosTelgopor','vasoVidrio','observacionesCocina']
  },

]

//funcion para renderizar sólo aquellos que estén dentro de las propiedades especiales, o que no sea false
function newRender(objeto,propiedadesEspeciales) {
  

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

        if (valor === false || !propiedadesEspeciales.includes(propiedad)) {
          return ''; // Cambia esto para evitar que se muestren comas
        } else {
          return `<p><strong>${customRender(propiedad)} :</strong> &nbsp; ${valorRenderizado}</p>`;
        }
      }
    })
    .join(''); // Usa join para unir los elementos en un solo string, sin comas
}

const RenderProperties = (objeto,listado)=>{
  let nombre = objeto.home.lugar;
  let seccion = nombre==='CampoDeporte'?'campoDeporte':nombre.toLowerCase();
  
  let html = `<div>
     <h3> Sección ${objeto.home.lugar}</h3>
     
     ${newRender(objeto[seccion],listado)}
     
    
     ${objeto[seccion].sobreEscenario&&tieneObjetos(listado,objeto[seccion].dataSobreEscenario) ? `
       <div>
         <p><strong>DATOS SOBRE ESCENARIO</strong></p>
         ${newRender(objeto[seccion].dataSobreEscenario,listado)}
       </div>`
     : ''}
     ${objeto[seccion].bajoEscenario &&tieneObjetos(listado,objeto[seccion].dataSobreEscenario)? `
       <div>
         <p><strong>DATOS BAJO ESCENARIO</strong></p>
         ${newRender(objeto[seccion].dataBajoEscenario,listado)}
       </div>`
     : ''}
  </div>`;

  return html;
}

const getHtml = (funcion,form,listado,name)=>{
  let html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Datos del Formulario</title>
    <style>
        /* Aquí puedes agregar tus estilos CSS */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        h1 {
            color: #333;
        }
        p {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
        <h1>Datos del formulario para  ${name}</h1>
        <p><strong >Email: </strong> ${form.home.email}</p></br>
        <p><strong >Nombre completo: </strong> ${form.home.nombreCompleto}</p></br>
        <p><strong >Nombre del Evento: </strong> ${form.home.nombreEvento}</p></br>
        <p><strong >Sector: ${form.home.sector}</strong></p></br>
        <p><strong >Fecha: </strong> ${form.home.fecha}</p></br>
        <p><strong >Hora: </strong> ${form.home.hora}</p></br>
        <p><strong >Lugar: </strong>${form.home.lugar} </p></br>

        ${     
          funcion(form,listado)
        }
</body>
</html>
`
  return html;
}


///////////////////////////////////////////////

//Funcion para evitar que aparezca BajoEscenario y SobreEscenario en caso de no ser necesario.
function tieneObjetos(array, comparar) {
  let eliminar = ['limpiezaInicio', 'limpiezaFinal', 'cantidadPadres', 'cantidadAlumnos'];
  let listado = [];

  // Recorrer el array recibido por parámetro
  array.forEach(elemento => {
    if (!eliminar.includes(elemento)) {
      listado.push(elemento); // Agregar elemento a 'listado' si no está en 'eliminar'
    }
  });

  return Object.keys(comparar).map((propiedad, index) => {
    const valor = comparar[propiedad];

    if (valor === true || listado.includes(propiedad)) {
      return true;
    } 
  });
  return false;
}


// Se realiza un filtro generico.
const filterMail = (form,listado)=>{
  const lugar = form.home.lugar;
  let seccion = lugar === 'CampoDeporte' ? 'campoDeporte' : lugar.toLowerCase();
  let result = false;

// filtro el listado para que me dé solo lo que encesito.
const elementosUnicos = [];

listado.forEach(objeto => {
    const propiedades = ['items', 'itemsSobre', 'itemsBajo'];
    propiedades.forEach(propiedad => {
        if (objeto[propiedad]) {
            objeto[propiedad].forEach(item => {
                if (item !== 'cantidadPadres' && item !== 'cantidadAlumnos' && !elementosUnicos.includes(item)) {
                    elementosUnicos.push(item);
                }
            });
        }
    });
});

// recorro el listado y verifico si hay alguno que corresponda y que no sea null
for (const e of elementosUnicos) {
  if ( form[seccion]?.dataBajoEscenario && form[seccion]?.dataBajoEscenario.hasOwnProperty(e) && form[seccion]?.dataBajoEscenario[e] !== false) {
      result = true; // Actualizamos result a true si se encuentra al menos un elemento que cumpla la condición
      break; // Salimos del bucle tan pronto como se cumpla la condición
  }
  if ( form[seccion]?.dataSobreEscenario &&form[seccion]?.dataSobreEscenario.hasOwnProperty(e) && form[seccion]?.dataSobreEscenario[e] !== false) {
    result = true; // Actualizamos result a true si se encuentra al menos un elemento que cumpla la condición
    break; // Salimos del bucle tan pronto como se cumpla la condición
}
if (form[seccion]?.hasOwnProperty(e) && form[seccion]?.[e] !== false) {
  result = true; // Actualizamos result a true si se encuentra al menos un elemento que cumpla la condición
  break; // Salimos del bucle tan pronto como se cumpla la condición
}

 
}

return result;
}

// se realiza un format genérico

const formatMail = (form,obj,texto)=>{
  let listado = [];

  obj.forEach(objeto => {
    if (objeto.items) {
      listado.push(...objeto.items);
    }
    if (objeto.itemsBajo) {
      listado.push(...objeto.itemsBajo);
    }
    if (objeto.itemsSobre) {
      listado.push(...objeto.itemsSobre);
    }
  });
  
  listado = [...new Set(listado)];


  return getHtml(RenderProperties,form,listado,texto)


}

  // exports

  module.exports = {
    getUser,
    getFormsByEmail,
    createForm,
    deleteFormPending,
    updateForm,
    formatEmail,
    filterMail,
    formatMail,
    createUser,
    smaspons,
    dyc,
    taloba,
    sGonzalez,
  }