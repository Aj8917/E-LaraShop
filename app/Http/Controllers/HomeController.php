<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Products;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $productsPerPage = 3;
        $products = Products::paginate($productsPerPage);
        $defaultImageUrl = asset('images/default.png');
        
        // Add the default image URL to products with missing images
        foreach ($products as $product) {
            if (empty($product->image)) {
                $product->image = $defaultImageUrl;
            }
        }
        return response()->json($products);
    }
}
