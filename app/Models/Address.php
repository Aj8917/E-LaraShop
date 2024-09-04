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
        return $this->belongsTo(Order::class);
    }
    
    public function toArray()
    {
        return [
            'order_id' => $this->order ? $this->order->order_id : null,
            'city_id' => $this->city_id,
            'address' => $this->address,
            ];
    }
}
