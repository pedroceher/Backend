<?php
require ('library.php');
//obtener los valores pasados por ajax
$ciudad = $_POST['Ciudad'];
$tipo = $_POST['Tipo'];
$precio = $_POST['Precio'];

//extraer del string de precio el precio menor y mayor
$rango = explode(";", $precio);
$precioMenor = intval($rango[0]);
$precioMayor = intval($rango[1]);
$dataByPrecio = array();
$dataByCiTi = array();

$data = getData(); //obtener todos los datos del archivo

//filtrar los datos por rango de precio
foreach ($data as $key => $value) {
  $valPrecio = preg_replace("/[^0-9]/","",$value['Precio']);
  if ($valPrecio>= $precioMenor && $valPrecio <= $precioMayor ){
    array_push($dataByPrecio, $value);
  }
}

//filtrar los datos filtrados por precio ahora por casa y tipo
foreach ($dataByPrecio as $key => $value) {
  if ($ciudad =="" || $tipo == ""){
    $response = $dataByPrecio;
  }
  if ($ciudad !="" && $tipo == ""){
    if($value['Ciudad'] == $ciudad){
      array_push($dataByCiTi, $value);
    }
    $response =$dataByCiTi;
  }
  if ($ciudad =="" && $tipo != ""){
    if($value['Tipo'] == $tipo){
      array_push($dataByCiTi, $value);
    }
    $response =$dataByCiTi;
  }
  if ($ciudad !="" && $tipo != ""){
    if ($value['Ciudad'] == $ciudad && $value['Tipo'] == $tipo){
      array_push($dataByCiTi, $value);
    }
    $response =$dataByCiTi;
  }
}

echo json_encode($response);

 ?>
