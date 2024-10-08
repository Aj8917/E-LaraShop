<?php

namespace App\Http\Requests;

use App\Rules\SanitizeInput;
use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
        public function rules(): array
        {
            return [
                'order_id'=>'required|exists:orders,order_id',
                'city_id'=>'required|exists:cities,id',
                'address'=>['required','max:255',new SanitizeInput],
            ];
        }
}
