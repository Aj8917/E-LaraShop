<?php

use App\Http\Controllers\Api\CitiesController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group([],function () {
    Route::get('/products', [HomeController::class, 'index']);
    Route::get('/product/{id}', [ProductController::class, 'fetchProduct']);
    Route::get('/fetchCities', CitiesController::class);
});

Route::group([],function(){
    Route::post('/register',[AuthController::class,'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/checkout', [OrderController::class, 'store']);
    Route::apiResource('orders', OrderController::class);
    Route::post('/saveAddress', [OrderController::class, 'storeAddress']);
    Route::patch('/products/{id}/refuse', [ProductController::class, 'refuseProduct']);
    Route::post('/fetchOrderDetails/{id}',[OrderController::class ,'show']);

});






