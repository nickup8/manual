<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrimpStandardStoreRequest;
use App\Http\Resources\CrimpStandardResource;
use App\Http\Resources\WireTypeResource;
use App\Models\CrimpStandard;
use App\Models\Seal;
use App\Models\Terminal;
use App\Models\WireType;
use App\Services\CrimpStandard\CrimpStandardService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CrimpStandardController extends Controller
{

    public function __construct(private CrimpStandardService $crimpStandardService)
    {

    }

    public function index(Request $request)
    {
        $filter = $request->only([
            'terminal',
            'seal',
            'customer', // Добавляем новые фильтры
            'wire_type', // Добавляем новые фильтры
        ]);

        $query = CrimpStandard::query();

        // Применяем все фильтры автоматически
        $query = $this->crimpStandardService->apply($query, $filter);

        $crimpStandards = $query->orderBy('id', 'desc')->paginate(10);

        return inertia('crimp-standards/crimp-standard-index', [
            'crimpStandards' => CrimpStandardResource::collection($crimpStandards),
            'filter' => $filter,
        ]);
    }

    public function create()
    {
        $wireTypes = WireTypeResource::collection(WireType::all());

        return inertia('crimp-standards/crimp-standard-create', [
            'success' => session('success'),
            'wireTypes' => $wireTypes,
            
        ]);
    }

    public function store(CrimpStandardStoreRequest $request)
    {
        try {
            $crimpStandard = $this->crimpStandardService->store($request->validated());
            $seal = $request->validated()['seal'] ? "с уплотнителем {$request->validated()['seal']}" : 'без уплотнителя';
            return back()->with('success', "Параметры для терминала {$crimpStandard['terminal']->part_number} {$seal} успешно созданы");
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors());
        }
    }
}
