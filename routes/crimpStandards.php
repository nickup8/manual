<?php

use App\Http\Controllers\CrimpStandardController;

Route::middleware('auth')->group(function () {
    Route::resource('crimping', CrimpStandardController::class);

});
