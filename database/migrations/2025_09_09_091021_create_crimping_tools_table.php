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
        Schema::create('crimping_tools', function (Blueprint $table) {
            $table->id();
            $table->string('inventory_number')->unique();
            $table->foreignId('terminal_id')->constrained('terminals')->onDelete('cascade');
            $table->boolean('seal')->default(false);
            $table->foreignId('primary_wire_id')->nullable()->constrained('wires')->onDelete('cascade');
            $table->foreignId('secondary_wire_id')->nullable()->constrained('wires')->onDelete('cascade');
            $table->string('location');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crimping_tools');
    }
};
