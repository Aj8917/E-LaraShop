<?php

namespace App\Http\Controllers\Api;

use App\Events\RegistrationSuccessful;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Validator;
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
                'user' => $user->name,
                'role' => $user->role->name,
            ]);


        }
        return response()->json(['message' => 'Invalid login creadentials !'], 401);
    }
    public function process(Request $request)
    {

        $cartItems = $request->input('cartItems');


    }

    public function logout(Request $request)
    {
        // Invalidate the user's session or token
        Auth::logout();

        // Optionally, if you are using API tokens (e.g., Laravel Passport or Sanctum):
        // $request->user()->tokens()->delete();

        // Respond with a success message
        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);
    }

    public function register(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/',
            ],

        ], [

            'password.regex' => 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $role = Role::where('name', 'customer')->first();
        //$user=User::create($request->all());
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
        ]);
        event(new RegistrationSuccessful($user));

        return response()->json([
            'message' => 'Registertation Done.',
        ], 201);

    }
}

