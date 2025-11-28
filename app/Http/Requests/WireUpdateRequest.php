<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class WireUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('edit-wire');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'wire_code' => ['required', 'string', 'max:255', Rule::unique('wires', 'wire_code')->ignore($this->wire->id)],
            'wire_type_id' => ['required', 'exists:wire_types,id'],
            'cross_section' => ['required', 'numeric', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'base_color_id' => ['required', 'exists:wire_colors,id'],
            'stripe_color_id' => ['nullable', 'exists:wire_colors,id'],
        ];
    }
}
