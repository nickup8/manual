<?php

use App\Http\Controllers\TerminalController;


Route::middleware('auth')->group(function () {
    Route::resource('terminals', TerminalController::class);
    
});