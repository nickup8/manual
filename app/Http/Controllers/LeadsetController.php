<?php

namespace App\Http\Controllers;

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
}
