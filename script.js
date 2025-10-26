document.addEventListener('DOMContentLoaded', () => {


//TODO ESTE CODIGO ES PARA EL CARROUSEL

//POR HACER: Ajustar lo de el tamaño de cada imagen; A lo mejor que los botones estén fuera del div para q no se muevan.

//Vale todo esto lo he hecho sin ayuda externa así que es un poco delicado pero funciona

    const carousel = document.querySelector(".pack");

    if(carousel){

        const slides = document.querySelectorAll(".pack img");
        const flechaAntes = document.querySelector(".flecha_antes");
        const flechaDespues = document.querySelector(".flecha_despues");
        let slideindex = 0;
        let intervalId = null;
        const titles = [
            { title: "Pack Sudeste Asiático", description: "Vietnam & Camboya: buses, hostales y guía de visados" },
            { title: "Pack Egipto", description: "Aventura en Egipto: pirámides, camellos y cultura milenaria" },
            { title: "Pack Guatemala", description: "Explora la jungla de Guatemala: cultura y naturaleza" }
        ]; // Array de títulos y descripciones de cada imagen

        initializeSlider();

        function initializeSlider(){
            slides[slideindex].classList.add("displaySlide");
            updateText(slideindex); // Actualiza el texto al inicializar
            intervalId = setInterval(siguiente_slide, 2000);
        }

        function showSlide(index){
            if(index >= slides.length){
                slideindex = 0; 
            }
            else if(index < 0){
                slideindex = slides.length - 1; // Te lleva al slide anterior
            }
            slides.forEach(img =>{
                img.classList.remove("displaySlide");
            });
            slides[slideindex].classList.add("displaySlide");
            updateText(slideindex);  // Actualizar el texto cuando se cambia la imagen
        }


        function updateText(index) {
            // Obtener los elementos del texto (título y descripción)
            const titleElement = document.querySelector('.info h3');  // Título
            const descriptionElement = document.querySelector('.info p');  // Descripción
            
            // Actualizar el texto con los datos correspondientes a la imagen actual
            titleElement.textContent = titles[index].title;
            descriptionElement.textContent = titles[index].description;
        }

        function previa_slide(){
            slideindex--;
            showSlide(slideindex);
        }

        function siguiente_slide(){ 
            slideindex++;
            showSlide(slideindex);
        }

        // Esta función reinicia el temporizador
        function resetInterval() {
        clearInterval(intervalId); // Borra el temporizador viejo
        intervalId = setInterval(siguiente_slide, 2000); // Crea uno nuevo
        }

        // --- INICIALIZACIÓN Y LISTENERS ---
        if (flechaAntes) {
            flechaAntes.addEventListener('click', () => {
                previa_slide(); // Mueve la diapositiva
                resetInterval(); // Reinicia el temporizador
            });
        }

        if (flechaDespues) {
            flechaDespues.addEventListener('click', () => {
                siguiente_slide(); // Mueve la diapositiva
                resetInterval(); // Reinicia el temporizador
            });
        }
           
        //INICIO DE SESION

        // //Esto es un test
        // function saveUser() {
        //     const user = { username: "1", password: "1" };

        //     localStorage.setItem("user", JSON.stringify(user));
        // }

        // saveUser();

        // Función para comprobar si las credenciales están en localStorage
        //localStorage.clear(); 


        const iniciodesesion = document.getElementById("inicio_sesion");

        if(iniciodesesion){
            iniciodesesion.addEventListener('click', function() {
            const usuario = document.getElementById('nombre').value;
            const password = document.getElementById('Contraseña').value; // Cambié 'apellido' a 'password'

            const storedUser = localStorage.getItem('user');

            // Verificar si existe un usuario guardado
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);

                if (usuario === parsedUser.usuario && password === parsedUser.contraseña) {
                    window.location.href = 'version_b.html';  // Redirigir si las credenciales son correctas
                } else {
                    alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
                }
            } else {
                alert("No hay usuarios registrados. Por favor, regístrate.");
            }
        });
        }

        


        
    }















    //CODIGO VERSION A
    const guardardatos = document.getElementById('boton_guardar_datos');
    if(guardardatos){
        // Habilitar/Deshabilitar el botón por la casilla de privacidad
        const checkPriv = document.getElementById('privacidad');
        // estado inicial (por si el usuario recarga con la casilla ya marcada)
        guardardatos.disabled = !checkPriv.checked;
        // cuando cambia la casilla, alterna el disabled
        checkPriv.addEventListener('change', (e) => {
        guardardatos.disabled = !e.target.checked;
        });

        document.getElementById('boton_guardar_datos').addEventListener('click', function(){  //Todo lo que pase aquí es tras darle click al boton de guardar datos
        console.log("Button clicked, validating fields...");

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const correo = document.getElementById('correo').value;
        const confirmar_correo = document.getElementById('confirmar_correo').value;
        const usuario = document.getElementById('usuario').value;
        const contraseña = document.getElementById('contraseña').value;
        const nacimiento = document.getElementById("nacimiento").value;
        const privacidad = document.getElementById("privacidad").checked;
        const imgPerfilInput = document.getElementById('img_perfil');
        const imgFile = imgPerfilInput.files[0];
        

        // Validación básica de los campos --> Si no meten nada vaya
        if (!nombre || !apellido || !correo || !confirmar_correo || !nacimiento || !usuario || !contraseña) {
            alert("Por favor, completa todo  const imgFile = imgInput?.files?.[0] || null;s los campos.");
            return;  // Stops the function if any field is empty
        }


        // 1. Nombre: at least 3 characters
        if (nombre.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        // 2. Apellidos: at least two strings with 3 characters each
        const apellidoParts = apellido.split(" ");
        if (apellidoParts.length < 2 || apellidoParts.some(part => part.length < 3)) {
            alert("El apellido debe contener al menos dos cadenas de caracteres, cada una con al menos 3 caracteres.");
            return;
        }

        // // 3. Correo electrónico: valid email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(correo)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // 4. Confirmar correo electrónico: must match the first email
        if (correo !== confirmar_correo) {
            alert("Los correos electrónicos no coinciden.");
            return;
        }

        // 5. Fecha de nacimiento: ensure it's not a future date
        const today = new Date();
        const birthDate = new Date(nacimiento);
        if (birthDate > today) {
            alert("La fecha de nacimiento no puede ser una fecha futura.");
            return;
        }
        // Solo pueden registrarse mayores de 16
        today.setFullYear(today.getFullYear() - 16);
        if (birthDate > today) {
            alert("Debes tener al menos 16 años para registrarte.");
            return;
        }

        // 6. Login: at least 5 characters
        if (usuario.length < 5) {
            alert("El nombre de usuario debe tener al menos 5 caracteres.");
            return;
        }

        // 7. Contraseña: at least 8 characters, 1 uppercase, 1 lowercase, 2 numbers, 1 special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(contraseña)) {
            alert("La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 2 números y 1 carácter especial.");
            return;
        }


        //Falta lo de acepto politica de privacidad y lo de las fotos

        // 9. Política de privacidad: checkbox must be checked
        if (!privacidad) {
            alert('Debes aceptar la política de privacidad.');
            return;
        }

    
        // 10. File
        if (!imgFile) {
            alert("Por favor, selecciona una imagen de perfil.");
            return;
        }

        const allowedTypes = ['image/webp', 'image/png', 'image/jpeg']; // jpeg cubre jpg
        if (!allowedTypes.includes(imgFile.type)) {
            alert("Formato no válido. Solo se admiten WEBP, PNG o JPG.");
            imgPerfilInput.value = ""; // limpia el campo
            return;
        }



        // Save the user data to localStorage
        const user = {
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            usuario: usuario,
            contraseña: contraseña,
            nacimiento: nacimiento,
            // imgPerfil: imgPerfil ? imgPerfil.name : null, // Store image name if available
        };
        localStorage.setItem('user', JSON.stringify(user));

        alert("Usuario registrado correctamente.");
        window.location.href = 'version_b.html'; // Redirect to version_b.html

    });}







    //CODIGO VERSION b
    const perfilUsuario = document.querySelector('.perfil');
    if (perfilUsuario) {

        // Obtener el objeto user del localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser) {
            // Si no hay usuario, redirigir al Home
            alert("Debes iniciar sesión primero.");
            window.location.href = 'index.html';
            return;
        }

        console.log(storedUser.nombre);


        // Cambiar el <p> con id "nombre_usuario" para que muestre el nombre
        const nombreUsuarioElement = document.getElementById('nombre_usuario');
        if (nombreUsuarioElement) {
            nombreUsuarioElement.textContent = storedUser.nombre; // <-- Aquí usamos "nombre"
        }
    }


    //CODIGO VERSION C
    const comprar = document.getElementById('boton_comprar');
    if(comprar){
        document.getElementById('boton_comprar').addEventListener('click', function(){  //Todo lo que pase aquí es tras darle click al boton de comprar
        console.log("Button clicked, validating fields...");

        const nombrec = document.getElementById('full_name').value;
        const correoc = document.getElementById('email').value;
        const tipotarj = document.getElementById('card_type').value;
        const numtarjeta = document.getElementById('numero').value;
        const nombretitular = document.getElementById('nombreTitular').value;
        const caducidad = document.getElementById("expiry").value;
        const codigo = document.getElementById('cvv').value;


        // Validación básica de los campos --> Si no meten nada vaya
        if (!nombrec || !correoc || !tipotarj || !numtarjeta || !nombretitular || !caducidad || !codigo) {
            alert("Por favor, completa todo  ");
            return;  // Stops the function if any field is empty
        }


        // 1. Nombre: at least 3 characters
        if (nombrec.length < 3) {
            alert("El nombre debe tener al menos 3 caracteres.");
            return;
        }


        // // 2. Correo electrónico: valid email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(correoc)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // 3. Validar Tipo de Tarjeta (que se haya seleccionado uno) [cite: 154]
        if (!tipotarj) {
            alert("Debes seleccionar un tipo de tarjeta.");
            return;
        }
        // 4. Validar Número de Tarjeta (13, 15, 16 o 19 dígitos) 
        const cardRegex = /^(\d{13}|\d{15}|\d{16}|\d{19})$/;
        if (!cardRegex.test(numtarjeta)) {
            alert("El número de tarjeta debe tener 13, 15, 16 o 19 dígitos.");
            return;
        }
        
        // 5. Validar Nombre del Titular (mínimo 3 caracteres) 
        if (nombretitular.length < 3) {
            alert("El nombre del titular de la tarjeta debe tener al menos 3 caracteres.");
            return;
        }

        // 6. Validar Fecha de Caducidad
        const today = new Date();
        const expiryDate = new Date(caducidad);
        if (expiryDate < today) {
            alert("La tarjeta está caducada.");
            return;
        }

        // 8. Validar CVV (exactamente 3 dígitos) 
        const cvvRegex = /^\d{3}$/;
        if (!cvvRegex.test(codigo)) {
            alert("El CVV debe tener exactamente 3 dígitos.");
            return;
        }

        alert("¡Compra realizada!"); 
        // Si llega a comprarlo, limpiamos formulario
        checkout.reset();

    });
    }
    });
