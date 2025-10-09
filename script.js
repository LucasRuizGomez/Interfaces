


//TODO ESTE CODIGO ES PARA EL CARROUSEL

//POR HACER: Ajustar lo de el tamaño de cada imagen; A lo mejor que los botones estén fuera del div para q no se muevan.

//Vale todo esto lo he hecho sin ayuda externa así que es un poco delicado pero funciona
const slides = document.querySelectorAll(".pack img");
let slideindex = 0;
let intervalId = null;

initializeSlider();

function initializeSlider(){

    slides[slideindex].classList.add("displaySlide");
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

//Esto es un test
function saveUser() {
    const user = { username: "1", password: "1" };

    localStorage.setItem("user", JSON.stringify(user));
}

saveUser();

// Función para comprobar si las credenciales están en localStorage
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





//CODIGO VERSION A


document.getElementById('boton_guardar_datos').addEventListener('click', function(){
    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('password').value;

    // Validación básica de los campos
    if (!nombre || !password) {
        alert("Por favor, ingresa un nombre de usuario y una contraseña.");
        return;
    }

    // Guardar los datos del usuario en localStorage
    const user = { username: nombre, password: password };
    localStorage.setItem('user', JSON.stringify(user));

    alert("Usuario registrado correctamente.");
    window.location.href = 'version_b.html'; // Redirigir a version_b.html
    





});












