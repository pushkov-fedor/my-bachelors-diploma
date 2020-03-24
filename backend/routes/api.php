<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/mps/rows/get', function() {
    $mpsLines = file("C:\\model\\inpt.mps");
    // Название строк начинаются со второй строки
    $i = 2;
    $rows = array();
    while($mpsLines[$i] != "COLUMNS\r\n"){
        $lineExploded = explode("  ", $mpsLines[$i]);
        $rowName = trim($lineExploded[1], "\r\n");
        array_push($rows, $rowName);
        $i++;
    }
    return json_encode($rows);
});

Route::get('/mps/columns/get', function(){
    $mpsLines = file("C:\\model\\inpt.mps");
    $i = 2;
    while($mpsLines[$i] !== "COLUMNS\r\n"){
        $i++;
    }
    $i++;
    $columns = array();
    while($mpsLines[$i] !== "RHS\r\n"){
        $lineExploded = explode("  ", $mpsLines[$i]);
        $clearVals = array();
        foreach($lineExploded as $key => $value){
            if($value !== ""){
                array_push($clearVals, $value);
            }
        }
        array_push($columns, $clearVals[0]);
        $i++;
    }
    $columns = array_values(array_unique($columns));
    
    return json_encode($columns);
});
