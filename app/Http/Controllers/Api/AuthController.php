<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
class AuthController extends Controller
{


    public function login(Request $request)
    {
        $credentails = $request->only('email', 'password');


        if (Auth::attempt($credentails)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);


        }
        return response()->json(['message' => 'Invalid login creadentials !'], 401);
    }
    public function process(Request $request)
    {

        $cartItems = $request->input('cartItems');
       

    }
}

