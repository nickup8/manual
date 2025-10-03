<?php

use App\Http\Controllers\SealController;

Route::middleware('auth')->group(function () {
    Route::resource('seals', SealController::class);

});
