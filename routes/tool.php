<?php 

use App\Http\Controllers\ToolController;

Route::middleware('auth')->group(function () {
    Route::resource('applicators', ToolController::class);
    
});