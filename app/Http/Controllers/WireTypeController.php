<?php

namespace App\Http\Controllers;

use App\Http\Requests\WireTypeStoreRequest;
use App\Http\Resources\WireTypeResource;
use App\Models\WireType;
use App\Services\Wire\WireService;
use Illuminate\Http\Request;

class WireTypeController extends Controller
{
    
    public function __construct(private WireService $wireService)
{
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
        logger('Session data:', session()->all());
    logger('Success message:', [session('success')]);
        return inertia('wire-types/wire-type-create', [
            'success' => session('success'),
        ]);
    }

    public function store(WireTypeStoreRequest $request)
    {
        
        $wireType = $this->wireService->createWireType($request->validated());
    
    // Для Inertia используем специальный метод
    return back()
        ->with('success', "Тип провода {$wireType->type_name} успешно создан");
    }
}
