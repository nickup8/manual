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
        Schema::create('leadset_crimp_standards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('leadset_id')->constrained('leadsets')->onDelete('cascade');
            $table->foreignId('crimp_standard_id')->constrained('crimp_standards')->onDelete('cascade');
            $table->integer('position');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leadset_crimp_standards');
    }
};
