<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SealStoreRequest extends FormRequest
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
            'part_number' => ['required', 'string', 'max:255', 'unique:seals,part_number'],
            'supplier_part_number' => ['required', 'string', 'max:255'],
            'supplier_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:255', 'exists:color_seals,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'part_number.required' => 'Введите YPN уплотнителя',
            'supplier_part_number.required' => 'Введите код поставщика',
            'supplier_name.required' => 'Введите название поставщика',
            'color.required' => 'Выберите цвет уплотнителя',
        ];
    }
}
