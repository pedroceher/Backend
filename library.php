<?php

//funcion que lee el archivo de datos y los retorna en un arreglo

function getData(){
  $data_file = fopen("data-1.json","r");
  $data_readed = fread($data_file, filesize("data-1.json"));
  $data = json_decode($data_readed, true);
  fclose($data_file);
  return $data;
}
?>
