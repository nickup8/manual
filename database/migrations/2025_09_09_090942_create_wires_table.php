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
        Schema::create('wires', function (Blueprint $table) {
            $table->id();
            $table->string('wire_code')->unique();
            $table->foreignId('wire_type_id')->constrained('wire_types')->onDelete('cascade');
            $table->decimal('cross_section', 10, 2);
            $table->string('description')->nullable();
            $table->foreignId('base_color_id')->constrained('wire_colors')->onDelete('cascade');
            $table->foreignId('stripe_color_id')->nullable()->constrained('wire_colors')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wires');
    }
};
