<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Customer 1',
            'email' => 'customer1@mail.com',
            'password' => 'customer1'
        ]);

        User::factory()->create([
            'name' => 'Customer 2',
            'email' => 'customer2@mail.com',
            'password' => 'customer2'
        ]);
    }
}
