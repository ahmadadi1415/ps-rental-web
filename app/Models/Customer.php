<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;

    // Define the table name (optional if it follows Laravel naming conventions)
    protected $table = 'customers';

    // Mass assignable attributes
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
    ];

    // Relationship: Customer belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relationship: Customer has many Orders
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
