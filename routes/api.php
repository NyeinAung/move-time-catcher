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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::group(['prefix' => 'todo-lists'], function () {
    Route::get('/', 'API\TodoListsController@index');
    Route::get('/detail/{id}', 'API\TodoListsController@detail');
    Route::post('/store', 'API\TodoListsController@store');
    Route::post('/update/{id}', 'API\TodoListsController@update');
    Route::post('/delete/{id}', 'API\TodoListsController@delete');
});

Route::group(['prefix' => 'bus-schedule'], function () {
    Route::get('/', 'API\BusScheduleController@index');
    Route::get('/detail/{id}', 'API\BusScheduleController@detail');
    Route::post('/store', 'API\BusScheduleController@store');
    Route::post('/update/{id}', 'API\BusScheduleController@update');
    Route::post('/delete/{id}', 'API\BusScheduleController@delete');
});

Route::group(['prefix' => 'movie-time'], function () {
    Route::get('/', 'API\DecideMovieTimeController@index');
    Route::get('/check', 'API\DecideMovieTimeController@checkMovieTime');
});