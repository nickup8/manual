<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CrimpStandardStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'terminal' => ['required', 'string', 'max:255'],
            'seal' => ['nullable', 'string', 'max:255'],
            'primary_wire_type' => ['required', 'numeric', 'max:255'],
            'secondary_wire_type' => ['nullable', 'numeric', 'max:255'],
            'primary_wire_cross_section' => ['required', 'numeric', 'min:0.01', 'max:100'],
            'secondary_wire_cross_section' => ['nullable', 'numeric'],
            'strip_length' => ['required', 'numeric', 'min:0.1', 'max:50'],
            'conductor_crimp_height' => ['required', 'numeric', 'min:0.01', 'max:10'],
            'conductor_crimp_height_tolerance' => ['required', 'numeric', 'min:0.01', 'max:5'],
            'conductor_crimp_width_min' => ['required', 'numeric', 'min:0.01', 'max:10'],
            'conductor_crimp_width_max' => ['required', 'numeric', 'min:0.01', 'max:10'],
            'insulation_crimp_height' => ['required', 'numeric', 'min:0.01', 'max:10'],
            'insulation_crimp_height_tolerance' => ['required', 'numeric', 'min:0.01', 'max:5'],
            'insulation_crimp_width_min' => ['required', 'numeric', 'min:0.01', 'max:10'],
            'insulation_crimp_width_max' => ['required', 'numeric', 'min:0.01', 'max:10'],
            'primary_wire_separation_force' => ['required', 'numeric', 'min:0.1', 'max:1000'],
            'secondary_wire_separation_force' => ['nullable', 'numeric' ],
            'location_wires' => ['nullable', 'string', Rule::in(['inside', 'near'])],
            'customer' => ['required', 'string', 'max:255'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->sometimes(
            ['secondary_wire_cross_section', 'secondary_wire_separation_force', 'location_wires'], 
            'required', 
            function ($input) {
                return !empty($input->secondary_wire_type);
            }
        );

        // Дополнительная валидация для min/max значений
        $validator->after(function ($validator) {
            $this->validateMinMaxValues($validator);
        });
        
        $validator->sometimes(
            ['secondary_wire_separation_force', 'secondary_wire_cross_section' ], ['min:0.1', 'max:1000'], function ($input) {
                return !empty($input->secondary_wire_type);
            }
        );
    }

    protected function validateMinMaxValues($validator): void
    {
        $data = $this->all();

        // Проверка что min <= max
        if (isset($data['conductor_crimp_width_min']) && isset($data['conductor_crimp_width_max'])) {
            if ($data['conductor_crimp_width_min'] > $data['conductor_crimp_width_max']) {
                $validator->errors()->add(
                    'conductor_crimp_width_min', 
                    'Минимальная ширина не может быть больше максимальной'
                );
            }
        }

        if (isset($data['insulation_crimp_width_min']) && isset($data['insulation_crimp_width_max'])) {
            if ($data['insulation_crimp_width_min'] > $data['insulation_crimp_width_max']) {
                $validator->errors()->add(
                    'insulation_crimp_width_min', 
                    'Минимальная ширина не может быть больше максимальной'
                );
            }
        }
    }

    public function messages(): array
    {
        return [
            'terminal.required' => 'Поле "Терминал" обязательно для заполнения',
            'primary_wire_type.required' => 'Поле "Тип провода 1" обязательно для заполнения',
            'primary_wire_cross_section.required' => 'Поле "Сечение провода 1" обязательно для заполнения',
            'strip_length.required' => 'Поле "Длина зачистки" обязательно для заполнения',
            'conductor_crimp_height.required' => 'Поле "Высота обжима по жиле" обязательно для заполнения',
            'customer.required' => 'Поле "Заказчик" обязательно для заполнения',
            
            'location_wires.in' => 'Недопустимое значение для расположения проводов',
            
            'secondary_wire_cross_section.required' => 'Сечение провода 2 обязательно при указании типа провода 2',
            'secondary_wire_separation_force.required' => 'Усилие отрыва провода 2 обязательно при указании типа провода 2',
            'location_wires.required' => 'Расположение проводов обязательно при указании типа провода 2',
        ];
    }

    public function attributes(): array
    {
        return [
            'terminal' => 'Терминал',
            'seal' => 'Уплотнитель',
            'primary_wire_type' => 'Тип провода 1',
            'secondary_wire_type' => 'Тип провода 2',
            'primary_wire_cross_section' => 'Сечение провода 1',
            'secondary_wire_cross_section' => 'Сечение провода 2',
            'strip_length' => 'Длина зачистки',
            'conductor_crimp_height' => 'Высота обжима по жиле',
            'conductor_crimp_height_tolerance' => 'Допуск обжима по жиле',
            'conductor_crimp_width_min' => 'Мин. ширина обжима по жиле',
            'conductor_crimp_width_max' => 'Макс. ширина обжима по жиле',
            'insulation_crimp_height' => 'Высота обжима по изоляции',
            'insulation_crimp_height_tolerance' => 'Допуск обжима по изоляции',
            'insulation_crimp_width_min' => 'Мин. ширина обжима по изоляции',
            'insulation_crimp_width_max' => 'Макс. ширина обжима по изоляции',
            'primary_wire_separation_force' => 'Усилие отрыва провода 1',
            'secondary_wire_separation_force' => 'Усилие отрыва провода 2',
            'location_wires' => 'Расположение проводов',
            'customer' => 'Заказчик',
        ];
    }
}