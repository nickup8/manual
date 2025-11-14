<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeadsetStoreRequest;

class LeadsetController extends Controller
{
    public function index()
    {
        return inertia('leadsets/leadset-index');
    }

    public function create()
    {
        return inertia('leadsets/leadset-create');
    }

    public function store(LeadsetStoreRequest $request) {
        $data = $request->validated();
        dd($data);
    }
}
