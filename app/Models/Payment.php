<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'payments';

    protected $fillable = [
        'order_id',
        'payment_method',
        'payment_date',
        'amount_paid',
        'snap_token',
        'status',
        'expired_at',
        'paid_at'
    ];

    // Relationship: Payment belongs to an Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    protected $casts = [
        'order_id' => 'string',
        'payment_method' => 'string',
        'payment_date' => 'datetime',
        'amount_paid' => 'integer',
        'snap_token' => 'string',
        'status' => 'string',
        'expired_at'=>'datetime',
        'paid_at' => 'datetime,',
    ];
}
