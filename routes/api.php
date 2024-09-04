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

Route::get('/products',[HomeController::class,'index']);

Route::get('/product/{id}',[ProductController::class,'fetchProduct']);


Route::post('/login',[AuthController::class,'login']);


Route::middleware('auth:sanctum')->group(function(){

    Route::post('/checkout',[OrderController::class,'store']);
    Route::apiResource('orders',OrderController::class);
    
    Route::post('/saveAddress',[OrderController::class, 'storeAddress']);
});
Route::get('/fetchCities',CitiesController::class);
// For API routes
Route::post('/logout', [AuthController::class, 'logout']); 
