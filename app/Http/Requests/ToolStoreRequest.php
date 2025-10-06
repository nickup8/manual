<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ToolStoreRequest extends FormRequest
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
            'terminal' => ['required', 'string', 'max:255'],
            'inventory_number' => ['required', 'string', 'max:255',],
            'seal' => ['nullable', 'string', 'max:255'],
            'any_seal' => ['nullable', 'string', 'max:255'],
            'primary_wire_type' => ['required', 'numeric', 'max:255'],
            'secondary_wire_type' => ['nullable', 'numeric', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'customer' => ['required', 'string', 'max:255'],
        ];
    }

    

    public function attributes(): array
    {
        return [
            'terminal' => 'терминал',
            'inventory_number' => 'инвентарный номер',
            'seal' => 'уплотнитель',
            'primary_wire_type' => 'тип провода 1',
            'secondary_wire_type' => 'тип провода 2',
            'location' => 'место хранения',
            'customer' => 'заказчик',
        ];
    }

    

    public function messages(): array
    {
        return [
            'terminal.required' => 'Поле терминал обязательно для заполнения.',
            'inventory_number.required' => 'Поле инвентарный номер обязательно для заполнения.',
            'primary_wire_type.required' => 'Выберите тип провода',
            'location.required' => 'Укажите место хранения',
            'customer.required' => 'Укажите заказчика',
        ];
    }
}
