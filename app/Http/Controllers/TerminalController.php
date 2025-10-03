<?php

namespace App\Http\Controllers;

use App\Http\Requests\TerminalStoreRequest;
use App\Http\Resources\TerminalResource;
use App\Models\Terminal;
use App\Services\Terminal\TerminalService;
use Illuminate\Http\Request;

class TerminalController extends Controller
{
    public function __construct(private TerminalService $terminalService) {}

    public function index(Request $request)
    {
        $filter = $request->only([
            'part_number',
            'supplier_part_number',
            'supplier_name',
            'description',

        ]);

        $query = Terminal::when(isset($filter['part_number']), function ($q) use ($filter) {
            $q->where('part_number', 'LIKE', '%'.$filter['part_number'].'%');
        })
            ->when(isset($filter['supplier_part_number']), function ($q) use ($filter) {
                $q->where('supplier_part_number', 'LIKE', '%'.$filter['supplier_part_number'].'%');
            })
            ->when(isset($filter['supplier_name']), function ($q) use ($filter) {
                $q->where('supplier_name', 'LIKE', '%'.$filter['supplier_name'].'%');
            })
            ->when(isset($filter['description']), function ($q) use ($filter) {
                $q->where('description', 'LIKE', '%'.$filter['description'].'%');
            });

        $query->orderBy('id', 'desc');

        $terminals = $query->paginate(10);

        return inertia('terminals/terminal-index', [
            'terminals' => TerminalResource::collection($terminals),
            'filter' => $filter,
        ]);
    }

    public function create()
    {
        return inertia('terminals/terminal-create', [
            'success' => session('success'),
        ]);
    }

    public function store(TerminalStoreRequest $request)
    {
        $data = $request->validated();
        $terminal = $this->terminalService->createTerminal($data);

        return back()->with('success', "Терминал {$terminal->part_number} успешно создан");
    }
}
