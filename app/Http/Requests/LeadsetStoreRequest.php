<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LeadsetStoreRequest extends FormRequest
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
        
        $wireCount = $this->input('wireCount');
        
        $rules = [
            'wireCount' => 'required|integer|min:1|max:3',
            'leadsetNumber' => 'required|string|max:255|unique:leadsets,leadset_number',
            'customer' => 'required|string|max:255',
        ];

        if ($wireCount === 1) {
            $rules = array_merge($rules, [
               'wire' => 'required|string|max:255|exists:wires,wire_code',
               'wireName' => 'required|string|max:255|unique:leadset_wires,wire_name',
               'stripeLengthOne' => 'required|numeric|min:0|max:255',
               'stripeLengthTwo' => 'required|numeric|min:0|max:255',
               'terminalOne' => 'required|string|max:255|exists:terminals,part_number',
               'terminalTwo' => 'nullable|string|max:255|exists:terminals,part_number',
               'sealOne' => 'nullable|string|max:255|exists:seals,part_number',
               'sealTwo' => 'nullable|string|max:255|exists:seals,part_number',
               'description' => 'nullable|string|max:255',
               'notes' => 'nullable|string|max:255',
            ]);
        } elseif ($wireCount === 2) {
            $rules = array_merge($rules, [
                'leadsetOne' => 'required|string|max:255|exists:leadsets,leadset_number',
                'leadsetTwo' => 'required|string|max:255|exists:leadsets,leadset_number',
                'terminalOne' => 'nullable|string|max:255|exists:terminals,part_number',
                'terminalTwo' => 'required|string|max:255|exists:terminals,part_number',
                'terminalThree' => 'nullable|string|max:255|exists:terminals,part_number',
                'sealOne' => 'nullable|string|max:255|exists:seals,part_number',
                'sealThree' => 'nullable|string|max:255|exists:seals,part_number',
                'locationWiresOne' => 'required|string|max:255|in:inside,near',
            ]);
        } elseif ($wireCount === 3) {
            $rules = array_merge($rules, [
                'leadsetOne' => 'required|string|max:255|exists:leadsets,leadset_number',
                'leadsetTwo' => 'required|string|max:255|exists:leadsets,leadset_number',
                'leadsetThree' => 'required|string|max:255|exists:leadsets,leadset_number',
                'terminalOne' => 'nullable|string|max:255|exists:terminals,part_number',
                'terminalTwo' => 'required|string|max:255|exists:terminals,part_number',
                'terminalThree' => 'required|string|max:255|exists:terminals,part_number',
                'terminalFour' => 'nullable|string|max:255|exists:terminals,part_number',
                'sealOne' => 'nullable|string|max:255|exists:seals,part_number',
                'sealFour' => 'nullable|string|max:255|exists:seals,part_number',
                'locationWiresOne' => 'required|string|max:255|in:inside,near',
                'locationWiresTwo' => 'required|string|max:255|in:inside,near',
            ]);
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'leadsetNumber.required' => 'Поле "Номер полуфабриката" обязательно для заполнения',
            'wire.required' => 'Укажите YPN провода',
            'wireName.required' => 'Укажите номер провода',
            'leadsetOne.required' => 'Укажите номер полуфабриката 1',
            'leadsetTwo.required' => 'Укажите номер полуфабриката 2',
            'leadsetThree.required' => 'Укажите номер полуфабриката 3',
            'terminalOne.required' => 'Укажите номер терминала 1',
            'terminalTwo.required' => 'Укажите номер терминала 2',
            'terminalThree.required' => 'Укажите номер терминала 3',
            'terminalFour.required' => 'Укажите номер терминала 4',
            'locationWires.required' => 'Укажите расположение проводов',
            'locationWiresOne.required' => 'Укажите расположение проводов 1 и 2',
            'locationWiresTwo.required' => 'Укажите расположение проводов 2 и 3',
            'customer.required' => 'Укажите заказчика',
            'leadsetNumber.unique' => 'Полуфабрикат с номером :input уже существует',
            'leadsetOne.exists' => 'Полуфабрикат :input не существует',
            'leadsetTwo.exists' => 'Полуфабрикат :input не существует',
            'leadsetThree.exists' => 'Полуфабрикат :input не существует',
            'terminalOne.exists' => 'Терминал :input не существует',
            'terminalTwo.exists' => 'Терминал :input не существует',
            'terminalThree.exists' => 'Терминал :input не существует',
            'terminalFour.exists' => 'Терминал :input не существует',
            'sealOne.exists' => 'Уплотнитель :input не существует',
            'sealTwo.exists' => 'Уплотнитель :input не существует',
            'sealThree.exists' => 'Уплотнитель :input не существует',
            'sealFour.exists' => 'Уплотнитель :input не существует',
            'wire.exists' => 'Провод :input не существует',
        ];
    }
    public function attributes(): array
    {
        return [
            'leadsetNumber' => 'Номер полуфабриката',
            'wire' => 'YPN провода',
            'wireName' => 'Номер провода',
            'terminalOne' => 'Терминал 1',
            'terminalTwo' => 'Терминал 2',
            'terminalThree' => 'Терминал 3',
            'terminalFour' => 'Терминал 4',
            'locationWires' => 'Расположение проводов',
            'locationWiresOne' => 'Расположение проводов 1 и 2',
            'locationWiresTwo' => 'Расположение проводов 2 и 3',
            'leadsetOne' => 'Полуфабрикат 1',
            'leadsetTwo' => 'Полуфабрикат 2',
            'leadsetThree' => 'Полуфабрикат 3',
            'sealOne' => 'Уплотнитель 1',
            'sealFour' => 'Уплотнитель 4',
            'sealThree' => 'Уплотнитель 3',
            'sealTwo' => 'Уплотнитель 2',
            'wireCount' => 'Количество проводов',
            'customer' => 'Заказчик',
        ];
    }
}
