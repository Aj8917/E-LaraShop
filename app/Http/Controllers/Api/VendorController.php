<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VendorRequest;
use App\Models\inventory;
use App\Models\Products;

use Date;
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
        $user_id = auth()->user()->id;

        $result = inventory::select('inventories.*')
            ->with('product')
            ->where('vendor_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($inventory) {
                return [
                    'id' => encrypt($inventory->product->id),
                    'title' => $inventory->product->title,
                    'description' => $inventory->product->description,
                    'price' => $inventory->product->price,
                    'image' => $inventory->product->image,
                    'quantity' => $inventory->quantity,
                    'created_at' => Date('d-m-Y', strtotime($inventory->created_at))

                ];
            });
        // dd($result);
        return response()->json($result, 201);

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

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $validatedData = $request->validate([
            'title' => 'required|regex:/^[a-zA-Z0-9\s]*$/',
            'description' => 'required',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            // 'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Image can be optional during updates
        ]);


        // Authorize the action


        DB::beginTransaction();

        try {
            // Decrypt the encrypted ID
            $decryptedId = decrypt($id);

            // Find the product to update
            $product = Products::findOrFail($decryptedId);
            Gate::authorize('update', $product);

            // Handle image upload, if provided
            // if ($request->hasFile('image')) {
            //     $image = $request->file('image');

            //     // Generate a unique name for the image
            //     $imageName = time() . '_' . $image->getClientOriginalName();

            //     // Define the path to store the image
            //     $imagePath = public_path('images/' . $imageName);

            //     // Move the image to 'public/images' directory
            //     $image->move(public_path('images'), $imageName);

            //     // Optionally, delete the old image
            //     if ($product->image) {
            //         @unlink(public_path('images/' . $product->image));
            //     }

            //     // Update the image path
            //     $product->image = $imageName;
            // }

            // Update product details
            $product->update($validatedData);

            // Update or create the inventory record
            $inventory = Inventory::where('product_id', $product->id)
                ->where('vendor_id', auth()->user()->id)
                ->first();

            if ($inventory) {
                $inventory->update([
                    'quantity' => $validatedData['quantity'],
                ]);
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Product updated successfully'], 200);
        } catch (\Exception $e) {
            // Roll back the transaction
            DB::rollBack();

            // Return an error response
            return response()->json([
                'error' => 'Failed to update product and inventory',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        DB::beginTransaction();

        try {
            // Decrypt the ID (if encrypted)
            $decryptedId = decrypt($id);

            // Find the product
            $product = Products::findOrFail($decryptedId);

            // Delete associated inventory
            $inventory = Inventory::where('product_id', $product->id)
                ->where('vendor_id', auth()->user()->id)
                ->first();

            if ($inventory) {
                $inventory->delete();
            }

            // Delete the product's image (if exists)
            if ($product->image) {
                @unlink(public_path('images/' . $product->image));
            }

            // Delete the product
            $product->delete();

            DB::commit();

            return response()->json(['message' => 'Product and inventory deleted successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'Failed to delete product and inventory',
                'message' => $e->getMessage(),
            ], 500);
        }
    }//destroy


}
