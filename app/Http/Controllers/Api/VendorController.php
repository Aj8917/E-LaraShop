<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VendorRequest;
use App\Models\inventory;
use App\Models\Products;

use DB;
use Gate;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VendorRequest $request)
    {


        // Authorize the action using the ProductPolicy's create method
        Gate::authorize('create', Products::class);

        DB::beginTransaction();

        try {

            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Get the original image name (or generate a new one)
                $imageName = time() . '_' . $image->getClientOriginalName(); // Example: to avoid name conflicts

                // Define the path to store the image in 'public/images/'
                $imagePath = public_path('images/' . $imageName);  // Get the full path for storing the image

                // Move the image to 'public/images' directory
                $image->move(public_path('images'), $imageName);

            } else {
                return response()->json(['error' => 'Image is required.'], 400);
            }
            // Create the product first
            $product = Products::create([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'image' => $imageName, // Store the image path in the product
            ]);

            // Create the inventory entry using the product's ID
            Inventory::create([
                'product_id' => $product->id,
                'vendor_id' => auth()->user()->id,
                'quantity' => $request->input('quantity'),
            ]);

            // Commit the transaction
            DB::commit();

            return response()->json('Product Uploaded', 201);
        } catch (\Exception $e) {
            // Roll back the transaction
            DB::rollBack();

            // Return an error response
            return response()->json(['error' => 'Failed to save product and inventory', 'message' => $e->getMessage()], 500);
        }
    }//store

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
