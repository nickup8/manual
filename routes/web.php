<?php

use App\Http\Controllers\LeadsetController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('leadsets', LeadsetController::class);
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/wire.php';
require __DIR__.'/terminal.php';
require __DIR__.'/seal.php';
require __DIR__.'/crimpStandards.php';
require __DIR__.'/tool.php';
