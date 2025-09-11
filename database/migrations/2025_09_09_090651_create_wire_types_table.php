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
        Schema::create('wire_types', function (Blueprint $table) {
            $table->id();
            $table->string('type_name');
            $table->string('type_code');
            $table->timestamps();

            $table->unique(['type_name', 'type_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wire_types');
    }
};
