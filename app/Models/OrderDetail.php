<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $table = 'order_details';

    protected $fillable = [
        'order_id',
        'product_id',
        'sessions_ordered',
    ];

    // Relationship: OrderDetail belongs to an Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Relationship: OrderDetail belongs to a Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
