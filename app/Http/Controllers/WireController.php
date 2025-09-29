<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireStoreRequest;
use App\Http\Resources\WireResource;
use App\Http\Resources\WireTypeResource;
use App\Models\Wire;
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
    public function index(Request $request)
    {
        $filter = $request->only([
            'wire_code',
            'wire_type_id',
            'cross_section',
            'base_color_id',
            'stripe_color_id',
        ]);

        $query = Wire::with(['wireType', 'baseColor', 'stripeColor'])
        ->when(isset($filter['wire_code']), function ($q) use ($filter) {
            $q->where('wire_code', 'LIKE', '%' . $filter['wire_code'] . '%');
        })
        ->when(isset($filter['wire_type_id']), function ($q) use ($filter) {
            $q->where('wire_type_id', $filter['wire_type_id']);
        })
        ->when(isset($filter['cross_section']), function ($q) use ($filter) {
            $q->where('cross_section', $filter['cross_section']);
        })
        ->when(isset($filter['base_color_id']), function ($q) use ($filter) {
            $q->where('base_color_id', $filter['base_color_id']);
        })
        ->when(isset($filter['stripe_color_id']), function ($q) use ($filter) {
            $q->where('stripe_color_id', $filter['stripe_color_id']);
        })
        ->when(isset($filter['description']), function ($q) use ($filter) {
            $q->where('description', 'LIKE', '%' . $filter['description'] . '%');
        });

        $query->orderBy('wire_code');

        $wires = $query->paginate(10);
        
        $wire_types = WireType::all();
        $wire_colors = WireColor::all();
        $wires = WireResource::collection($wires);
        return inertia('wires/wire-index', [
            'wire_types' => $wire_types,
            'wire_colors' => $wire_colors,
            'wires' => $wires,
            'filter' => $filter,
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
