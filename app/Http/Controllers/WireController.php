<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireStoreRequest;
use App\Http\Resources\WireTypeResource;
use App\Models\WireColor;
use App\Models\WireType;
use Illuminate\Http\Request;

class WireController extends Controller
{
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
        ]);
    }

    public function store(WireStoreRequest $request)
    {
        $data = $request->validated();
        dd($data);
    }
}
