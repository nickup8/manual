<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leadset_leadsets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('leadset_id')->constrained('leadsets')->onDelete('cascade');
            $table->foreignId('leadset_2_id')->constrained('leadsets')->onDelete('cascade');
            $table->timestamps();
            $table->unique(['leadset_id', 'leadset_2_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leadset_leadsets');
    }
};