// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// event listeners
eventListeners();

function eventListeners() {
    //cuando usuario agrega nota
    formulario.addEventListener('submit', agregarTweet);

    //cuando documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHtml();
    });

}


//funciones
function agregarTweet(e){
    e.preventDefault();

    //textarea donde escribe usuario
    const tweet = document.querySelector('#tweet').value;
    
    //validacion
    if(tweet === ''){
        mostrarError('La nota no puede ir vacia');
        return;//evita que se siga ejecutando
    }

    //crea id
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //se crea html
    crearHtml();
    
    //reiniciar formulario
    formulario.reset();
}

//mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    
    //insertarlo en html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000)
}

//muestra lista
function crearHtml(){
    limpiarHtml();

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //agrega boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añade funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            //crea html
            const li = document.createElement('li');
           
            //añade el texto
            li.innerText = tweet.tweet;

            //añade boton
            li.appendChild(btnEliminar);
           
            //lo inserta en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//agregar notas a local storage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//eliminar nota 
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHtml();
}

//limpia html
function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}