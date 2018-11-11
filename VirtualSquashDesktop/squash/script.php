<?php 

$local_id = $_GET['local_id'];
$x = $_GET['x'];
$y = $_GET['y'];
$z = $_GET['z'];
$xr = $_GET['xr'];
$yr = $_GET['yr'];
$zr = $_GET['zr'];
if($local_id == 1)
{
	$xpos = $_GET['xpos'];
	$ypos = $_GET['ypos'];
	$zpos = $_GET['zpos'];
}
$fname = 'data'.$local_id.'.xml';
echo $fname.'<br>';

echo file_exists($fname);

$f = fopen($fname, 'w') or die("unable to open ".$php_errormsg);

fwrite($f, '<?xml version="1.0" encoding="UTF-8"?>');
fwrite($f, '<note>');
fwrite($f, '<x'.$local_id.'>'.$x.'</x'.$local_id.'>');
fwrite($f, '<y'.$local_id.'>'.$y.'</y'.$local_id.'>');
fwrite($f, '<z'.$local_id.'>'.$z.'</z'.$local_id.'>');
fwrite($f, '<xr'.$local_id.'>'.$xr.'</xr'.$local_id.'>');
fwrite($f, '<yr'.$local_id.'>'.$yr.'</yr'.$local_id.'>');
fwrite($f, '<zr'.$local_id.'>'.$zr.'</zr'.$local_id.'>');
if($local_id==1)
{
	fwrite($f, '<xpos>'.$xpos.'</xpos>');
	fwrite($f, '<ypos>'.$ypos.'</ypos>');
	fwrite($f, '<zpos>'.$zpos.'</zpos>');
}
fwrite($f, '</note>');
fclose($f);
?>