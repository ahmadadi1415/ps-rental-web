<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'startDate' => 'required|date',
            'startHour' => 'required|integer|min:0|max:24',
            'endDate' => 'required|date',
            'endHour' => 'required|integer|min:0|max:24',
            'selectedConsole' => 'required|exists:products,console_type', // Ensure console exists
        ];
    }
}
