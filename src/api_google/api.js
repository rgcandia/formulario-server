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
  } catch (error) {
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

  module.exports = {
    listarCalendarios,
    crearCalendario,
    compartirCalendario,
    eliminarCalendario
  }