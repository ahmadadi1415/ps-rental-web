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
            'sessionDate' => 'required|date',
            'sessionStartTime' => 'required|string',
            'sessionEndTime' => 'required|string',
            'selectedConsole' => 'required|exists:products,console_type', // Ensure console exists
        ];
    }
}
