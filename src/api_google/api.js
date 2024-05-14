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


  module.exports = {
    listarCalendarios,
    crearCalendario,
    compartirCalendario,
    eliminarCalendario,
    obtenerEventosCalendario
  }