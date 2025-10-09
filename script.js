


//TODO ESTE CODIGO ES PARA EL CARROUSEL

//POR HACER: Ajustar lo de el tamaño de cada imagen; A lo mejor que los botones estén fuera del div para q no se muevan.

//Vale todo esto lo he hecho sin ayuda externa así que es un poco delicado pero funciona

const carousel = document.querySelector(".pack");

if(carousel){


    const slides = document.querySelectorAll(".pack img");
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
        intervalId = setInterval(siguiente_slide, 5000);

    }

    function showSlide(index){

        if(index >= slides.length){

            slideindex = 0; 
        }
        else if(index < 0){

            slideindex = slides.length - 1; // Te lleva al slide anterior
        }

        //Esto me chirria un poco porque estamos cogiendo todas las imagenes dentro de slides y cambiando un atributo --> Deberiamos meter las <img> de aquí dentro de una clase?¿
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
        clearInterval(intervalId);
        slideindex--;
        showSlide(slideindex);
    }

    function siguiente_slide(){ 
        slideindex++;
        showSlide(slideindex);
    }





    //INICIO DE SESION

    // //Esto es un test
    // function saveUser() {
    //     const user = { username: "1", password: "1" };

    //     localStorage.setItem("user", JSON.stringify(user));
    // }

    // saveUser();

    // Función para comprobar si las credenciales están en localStorage
    // localStorage.clear();  // This will clear all items from localStorage --> Linea de codigo para borrar todos users

    document.getElementById('inicio_sesion').addEventListener('click', function() {
        const usuario = document.getElementById('nombre').value;
        const password = document.getElementById('Contraseña').value; // Cambié 'apellido' a 'password'

        const storedUser = localStorage.getItem('user');

        // Verificar si existe un usuario guardado
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);

            if (usuario === parsedUser.username && password === parsedUser.password) {
                window.location.href = 'version_b.html';  // Redirigir si las credenciales son correctas
            } else {
                alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
            }
        } else {
            alert("No hay usuarios registrados. Por favor, regístrate.");
        }
    });


    
}

















//CODIGO VERSION A


document.getElementById('boton_guardar_datos').addEventListener('click', function(){  //Todo lo que pase aquí es tras darle click al boton de guardar datos
    console.log("Button clicked, validating fields...");




    
    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const confirmar_correo = document.getElementById('confirmar_correo').value;
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;



    // Validación básica de los campos --> Si no meten nada vaya
    if (!nombre || !password || !correo || !confirmar_correo || !usuario || !contraseña) {
        alert("Por favor, completa todos los campos.");
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

    // 3. Correo electrónico: valid email format
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

    // 9. Política de privacidad: checkbox must be checked
    if (!privacidad) {
        alert("Debes aceptar la política de privacidad.");
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
});











