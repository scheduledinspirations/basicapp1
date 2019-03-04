<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->version();
});
$router->group(['prefix' => 'api/'], function ($router) {
    $router->post('login/','UsersController@authenticate');
    
    $router->get('myprofile/', 'UsersController@details');
    $router->put('myprofile/{id}/', 'UsersController@update');

    $router->get('message/', 'MessageController@index');
    $router->post('message/','MessageController@store');
    $router->get('message/archive', 'MessageController@archive');
    $router->get('message/{id}/', 'MessageController@show');
    $router->put('message/{id}/', 'MessageController@update');
    $router->delete('message/{id}/', 'MessageController@destroy');

});