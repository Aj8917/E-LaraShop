<?php

namespace Database\Seeders;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            ['name' => 'Mumbai'],
            ['name' => 'Delhi'],
            ['name' => 'Bangalore'],
            ['name' => 'Hyderabad'],
            ['name' => 'Ahmedabad'],
            ['name' => 'Chennai'],
            ['name' => 'Kolkata'],
            ['name' => 'Pune'],
            ['name' => 'Jaipur'],
            ['name' => 'Surat'],
        ];

        DB::table('cities')->insert($cities);
    }

}
