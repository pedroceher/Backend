/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll

function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}
*/

inicializarSlider();
//playVideoOnScroll();

//Funcion click en MOSTRAR Todos

$("#mostrarTodos").click(function(){
  $.ajax({
    url: './data-1.json',
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    type:'post',
    success:function(response){
      var data =response
      if (data.message && data.message ==""){
        window.alert('El archivo no existe o no contiene datos')
      }else{
        setItems(data);
      }
    },
    error: function(){
      window.alert('Error al obtener datos del archivo')
    }
  })
});

//funcion que renderiza en pantalla los items solicitados
function setItems(datos){
  var data = datos;
  for(var i=0; i<=data.length; i++){
    $('.renderiza').append(`
      <div class="card horizontal">
        <div class="card-image ">
          <img class="img-responsive " src="img/home.jpg">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p>Dirección: ${data[i].Direccion} </br>
            Ciudad: ${data[i].Ciudad} </br>
            Telefono: ${data[i].Telefono} </br>
            Codigo_Postal: ${data[i].Codigo_Postal} </br>
            Tipo: ${data[i].Tipo} </br>
            Precio: ${data[i].Precio} </br>
          </p>
          </div>
          <div class="card-action">
            <a>Ver mas</a>
          </div>
        </div>
      </div>
    `);
  }
}
