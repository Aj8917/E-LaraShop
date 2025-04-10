<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'price',
        'image',
    ];
    public function orders()
    {
        return $this->hasMany(Order::class,'product_id');
    }
    public function inventories()
    {
        return $this->hasMany(Inventory::class,'product_id');
    }
}
