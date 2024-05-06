<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BannerFactory extends Factory
{

    public function definition(): array
    {
        return [
            'position' => 1,
            'title' => fake()->name(),
            'url' => fake()->url(),
            'image' => '',
        ];
    }
}
