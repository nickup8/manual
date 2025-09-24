<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireStoreRequest;
use App\Http\Resources\WireTypeResource;
use App\Models\WireColor;
use App\Models\WireType;
use App\Services\Wire\WireService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class WireController extends Controller
{
    public function __construct(private WireService $wireService)
    {

    }
    public function index()
    {
        $wire_types = WireType::all();
        $wire_colors = WireColor::all();
        return inertia('wires/wire-index', [
            'wire_types' => $wire_types,
            'wire_colors' => $wire_colors,
        ]);
    }

    public function create()
    {
        $wire_types = WireType::all();
        $wire_colors = WireColor::all();
        return inertia('wires/wire-create', [
            'wire_types' => WireTypeResource::collection($wire_types),
            'wire_colors' => $wire_colors,
            'success' => session('success'),
            
        ]);
    }

    public function store(WireStoreRequest $request)
    {
        try {
            
        $wire = $this->wireService->createWire($request->validated());

            return back()->with('success', "Провод {$wire->wire_code} успешно создан");
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors());
        }
    }
}
