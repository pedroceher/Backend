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

//  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll

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


//funcion que obtiene lista de ciudades y tipos de casas sin repetir valores
function getCiudades_Tipos(){
  var arrCiudades = [];
  var arrTipos =[];
  $.getJSON("data-1.json", function (data){
    $.each(data, function(key, house){
      if(arrCiudades.indexOf(`${house.Ciudad}`) === -1){
        arrCiudades.push(`${house.Ciudad}`);
      }
      if(arrTipos.indexOf(`${house.Tipo}`) === -1){
        arrTipos.push(`${house.Tipo}`);
      }
    });
    $.each(arrCiudades, function(key, ciudades){
      $('#selectCiudad').append(`<option value="${ciudades}">${ciudades}</option>`);
    });
    $.each(arrTipos, function(key, tipos){
      $('#selectTipo').append(`<option value="${tipos}">${tipos}</option>`);
    });
    $('select').material_select(); //inicializar select del formulario
  });
}

//Funcion click en MOSTRAR Todos

$("#mostrarTodos").click(function(){
  $.ajax({
    url: './showAll.php',
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
    type:'post',
    success:function(response){
      if (response.message && response.message ==""){
        window.alert('El archivo no existe o no contiene datos')
      }else{
        setItems(response);
      }
    },
    error: function(){
      window.alert('Error al obtener datos del archivo')
    }
  })
});

//funcion que filtra dependiendo los valores Ciudad, Tipo y Precio
$('#formulario').submit(function(event){
  event.preventDefault();
  var ciudad = $('#selectCiudad').val();
  var tipo = $('#selectTipo').val();
  var rangoprecio = $('#rangoPrecio').val();
  $.ajax({
      url: './filter.php',
      dataType: "json",
      type: 'post',
      data: {
        Ciudad : ciudad,
        Tipo : tipo,
        Precio : rangoprecio
      },
      success:function(response){
        console.log(response);
        setItems(response);
      },
      error: function(){
        window.alert('Error al obtener datos filtrados');
      }
  });
});

//funcion que renderiza en pantalla los items solicitados
function setItems(data){
  var datos=data;
  $('.renderiza').empty()
  $.each(datos, function(key, house){
    $('.renderiza').append(`
      <div class="card horizontal">
        <div class="card-image ">
          <img class="img-responsive " src="img/home.jpg">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p>
            <b>Dirección: </b>${house.Direccion} </br>
            <b>Ciudad: </b>${house.Ciudad} </br>
            <b>Telefono: </b>${house.Telefono} </br>
            <b>Codigo_Postal: </b>${house.Codigo_Postal} </br>
            <b>Tipo: </b>${house.Tipo} </br>
            <b>Precio: </b><span class = "precioTexto">${house.Precio}</span> </br>
          </p>
          </div>
          <div class="card-action">
            <a>Ver mas</a>
          </div>
        </div>
      </div>
    `);
  });
}

$(document).ready(function(){
  inicializarSlider();
  playVideoOnScroll();
  getCiudades_Tipos();

});
