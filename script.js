


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