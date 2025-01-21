<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $table = 'addresses'; 
    protected $fillable=['order_id','city_id','address'];
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
    public function city()
    {
        return $this->belongsTo(City::class, 'city_id', 'id');
    }
    public function toArray()
    {
        return [
            'order_id' => $this->order ? $this->order->order_id : null,
            'name' => $this->city ? $this->city->name : null, // Add city name
            'address' => $this->address,
            ];
    }
}
