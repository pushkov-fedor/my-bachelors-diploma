<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello', function () {
    return "Hello";
});

Route::get('/executeExcel', function() {
    $excel = new COM("Excel.Application");
    $excel->Application->Visible = 1;
    $excel->Workbooks->Open("C:\model\OMMM2030.xlsm");
    $excel->Workbooks[1]->Activate();
    $excel->Run("'C:\model\ommm_ieie_Walras.xls'!Button_Solve_GlpSol_WebPlatform", "6384");
    header('Access-Control-Allow-Origin', '*');
    return "Success";
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
