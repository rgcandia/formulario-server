const { google } = require('googleapis');
const dotenv = require('dotenv');
const fs =  require('fs');
// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Cargar las credenciales desde la variable de entorno GOOGLE_CREDENTIALS
const credenciales = JSON.parse(process.env.GOOGLE_CREDENTIALS);




// Configurar la autenticación con las credenciales de la cuenta de servicio
const auth = new google.auth.GoogleAuth({
  credentials: credenciales,
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

// Crear un cliente de Google Calendar
const calendar = google.calendar({ version: 'v3', auth });

// Ahora puedes utilizar el cliente de Google Calendar para interactuar con la API de Calendar
async function listarCalendarios() {
    try {
      const response = await calendar.calendarList.list();
      const calendars = response.data.items;
      if (calendars.length) {
        // retorno el calendario
        return calendars;
      } else {
        console.log('No se encontraron calendarios.');
        return false;
      }
    } catch (error) {
      console.error('Error al listar calendarios:', error.message);

    }
  }

  async function crearCalendario(nombre) {
    try {
        const nuevoCalendario = await calendar.calendars.insert({
            requestBody: {
                summary: nombre,
                accessRole: 'owner'
            }
        });

        console.log(`Calendario "${nombre}" creado con éxito.`);
        console.log(`ID del calendario: ${nuevoCalendario.data.id}`);
    } catch (error) {
        console.error('Error al crear el calendario:', error.message);
    }
}

async function compartirCalendario(idCalendario, correoElectronico, permisos) {
  try {
      const res = await calendar.acl.insert({
          calendarId: idCalendario,
          requestBody: {
              role: permisos, // Define aquí el nivel de permisos (e.g., 'reader', 'writer', etc.)
              scope: {
                  type: 'user',
                  value: correoElectronico
              }
          }
      });
      console.log(`Calendario compartido con ${correoElectronico} con éxito.`);
      console.log(`ID del permiso: ${res.data.id}`);
      return true;
  } catch (error) {
      return false;
      console.error('Error al compartir el calendario:', error.message);
  }
}

async function eliminarCalendario(idCalendario) {
    try {
        await calendar.calendars.delete({
            calendarId: idCalendario
        });
        console.log(`Calendario con ID ${idCalendario} eliminado con éxito.`);
    } catch (error) {
        console.error('Error al eliminar el calendario:', error.message);
    }
}

async function obtenerEventosCalendario(idCalendario) {
  try {
    // Obtener el año actual
    const añoActual = new Date().getFullYear();
    // Definir la fecha de inicio del año y la fecha de fin del año
    const fechaInicio = new Date(añoActual, 0, 1); // 1 de enero del año
    const fechaFin = new Date(añoActual, 11, 31, 23, 59, 59); // 31 de diciembre del año, último segundo

    const response = await calendar.events.list({
      calendarId: idCalendario,
      timeMin: fechaInicio.toISOString(), // Primer día del año en formato ISO
      timeMax: fechaFin.toISOString(), // Último día del año en formato ISO
      // maxResults: null, // Sin límite de resultados
      singleEvents: true,
      orderBy: 'startTime',
    });
   
    const eventos = response.data.items;
    if (eventos.length) {
      // Retornar los eventos obtenidos
      return eventos;
    } else {
      console.log('No se encontraron eventos en este calendario para el año', añoActual);
      return false;
    }
  } catch (error) {
    console.error('Error al obtener eventos del calendario:', error.message);
    console.log(error)
    return false;
  }
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// Función para obtener eventos en un intervalo de tiempo
async function obtenerEventosEnIntervalo(idCalendario, timeMin, timeMax) {
  try {
    const response = await calendar.events.list({
      calendarId: idCalendario,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items;
  } catch (error) {
    console.error('Error al obtener eventos del calendario:', error.message);
    return [];
  }
}

// Función para verificar solapamientos
function haySolapamiento(eventoNuevo, eventosExistentes) {
  for (const evento of eventosExistentes) {
    const inicioExistente = new Date(evento.start.dateTime || evento.start.date);
    const finExistente = new Date(evento.end.dateTime || evento.end.date);

    const inicioNuevo = new Date(eventoNuevo.start.dateTime);
    const finNuevo = new Date(eventoNuevo.end.dateTime);

    if (inicioNuevo < finExistente && finNuevo > inicioExistente) {
      return true;
    }
  }
  return false;
}

// Función para crear un nuevo evento si no hay solapamientos
async function crearTurno(idCalendario, nuevoTurno) {
  const timeMin = new Date(nuevoTurno.start.dateTime);
  const timeMax = new Date(nuevoTurno.end.dateTime);

  // Obtener eventos en el intervalo del nuevo turno
  const eventosExistentes = await obtenerEventosEnIntervalo(idCalendario, timeMin, timeMax);

  // Verificar solapamientos
  if (haySolapamiento(nuevoTurno, eventosExistentes)) {
    console.log('Error: El nuevo turno se solapa con un evento existente.');
    return false;
  }

  // Crear el nuevo turno si no hay solapamientos
  try {
    const response = await calendar.events.insert({
      calendarId: idCalendario,
      requestBody: nuevoTurno,
    });
    console.log(`Turno creado con éxito. ID del turno: ${response.data.id}`);
    return response.data;
  } catch (error) {
    console.error('Error al crear el turno:', error.message);
    return false;
  }
}

// // Ejemplo de uso de la función crearTurno
// const idCalendario = 'tu-id-de-calendario';
// const nuevoTurno = {
//   summary: 'Consulta Médica',
//   description: 'Consulta con el Dr. Perez', 
//   start: {
//     dateTime: '2024-06-01T09:00:00-07:00',
//     timeZone: 'America/Los_Angeles',
//   },
//   end: {
//     dateTime: '2024-06-01T10:00:00-07:00',
//     timeZone: 'America/Los_Angeles',
//   },
//   attendees: [
//     { email: 'paciente@example.com' },
//   ],
//   reminders: {
//     useDefault: false,
//     overrides: [
//       { method: 'email', minutes: 24 * 60 },
//       { method: 'popup', minutes: 10 },
//     ],
//   },
// };

// crearTurno(idCalendario, nuevoTurno).then((turnoCreado) => {
//   if (turnoCreado) {
//     console.log('Turno creado:', turnoCreado);
//   } else {
//     console.log('Error al crear el turno.');
//   }
// });
  module.exports = {
    listarCalendarios,
    crearCalendario,
    compartirCalendario,
    eliminarCalendario,
    obtenerEventosCalendario,
    crearTurno
    
  }