<?php

namespace App\Http\Controllers;

use App\Http\Requests\SealStoreRequest;
use App\Http\Resources\SealColorResource;
use App\Http\Resources\SealResource;
use App\Models\ColorSeal;
use App\Models\Seal;
use App\Services\Seal\SealService;
use Illuminate\Http\Request;

class SealController extends Controller
{
    public function __construct(private SealService $sealService) {}

    public function index(Request $request)
    {

        $filter = $request->only([
            'part_number',
            'supplier_part_number',
            'supplier_name',
            'description',
            'color',
        ]);

        $query = Seal::query();

        // Фильтрация по текстовым полям
        $textFilters = ['part_number', 'supplier_part_number', 'supplier_name', 'description'];
        foreach ($textFilters as $field) {
            if (! empty($filter[$field])) {
                $query->where($field, 'LIKE', '%'.$filter[$field].'%');
            }
        }

        // Фильтрация по цвету
        if (! empty($filter['color'])) {
            $query->where('color_id', $filter['color']);
        }

        $seals = $query->orderBy('id', 'desc')->paginate(10);
        $seal_colors = SealColorResource::collection(ColorSeal::all());

        return inertia('seals/seal-index', [
            'seal_colors' => $seal_colors,
            'seals' => SealResource::collection($seals),
            'queryParams' => $filter, // ⚠️ Важно для синхронизации с фронтендом
            'filter' => $filter, // ⚠️ Для обратной совместимости
        ]);
    }

    public function create()
    {
        $seal_colors = SealColorResource::collection(ColorSeal::all());

        return inertia('seals/seal-create', [
            'seal_colors' => $seal_colors,
            'success' => session('success'),
        ]);
    }

    public function store(SealStoreRequest $request)
    {
        $data = $request->validated();
        $seal = $this->sealService->createSeal($data);

        return back()->with('success', "Уплотнитель {$seal->part_number} успешно создан");
    }
}
