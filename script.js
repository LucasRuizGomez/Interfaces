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
        // Información de los packs: título, descripción corta, descripción larga y precio
    const titles = [
    {
        title: "Pack Sudeste Asiático",
        description: "Vietnam & Camboya: buses, hostales y guía de visados",
        descripcionLarga: `Embárcate en una aventura por Vietnam y Camboya con todo lo esencial para tu viaje mochilero.
        Este pack incluye traslados en bus entre las principales ciudades, alojamiento en hostales mochileros
        y una completa guía de visados para cruzar fronteras sin complicaciones. Descubre la bahía de Ha Long,
        los templos de Angkor y la vibrante vida callejera de Hanói y Nom Pen.`,
        precio: "600€"
    },
    {
        title: "Pack Egipto",
        description: "Aventura en Egipto: pirámides, camellos y cultura milenaria",
        descripcionLarga: `Explora los secretos del Antiguo Egipto viajando entre El Cairo, Luxor y Asuán.
        El pack incluye visitas guiadas a las pirámides de Giza, paseos en camello por el desierto y una travesía por el Nilo.
        Vive una experiencia mágica entre historia, cultura y aventura en el corazón de África.`,
        precio: "600€"
    },
    {
        title: "Pack Guatemala",
        description: "Explora la jungla de Guatemala: cultura y naturaleza",
        descripcionLarga: `Descubre la jungla tropical y las ruinas mayas con este pack lleno de naturaleza y tradición.
        Incluye excursiones por Tikal, navegación por el Lago Atitlán y visitas a comunidades locales. Ideal para aventureros
        que buscan conexión con la naturaleza y culturas milenarias.`,
        precio: "600€"
    }
    ];

        // Array de títulos y descripciones de cada imagen
        


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
           
        // --- INICIO DE SESIÓN ---
        const botonLogin = document.getElementById("inicio_sesion");

        if (botonLogin) {
            botonLogin.addEventListener("click", () => {
                const usuario = document.getElementById("nombre").value.trim();
                const password = document.getElementById("Contraseña").value.trim();

                if (!usuario || !password) {
                    alert("Por favor, introduce usuario y contraseña.");
                    return;
                }

                // Cargar usuarios y logeados
                const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                let logeados = JSON.parse(localStorage.getItem("logeados")) || [];

                // Buscar usuario existente
                const user = usuarios.find(u => u.usuario === usuario && u.contraseña === password);

                if (!user) {
                    alert("Usuario o contraseña incorrectos.");
                    return;
                }

                // Evitar duplicados en la lista de logeados
                if (!logeados.some(u => u.usuario === user.usuario)) {
                    logeados.push(user);
                    localStorage.setItem("logeados", JSON.stringify(logeados));
                }

                alert(`Bienvenido, ${user.nombre}`);
                window.location.href = "version_b.html";
            });
        }






        // --- GESTIONAR COMPRA DEL PACK ---
        const botonesComprar = document.querySelectorAll(".pack .boton");

        botonesComprar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const imagenActual = document.querySelector(".pack img.displaySlide");
            const packActual = titles[slideindex]; // Usamos el índice actual del carrusel

            const packSeleccionado = {
            titulo: packActual.title,
            descripcion: packActual.description,
            descripcionLarga: packActual.descripcionLarga,
            imagen: imagenActual ? imagenActual.src : "",
            precio: packActual.precio
            };

            localStorage.setItem("packSeleccionado", JSON.stringify(packSeleccionado));
            window.location.href = "version_c.html";
        });
        });



        
    } //Cierre carrusel















    //-------------------------CODIGO VERSION A---------------------------------

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
        

        // Validación básica de los campos --> Si no meten nada 
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
        
        // --- GUARDAR USUARIO EN localStorage e iniciar sesión automáticamente ---
        const reader = new FileReader();
        reader.onload = (e) => {
            const nuevoUsuario = {
                nombre,
                apellido,
                correo,
                usuario,
                contraseña,
                nacimiento,
                imgPerfil: e.target.result // ✅ se guarda la imagen en base64
            };

            // Cargar lista de usuarios
            let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Verificar si el nombre de usuario ya existe
            const existe = usuarios.some(u => u.usuario === usuario);
            if (existe) {
                alert("Ese nombre de usuario ya está registrado. Usa otro o inicia sesión.");
                return;
            }

            // Agregar el nuevo usuario a la lista general
            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            // Asegurar que existe la lista de logeados
            let logeados = JSON.parse(localStorage.getItem("logeados")) || [];

            // Agregar al nuevo usuario directamente a logeados
            logeados.push(nuevoUsuario);
            localStorage.setItem("logeados", JSON.stringify(logeados));

            // Guardar también una sesión activa (por si la necesitas luego)
            localStorage.setItem("sesionActiva", JSON.stringify(nuevoUsuario));

            alert(`¡Bienvenido, ${nuevoUsuario.nombre}! Tu cuenta ha sido creada e iniciada sesión automáticamente.`);
            window.location.href = "version_b.html"; // 🔄 redirige directamente a la sesión activa
        };

        reader.readAsDataURL(imgFile);




    });}







    //-------------------CODIGO VERSION B--------------------------
 // === CÓDIGO VERSION B ===
const perfilUsuario = document.querySelector(".perfil");
if (perfilUsuario) {

    // Recuperar lista de usuarios logeados
    const logeados = JSON.parse(localStorage.getItem("logeados")) || [];

    if (logeados.length === 0) {
        alert("No hay usuarios logeados. Inicia sesión primero.");
        window.location.href = "index.html";
        return;
    }

    // Tomamos el último usuario logeado
    const user = logeados[logeados.length - 1];

    // Mostrar datos en la interfaz
    const nombreUsuarioElement = document.getElementById("nombre_usuario");
    const emailUsuarioElement = document.querySelector(".email_usuario");
    const imgPerfilElement = document.getElementById("img_perfil_usuario");

    if (nombreUsuarioElement) nombreUsuarioElement.textContent = `${user.nombre} ${user.apellido}`;
    if (emailUsuarioElement) emailUsuarioElement.textContent = user.correo;
    if (imgPerfilElement && user.imgPerfil) imgPerfilElement.src = user.imgPerfil;

    // --- Cerrar sesión ---
    const botonCerrarSesion = document.getElementById("boton_cerrar_sesion");
    if (botonCerrarSesion) {
        botonCerrarSesion.addEventListener("click", () => {
            const confirmar = confirm("¿Deseas cerrar sesión?");
            if (confirmar) {
                const nuevosLogeados = logeados.filter(u => u.usuario !== user.usuario);
                localStorage.setItem("logeados", JSON.stringify(nuevosLogeados));
                alert("Sesión cerrada correctamente.");
                window.location.href = "index.html";
            }
        });
    }

    // --- CÓDIGO PARA CONSEJOS ---
    const formConsejo = document.getElementById("form_consejo");
    const consejoTituloInput = document.getElementById("consejo_titulo");
    const consejoTextoInput = document.getElementById("consejo_texto");
    const listaDOM = document.querySelector("#right_inferior_2 .list");

    function cargarConsejos() {
        const consejosGuardados = JSON.parse(localStorage.getItem("consejos")) || [];
        listaDOM.innerHTML = "";
        const ultimosTres = consejosGuardados.slice(0, 3);
        ultimosTres.forEach(consejo => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="#">${consejo.titulo}</a>`;
            listaDOM.appendChild(li);
        });
    }

    if (formConsejo) {
        formConsejo.addEventListener("submit", function (e) {
            e.preventDefault();

            const titulo = consejoTituloInput.value.trim();
            const texto = consejoTextoInput.value.trim();

            if (titulo.length < 15) {
                alert("El título del consejo debe tener al menos 15 caracteres.");
                return;
            }
            if (texto.length < 30) {
                alert("La descripción del consejo debe tener al menos 30 caracteres.");
                return;
            }

            const nuevoConsejo = { titulo, texto };
            let consejosGuardados = JSON.parse(localStorage.getItem("consejos")) || [];
            consejosGuardados.unshift(nuevoConsejo);
            localStorage.setItem("consejos", JSON.stringify(consejosGuardados));

            alert("¡Consejo añadido con éxito!");
            formConsejo.reset();
            cargarConsejos();
        });
    }

    cargarConsejos();
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
    // --- MOSTRAR PACK EN VERSION C ---
    const contenedorPack = document.getElementById("c_izq_1");
    if (contenedorPack) {
        // Obtener el pack guardado
        const packGuardado = JSON.parse(localStorage.getItem("packSeleccionado"));

        if (packGuardado) {
            console.log("🧳 Cargando pack:", packGuardado);

            // Elementos de la tarjeta del pack
            const img         = contenedorPack.querySelector(".imagen img");
            const titulo      = contenedorPack.querySelector(".info h3");
            const descripcion = contenedorPack.querySelector(".info p");
            const precio      = contenedorPack.querySelector(".precio");

            if (img && packGuardado.imagen)      img.src = packGuardado.imagen;
            if (titulo)                           titulo.textContent = packGuardado.titulo || "";
            if (descripcion)                      descripcion.textContent = packGuardado.descripcion || "";
            if (precio)                           precio.textContent = packGuardado.precio || "";

            // 🟩 Añadimos la descripción larga (texto inferior)
            const descripcionLarga = document.querySelector("#c_izq_2_texto p");
            if (descripcionLarga) {
                descripcionLarga.textContent = packGuardado.descripcionLarga || "No hay descripción disponible.";
            }

        } else {
            console.warn("⚠️ No hay pack seleccionado en localStorage.");
        }
    }
  
    });

