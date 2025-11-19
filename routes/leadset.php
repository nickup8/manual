<?php

use App\Http\Controllers\LeadsetController;

Route::middleware('auth')->group(function () {
    Route::resource('leadsets', LeadsetController::class);
    Route::get('leadsets/create/leadset-create-one', [LeadsetController::class, 'createOneLeadset'])->name('leadset.create.one');
    Route::post('leadsets/create/leadset-create-one', [LeadsetController::class, 'storeOneLeadset'])->name('leadset.store.one');
});
