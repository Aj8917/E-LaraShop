<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id', // Add other fields you want to mass-assign
        'quantity',
        'total_amount',
        // Include other fillable fields here
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Products::class);
    }

    public function toArray()
    {
        return [
            'id' => $this->id,
            'product' => $this->product->title,
            'quantity' => $this->quantity,
            'total_amount' => $this->total_amount,
            'status' => $this->status,
        ];
    }

}
