<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeadsetStoreRequest;
use App\Http\Resources\WireResource;
use App\Models\Wire;
use Illuminate\Http\Request;

class LeadsetController extends Controller
{
    public function index()
    {
        return inertia('leadsets/leadset-index');
    }

    public function create(Request $request)
    {
        $wires = Wire::all();
        return inertia('leadsets/leadset-create', [
            'wires' => WireResource::collection($wires),
        ]);
    }

    public function store(LeadsetStoreRequest $request) {
        $data = $request->validated();
        dd($data);
    }
}
