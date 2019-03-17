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
    return 'Schedular';
});

$router->get('/user/verify/{token}', 'UsersController@verifyUser');
$router->post('/password/email', 'PasswordController@token');
$router->post('/password/reset', 'PasswordController@reset');


$router->group(['prefix' => 'api/'], function ($router) {

    $router->post('login/','UsersController@authenticate');
    
    $router->get('myprofile/', 'UsersController@details');
    $router->get('test/', 'UsersController@test');
    $router->put('myprofile/{id}/', 'UsersController@update');
        $router->post('register/', 'UsersController@store');

    $router->get('message/', 'MessageController@index');
    $router->post('message/','MessageController@store');
    $router->get('message/archive', 'MessageController@archive');
    $router->get('message/{id}/', 'MessageController@show');
    $router->put('message/{id}/', 'MessageController@update');
    $router->delete('message/{id}/', 'MessageController@destroy');
    $router->post('vstart/', 'PhoneVerificationController@startVerification');
    $router->post('vverify/', 'PhoneVerificationController@verifyCode');




});