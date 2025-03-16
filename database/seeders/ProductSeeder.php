<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Ensure the table is empty before seeding (optional)
        Product::query()->delete();

        // Manually insert PS4 and PS5 products
        Product::create([
            'console_type' => 'PS4',
            'base_price' => 30000,
        ]);

        Product::create([
            'console_type' => 'PS5',
            'base_price' => 40000,
        ]);
    }
}