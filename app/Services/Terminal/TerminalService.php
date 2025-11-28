<?php

namespace App\Services\Terminal;

use App\Models\Terminal;

class TerminalService
{
    public function __construct() {}

    public function createTerminal($data)
    {
        $terminal = Terminal::create([
            'part_number' => $data['part_number'],
            'supplier_part_number' => $data['supplier_part_number'],
            'supplier_name' => $data['supplier_name'],
            'description' => $data['description'],
        ]);

        return $terminal;
    }

    public function updateTerminal($terminal, $data) {
        $terminal->update($data);
        return $terminal;
    }
}
