<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireTypeStoreRequest;
use App\Http\Resources\WireTypeResource;
use App\Models\WireType;
use App\Services\Wire\WireService;
use Illuminate\Http\Request;

class WireTypeController extends Controller
{
    private WireService $wireService;
    public function __construct()
    {
        $this->wireService = new WireService();
    }

    public function index()
    {
        $wireTypes = WireType::all();
        return inertia('wire-types/wire-type-index',[
            'wireTypes' => WireTypeResource::collection($wireTypes),
        ]);
    }

    public function create()
    {
        return inertia('wire-types/wire-type-create');
    }

    public function store(WireTypeStoreRequest $request)
    {
        
        $this->wireService->createWireType($request);
        return back()->with('success', `Тип провода {$request->type_name} успешно создан`);
    }
}
