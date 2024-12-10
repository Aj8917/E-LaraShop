<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Gate;
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
    }//fetchProduct

    public function refuseProduct($id)
    {
        
       $product=Products::find($id);

       if(!$product){
        return response()->json([
            'message'=>'Product not found',
        ],status:404);
       }

       if(Gate::denies('refuse',$product)){
          return response()->json([
                'message'=>'Unauthorized access.'
          ],403);
       }

       $product->refuse= !$product->refuse;
       $product->save();

       return response()->json([
           'message' => 'Product flag updated successfully.',
           'flag_for_refuse' => $product->refuse
       ]);
    }//refuseProduct
}
