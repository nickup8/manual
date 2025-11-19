<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeadsetStoreRequest;
use App\Http\Resources\Leadsetresource;
use App\Http\Resources\WireResource;
use App\Models\Leadset;
use App\Models\Wire;
use App\Services\Leadset\LeadsetService;
use Illuminate\Http\Request;

class LeadsetController extends Controller
{

    public function __construct(private LeadsetService  $leadsetService) {

    }

    public function index()
    {
        $leadsets = Leadset::with(['wires', 'terminals.terminal', 'seals'])->get();
    return inertia('leadsets/leadset-index', [
        'leadsets' => LeadsetResource::collection($leadsets),
    ]);
    }

    public function create(Request $request)
    {
        $wires = Wire::all();
        return inertia('leadsets/leadset-create', [
            'wires' => WireResource::collection($wires),
        ]);
    }

    public function createOneLeadset()
    {   $wires = Wire::all();
        return inertia('leadsets/leadset-create-one', [
            'wires' => WireResource::collection($wires),
            'success' => session('success'),
        ]);
    }

    public function store(LeadsetStoreRequest $request) {
        
        //
    }

    public function storeOneLeadset(LeadsetStoreRequest $request) {
        
        $leadset = $this->leadsetService->storeOneLeadset($request->validated());

        return back()->with('success', "Провод {$leadset->leadset_number} успешно создан со статусом {$leadset->status}");

    }
}
