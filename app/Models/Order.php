<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'customer_id',
        'order_date',
        'start_time',
        'end_time',
        'total_sessions',
        'subtotal',
        'weekend_fee',
        'total_amount',
    ];

    // Relationship: Order belongs to a Customer
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // Relationship: Order has many OrderDetails
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    // Relationship: Order has one Payment
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
