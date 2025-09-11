<?php

use App\Http\Controllers\WireTypeController;

Route::middleware('auth')->group(function () {
    Route::resource('wire-types', WireTypeController::class);
});