# NOTAS 

### 26-04-2024  Reestructuración del servidor , modelo "Form"  y flujo de datos. 
1.  Un formulario tiene que tener.
    - ID
    - sector  (Sector donde va a realizarse el evento)
    - nombreEvento (nombre del evento)
    - nameUser (nombre del usuario)
    - email ( email del usuario)
    - fecha (fecha del evento)
    - horaInicio  
    - horaFinal  (considerar dejar un espacio de tiempo para la limpieza)
    - data (formulario completo)
    - estado (aprobado - desaprobado - pendiente)
2. Creación de usuarios
    - Implementar con firebase (Auth)
        - Creación de usuarios :
            - nombre
            - email
            - algún dato extra   
            - el usuario se crea desde el front , contactando con Firebase donde se guarda solo usuario y contraseña
            - resto de los datos se guardan en una base de datos.

3.  Flujo de datos
    - Al solicitar la creación de un evento se debe :
        - verificar que la fecha sea correcta (respecto a tiempo y hora)
        - verificar que esa fecha esté disponible  (ej :que sea dia de semana)
        - verificar que el horario sea correcto (ej: que sea en horario escolar)
        - verificar que en la fecha y hora requerida no haya otro evento , siempre recordando que se está trabajando con el sector correspondiente.
        -  crear el evento, pero con el estádo pendiente. (Eso significa que todavía el administrador no aprobó el pedido de evento.)
        - 



        prueba de  pus