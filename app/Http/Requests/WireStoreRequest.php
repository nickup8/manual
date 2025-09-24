<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WireStoreRequest extends FormRequest
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
            'wire_code' => ['required', 'string', 'max:255', 'unique:wires,wire_code'],
            'wire_type_id' => ['required', 'exists:wire_types,id'],
            'cross_section' => ['required', 'numeric', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'base_color_id' => ['required', 'exists:wire_colors,id'],
            'stripe_color_id' => ['nullable', 'exists:wire_colors,id'],
        ];
    }
}
