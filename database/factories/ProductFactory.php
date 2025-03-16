<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'console_type' => $this->faker->randomElement(['PS4', 'PS5']),
            'base_price' => function (array $attributes) {
                return $attributes['console_type'] === 'PS4' ? 30000 : 40000;
            },
        ];
    }
}
