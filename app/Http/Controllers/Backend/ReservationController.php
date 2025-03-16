<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservationOrders = Order::with(['orderDetails', 'product'])->get();
        return Inertia::render('Reservation/Index', ['reservationOrders' => $reservationOrders]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reservation/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationRequest $request)
    {
        $validated = $request->validated();

        // Convert sessionDate to proper format
        $sessionDate = Carbon::parse($validated['sessionDate'])->format('Y-m-d');

        // Convert time strings to integer hours (18:00 -> 18)
        $startHour = (int) explode(':', $validated['sessionStartTime'])[0];
        $endHour = (int) explode(':', $validated['sessionEndTime'])[0];

        // Construct full DateTime objects
        $startTime = Carbon::createFromFormat('Y-m-d H', "$sessionDate $startHour");
        $endTime = Carbon::createFromFormat('Y-m-d H', "$sessionDate $endHour");

        $product = Product::where('console_type', $validated['selectedConsole'])->first();

        // Get the console price
        $subtotal = $product->base_price ?? 0;

        // Calculate weekend fee
        $weekendFee = Carbon::parse($sessionDate)->isWeekend() ? 50000 : 0;

        // Calculate total amount
        $totalAmount = $subtotal + $weekendFee;

        // Create the order
        $order = Order::create([
            'customer_id' => Auth::id(),
            'order_date' => now(),
            'start_time' => $startTime,
            'end_time' => $endTime,
            'subtotal' => $subtotal,
            'weekend_fee' => $weekendFee,
            'total_amount' => $totalAmount,
            'status' => 'pending',
        ]);


        $orderDetails = OrderDetail::create([
            'order_id' => $order->id,
            'product_id' => $product->id
        ]);

        // Redirect back to index
        return to_route('reservation.index')->with('success', 'Reservation created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
