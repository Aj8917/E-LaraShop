<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'title' => 'Apple iPhone 13 Pro',
                'image' => 'airpods.jpg',
                'description' => 'The latest iPhone with A15 Bionic chip and advanced camera system.',
               
                'price' => 999.99,
                
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Samsung Galaxy S21',
                'image' => 'alexa.jpg',
                'description' => 'High-end smartphone with an immersive display and powerful performance.',
                
                'price' => 799.99,
                
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Sony WH-1000XM4',
                'image' => 'camera.jpg',
                'description' => 'Industry-leading noise-canceling headphones with superior sound quality.',
                
                'price' => 349.99,
                
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Dell XPS 13',
                'image' => 'mouse.jpg',
                'description' => 'Compact and powerful laptop with a stunning 4K display.',
               
                'price' => 1199.99,
                
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Nike Air Max 270',
                'image' => 'phone.jpg',
                'description' => 'Stylish and comfortable sneakers with excellent cushioning.',
                
                'price' => 149.99,
                
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'KitchenAid Artisan Stand Mixer',
                'image' => 'playstation.jpg',
                'description' => 'Versatile and durable stand mixer perfect for all your baking needs.',
               
                'price' => 399.99,
                
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
