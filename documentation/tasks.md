### 📚 Historia 1: Crear un libro en la API
**Como** administrador de la biblioteca,  
**Quiero** agregar nuevos libros al sistema,  
**Para** gestionar fácilmente las publicaciones que tenemos en el inventario.

**Given:** El administrador de la biblioteca tiene acceso a la API.  
**When:** El administrador envía una solicitud para crear un libro con los campos: título, autor, fecha de publicación y género.  
**Then:** La API debe crear el libro en la base de datos y devolver una respuesta de éxito.  
**And:** Si alguno de los campos obligatorios está vacío,  
**Then:** la API debe devolver un error claro y manejado.

**Using:** 
- `@nestjs/common` para controladores y servicios.
- `class-validator` para validaciones.
- `TypeORM` o `Mongoose` para interacción con la base de datos.

---

### 📖 Historia 2: Consultar la lista de libros
**Como** visitante de la biblioteca,  
**Quiero** ver una lista de los libros disponibles,  
**Para** seleccionar el libro que me interesa.

**Given:** Un visitante de la biblioteca desea consultar los libros disponibles.  
**When:** El visitante envía una solicitud para obtener la lista de libros.  
**Then:** La API debe devolver una lista de todos los libros disponibles.  
**And:** Si no hay libros en el sistema,  
**Then:** la API debe devolver un mensaje adecuado.

**Using:** 
- `@nestjs/common` para controladores y servicios.
- `TypeORM` o `Mongoose` para interacción con la base de datos.

---

### 📑 Historia 3: Obtener los detalles de un libro específico
**Como** administrador o visitante de la biblioteca,  
**Quiero** ver la información detallada de un libro específico,  
**Para** obtener más detalles sobre él antes de seleccionarlo.

**Given:** Un usuario tiene el ID de un libro.  
**When:** El usuario solicita los detalles del libro utilizando su ID.  
**Then:** La API debe devolver la información completa del libro.  
**And:** Si el libro no se encuentra,  
**Then:** la API debe devolver un mensaje de error apropiado.

**Using:** 
- `@nestjs/common` para controladores y servicios.
- `@nestjs/core` para manejo de excepciones.

---

### 🔄 Historia 4: Actualizar la información de un libro
**Como** administrador de la biblioteca,  
**Quiero** actualizar la información de un libro existente,  
**Para** mantener los datos actualizados si se cometió un error o cambió alguna información.

**Given:** El administrador de la biblioteca desea actualizar un libro existente.  
**When:** El administrador envía una solicitud para actualizar un libro con nuevos datos.  
**Then:** La API debe permitir la actualización de los campos: título, autor, fecha de publicación y género.  
**And:** Si el libro no se encuentra,  
**Then:** la API debe devolver un mensaje de error.

**Using:** 
- `@nestjs/common` para controladores y servicios.
- `class-validator` para validaciones.

---

### ❌ Historia 5: Eliminar un libro del sistema
**Como** administrador de la biblioteca,  
**Quiero** eliminar un libro del sistema,  
**Para** retirar libros obsoletos o dañados del inventario.

**Given:** El administrador desea eliminar un libro del sistema.  
**When:** El administrador envía una solicitud para eliminar un libro utilizando su ID.  
**Then:** La API debe permitir la eliminación del libro.  
**And:** Si el libro no se encuentra,  
**Then:** debe devolver un error claro.

**Using:** 
- `@nestjs/common` para controladores y servicios.
- `TypeORM` o `Mongoose` para interacción con la base de datos.

---

### ✅ Historia 6: Validaciones de Entrada
**Como** desarrollador,  
**Quiero** que la API valide correctamente los datos de entrada,  
**Para** evitar errores al procesar datos incorrectos.

**Given:** Un usuario envía datos de entrada a la API.  
**When:** Se recibe una solicitud con datos de entrada.  
**Then:** La API debe validar que los campos obligatorios sean enviados y tengan el formato adecuado.  
**And:** Si la validación falla,  
**Then:** debe devolver una respuesta con los errores de validación.

**Using:** 
- `class-validator` para validaciones.
- `@nestjs/common` para controladores.

---

### 🧪 Historia 7: Pruebas Unitarias
**Como** desarrollador,  
**Quiero** que la API esté completamente cubierta por pruebas unitarias,  
**Para** asegurar que las funcionalidades se comporten correctamente y evitar futuros bugs.

**Given:** Un desarrollador ha implementado la API.  
**When:** Se ejecutan las pruebas unitarias.  
**Then:** Las pruebas deben verificar tanto los casos exitosos como los de error.  
**And:** Deben centrarse en la funcionalidad clave y en las rutas críticas.

**Using:** 
- `jest` para pruebas unitarias.
- `@nestjs/testing` para configurar el entorno de pruebas.

---

### 📋 Historia 8: Crear un administrador en la API
**Como** administrador principal del sistema,  
**Quiero** poder crear otros administradores,  
**Para** delegar el acceso y gestión del sistema a múltiples personas.

- **Given:** El administrador principal tiene acceso al sistema.
- **When:** El administrador principal envía una solicitud para crear un nuevo administrador con los campos: nombre, email, contraseña, etc.
- **Then:** La API debe registrar al nuevo administrador en la base de datos, almacenar la contraseña de forma segura con hashing, y devolver una respuesta de éxito.
- **And:** Si el email ya existe,  
**Then:** la API debe devolver un error que indique que el administrador ya está registrado.

**Using:**
- `@nestjs/common` para controladores y servicios.
- `class-validator` para validaciones.
- `bcryptjs` para el hash de las contraseñas.
- `TypeORM` o `Mongoose` para la interacción con la base de datos.

---

### ✍️ Historia 9: Crear un autor en la API
**Como** administrador de la biblioteca,  
**Quiero** agregar nuevos autores al sistema,  
**Para** gestionar fácilmente los libros asociados a los autores.

- **Given:** El administrador tiene acceso a la API.
- **When:** El administrador envía una solicitud para crear un nuevo autor con los campos: nombre, apellido, biografía, etc.
- **Then:** La API debe registrar al nuevo autor en la base de datos y devolver una respuesta de éxito.
- **And:** Si alguno de los campos obligatorios está vacío,  
**Then:** la API debe devolver un error claro y manejado.

**Using:**
- `@nestjs/common` para controladores y servicios.
- `class-validator` para validaciones.
- `TypeORM` o `Mongoose` para interacción con la base de datos.

Aquí tienes las dos nuevas tareas, integradas en tu sistema de historias de usuario:

---

### 🔒 Historia 10: Proteger rutas para administradores
**Como** administrador del sistema,  
**Quiero** que ciertas rutas de la API estén protegidas,  
**Para** asegurar que solo los administradores puedan acceder a funcionalidades críticas.

- **Given:** Un usuario está intentando acceder a una ruta protegida.
- **When:** El usuario envía una solicitud a una ruta que requiere privilegios de administrador.
- **Then:** La API debe verificar que el usuario tenga permisos de administrador.
- **And:** Si el usuario no es un administrador,  
**Then:** la API debe devolver un error 403 (Prohibido).

**Using:**
- `@nestjs/common` para controladores y servicios.
- Middleware o guardias de seguridad (por ejemplo, `@nestjs/passport`) para verificar roles y permisos.

---

### 🗝️ Historia 11: Login de administrador
**Como** administrador del sistema,  
**Quiero** poder iniciar sesión en la API,  
**Para** acceder a mis funcionalidades y gestionar el sistema.

- **Given:** Un administrador tiene credenciales (email y contraseña).
- **When:** El administrador envía una solicitud de inicio de sesión a la API.
- **Then:** La API debe verificar las credenciales y, si son válidas, devolver un token de autenticación.
- **And:** Si las credenciales son incorrectas,  
**Then:** la API debe devolver un error claro indicando que la autenticación ha fallado.

**Using:**
- `@nestjs/common` para controladores y servicios.
- `bcryptjs` para comparar la contraseña encriptada.
- `jsonwebtoken` para generar y devolver el token de autenticación.

---

