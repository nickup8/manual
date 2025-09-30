<?php

namespace App\Services\Terminal;

use App\Models\Terminal;
use Illuminate\Support\Facades\Response;


class TerminalService
{
    public function __construct()
    {
    }

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
}
