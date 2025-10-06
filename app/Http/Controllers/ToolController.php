<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToolStoreRequest;
use App\Http\Resources\ToolResource;
use App\Http\Resources\WireTypeResource;
use App\Models\Tool;
use App\Models\WireType;
use App\Services\Tool\ToolService;
use Illuminate\Http\Request;

class ToolController extends Controller
{
    public function __construct(private ToolService $toolService)
    {}

    public function index(Request $request)
    {
        $filter = $request->only([
            'terminal',
            'seal',
            'customer', // Добавляем новые фильтры
        ]);

        $query = Tool::query();

        // Применяем все фильтры автоматически
        $query = $this->toolService->apply($query, $filter);

        $tools = $query->orderBy('id', 'desc')->paginate(10);
        
        return inertia('tools/tool-index', [
            'tools' => ToolResource::collection($tools),]);
    }


    public function create()
    {
        $wireTypes = WireTypeResource::collection(WireType::all());
        return inertia('tools/tool-create', [
            'wireTypes' => $wireTypes,
            'success' => session('success'),
        ]);
    }

    public function store(ToolStoreRequest $request)
{
    try {
        $tool = $this->toolService->storeTool($request->validated());
        
        // Формируем сообщение об успехе
        $message = $this->buildSuccessMessage($tool, $request);
        
        return back()->with('success', $message);
    } catch (\Exception $e) {
        return back()->with('error', $e->getMessage());
    }
}

private function buildSuccessMessage(Tool $tool, ToolStoreRequest $request): string
{
    $baseMessage = "Аппликатор {$tool->inventory_number} ";
    
    // Добавляем информацию об уплотнителе
    if ($tool->any_seal) {
        return "{$baseMessage} с любым уплотнителем успешно создан";
    }
    
    if ($tool->seal_id) {
        return "{$baseMessage} для уплотнителя {$request['seal']} успешно создан";
    }
    
    return "{$baseMessage} успешно создан";
}
}
