<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
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
                'total_amount' => $cart['price'],
                'status' => "pending",
            ]);

            $createdOrders[] = $createdOrder;
        }


        return response()->json([
            'message' => 'Order(s) created successfully',
            'order_number' => $order_id,
            
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
}
