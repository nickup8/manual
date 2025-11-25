<?php

namespace App\Services\Leadset;

use App\Models\CrimpStandard;
use App\Models\Leadset;
use App\Models\LeadsetLeadset;
use App\Models\LeadsetSeal;
use App\Models\LeadsetTerminal;
use App\Models\LeadsetWire;
use App\Models\Seal;
use App\Models\Terminal;
use App\Models\Wire;
use Illuminate\Support\Facades\DB;

class LeadsetService
{
    public function storeOneLeadset(array $data): Leadset
    {
        return DB::transaction(function () use ($data) {
            // Получаем сущности из базы
            $wire = $this->getWire($data['wire']);
            $terminalOne = !empty($data['terminalOne']) ? $this->getTerminal($data['terminalOne']) : null;
            $terminalTwo = !empty($data['terminalTwo']) ? $this->getTerminal($data['terminalTwo']) : null;
            $sealOne = !empty($data['sealOne']) ? $this->getSeal($data['sealOne']) : null;
            $sealTwo = !empty($data['sealTwo']) ? $this->getSeal($data['sealTwo']) : null;

            // Проверяем обязательные сущности
            if (!$wire) {
                throw new \Exception('Wire не найдены');
            }



            // Ищем кримп-стандарт
            $crimpStandardOne = null;

            if ($terminalOne)
            {
                $crimpStandardOne = $this->getCrimpStandard($terminalOne, $sealOne, $wire, $data['customer']);
            }

            $crimpStandardTwo = null;

            if ($terminalTwo)
            {
                $crimpStandardTwo = $this->getCrimpStandard($terminalTwo, $sealTwo, $wire, $data['customer']);
            }

            $status = $crimpStandardOne && (!$terminalTwo || $crimpStandardTwo) ? 'normal' : 'incomplete';

            // Создаём Leadset
            $leadset = Leadset::create([
                'leadset_number' => $data['leadsetNumber'],
                'description' => $data['description'] ?? null,
                'customer' => $data['customer'],
                'status' => $status,
                'notes' => $data['notes'] ?? null,
            ]);

            // Создаём связи
            $this->createLeadsetWire($leadset->id, $wire->id, $data['wireName'], 1, $data['stripeLengthOne'], $data['stripeLengthTwo']);
            if($terminalOne) {
                $this->createLeadsetTerminal($leadset->id, $terminalOne->id, 1);
            }
            if ($terminalTwo) {
                $this->createLeadsetTerminal($leadset->id, $terminalTwo->id, 2);
            }
            if ($sealOne) {
                $this->createLeadsetSeal($leadset->id, $sealOne->id, 1);
            }
            if ($sealTwo) {
                $this->createLeadsetSeal($leadset->id, $sealTwo->id, 2);
            }

            return $leadset;
        });
    }

    private function getWire(string $wireCode): ?Wire
    {
        return Wire::where('wire_code', $wireCode)->first();
    }

    private function getTerminal(string $partNumber): ?Terminal
    {
        return Terminal::where('part_number', $partNumber)->first();
    }

    private function getSeal(string $partNumber): ?Seal
    {
        return Seal::where('part_number', $partNumber)->first();
    }

    private function getCrimpStandard(Terminal $terminal, ?Seal $seal, Wire $wire, string $customer): ?CrimpStandard
    {
        $query = CrimpStandard::where('terminal_id', $terminal->id)
            ->where('primary_wire_cross_section', $wire->cross_section)
            ->where('primary_wire_type_id', $wire->wire_type_id)
            ->where('customer', $customer);

        if ($seal) {
            $query->where('seal_id', $seal->id);
        }

        return $query->first();
    }

    private function createLeadsetWire(int $leadsetId, int $wireId, string $wireName, int $position, int $stripeLengthOne, int $stripeLengthTwo ): void
    {
        LeadsetWire::create([
            'leadset_id' => $leadsetId,
            'wire_id' => $wireId,
            'wire_name' => $wireName,
            'position' => $position,
            'stripe_length_one' => $stripeLengthOne,
            'stripe_length_two' => $stripeLengthTwo,
        ]);
    }

    private function createLeadsetTerminal(int $leadsetId, int $terminalId, int $position): void
    {
        LeadsetTerminal::create([
            'leadset_id' => $leadsetId,
            'terminal_id' => $terminalId,
            'position' => $position,
        ]);
    }

    private function createLeadsetSeal(int $leadsetId, int $sealId, int $position): void
    {
        LeadsetSeal::create([
            'leadset_id' => $leadsetId,
            'seal_id' => $sealId, // Исправлено: seal_id, а не terminal_id
            'position' => $position,
        ]);
    }

    public function storeTwoLeadsets(array $data): Leadset
    {
        $leadsetOne = $this->getLeadset($data['leadsetOne']);
        $leadsetTwo = $this->getLeadset($data['leadsetTwo']);
        
        $terminal = $this->getTerminal($data['terminalTwo']);
        
        $leadset = Leadset::create([
            'leadset_number' => $data['leadsetNumber'],
            'description' => $data['description'] ?? null,
            'customer' => $data['customer'],
            'status' => 'incomplete',
            'notes' => $data['notes'] ?? null,
        ]);

        $this->createLeadsetLeadset($leadset->id, $leadsetOne->id, 1);
        $this->createLeadsetLeadset($leadset->id, $leadsetTwo->id, 2);
        $this->createLeadsetTerminal($leadset->id, $terminal->id, 2);
        

        return $leadset;

    }

    private function getLeadset(string $leadsetNumber): ?Leadset
    {
        return Leadset::where('leadset_number', $leadsetNumber)->first();
    }

    private function createLeadsetLeadset(int $leadsetOneId, int $leadsetTwoId, int $position): void
    {
        LeadsetLeadset::create([
            'leadset_id' => $leadsetOneId,
            'leadset_2_id' => $leadsetTwoId,
            'position' => $position,
        ]);
    }

    
}