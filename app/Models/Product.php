<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'console_type',
        'base_price',
    ];

    // Relationship: Product has many OrderDetails
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
