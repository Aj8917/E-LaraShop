<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable=[
        'product_id',
        'vendor_id',
        'quantity',
    ];
    public function product()
    {
        return $this->belongsTo(Products::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

}
