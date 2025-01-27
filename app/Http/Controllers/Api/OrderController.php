<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAddressRequest;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Address;
use App\Models\Order;
use Illuminate\Http\Request;
use Gate;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(StoreOrderRequest $storeOrderRequest, Order $order)
    {


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $storeOrderRequest)
    {
        Gate::authorize('create', Order::class);

        $userId = auth()->user()->id;
        $cartItems = $storeOrderRequest->input('cartItems');
        $order_id = uniqid('order_'); // Generate a unique order ID for each order

        $createdOrders = [];
        foreach ($cartItems as $cart) {

            $createdOrder = Order::create([
                'user_id' => $userId,
                'order_id' => $order_id,
                'product_id' => $cart['id'],
                'quantity' => $cart['quantity'],
                'total_amount' => $cart['price'] * $cart['quantity'],
                'status' => "pending",
            ]);

            $createdOrders[] = $createdOrder;
        }


        return response()->json([
            'message' => 'Order(s) created successfully',
            'order_id' => $order_id,

        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $orders = Order::with('address.city')
            ->where('order_id', $id)
            ->get();

        // Authorize viewing the orders (assuming authorization applies to all records in the result)
        foreach ($orders as $order) {
            Gate::authorize('view', $order);
        }

        return response()->json($orders);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function storeAddress(StoreAddressRequest $request)
    {

        $city_id = $request->input('city_id');
        $address = $request->input('address');
        $order_id = $request->input('order_id');

        $data = [
            'city_id' => $city_id,
            'address' => $address,
            'order_id' => $order_id[0],
        ];

        Address::create($data);

        return response()->json([
            'message' => 'Address Saved successfully',
            'order_id' => $order_id[0],

        ], 201);

    }//storeAddress

    public function order_history(Request $request)
    {
        $user = $request->user(); // Get authenticated user
        
        $orders = Order::with('address.city')
            ->where('user_id', $user->id)
            ->whereNot('status','pending')
            ->get();
    
        if($orders->isEmpty()){
            return response()->json('No data Found', 204);
        }else{
            return response()->json($orders);
        }
    }//order_history
}
