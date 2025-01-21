<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
   
    public function address()
    {
        return $this->hasMany(Address::class, 'city_id', 'id');
    }
    
    public function toArray()
    {
        return [
            
            'id' => $this->id,
            'city'=>$this->name,
         
            ];
    }
}
