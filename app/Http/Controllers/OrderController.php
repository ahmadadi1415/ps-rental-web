<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'startDate' => 'required|date',
            'startHour' => 'required|integer|min:0|max:24',
            'endDate' => 'required|date',
            'endHour' => 'required|integer|min:0|max:24',
            'selectedConsole' => 'required|exists:products,id', // Ensure console exists
        ]);

        // Convert start and end datetime
        $startTime = Carbon::parse($validatedData['startDate'])->setHour($validatedData['startHour'])->setMinute(0);
        $endTime = Carbon::parse($validatedData['endDate'])->setHour($validatedData['endHour'])->setMinute(0);

        // Calculate total hours
        $totalHours = $endTime->diffInHours($startTime);

        // Get product price (PS4 = 30,000, PS5 = 40,000)
        $product = Product::findOrFail($validatedData['selectedConsole']);
        $basePricePerSession = $product->base_price;

        // Calculate subtotal
        $subtotal = $totalHours * $basePricePerSession;

        // Check if the order starts on a Saturday (6) or Sunday (0)
        $weekendFee = ($startTime->isSaturday() || $startTime->isSunday()) ? 50000 : 0;

        // Calculate total amount
        $totalAmount = $subtotal + $weekendFee;

        // Create order
        $order = Order::create([
            'customer_id' => Auth::id(), // Assuming logged-in user
            'order_date' => now()->toDateString(),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'total_hour' => $totalHours,
            'subtotal' => $subtotal,
            'weekend_fee' => $weekendFee,
            'total_amount' => $totalAmount,
        ]);

        return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
