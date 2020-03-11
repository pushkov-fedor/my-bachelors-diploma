<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$excel = new COM("Excel.Application") or die("Unable to instantiate excel");
$excel->Application->Visible = 1;
$excel->DisplayAlerts = 0;
$excel->Workbooks->Open('C:\\1.xlsx');
// $excel->Workbooks->Add();
$excel->Workbooks[1]->Activate();

?>