<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Products;

class ProductController extends Controller
{
    public function fetchProduct($id)
    {
        // Retrieve the product by ID
        $product = Products::find($id);

        // Check if the product exists
        if ($product) {
            return response()->json([
                'product' => $product,
            ]);
        } else {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }
    }
}
