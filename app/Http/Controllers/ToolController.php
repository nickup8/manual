<?php

namespace App\Http\Controllers;

class ToolController extends Controller
{
    public function index()
    {
        return inertia('tools/tool-index');
    }
}
