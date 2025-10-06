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
        Schema::create('tools', function (Blueprint $table) {
            $table->id();
            $table->string('inventory_number');
            $table->foreignId('terminal_id')->constrained('terminals')->onDelete('cascade');
            $table->foreignId('seal_id')->nullable()->constrained('seals')->onDelete('cascade');
            $table->string('any_seal')->nullable();
            $table->foreignId('primary_wire_type_id')->nullable()->constrained('wire_types')->onDelete('cascade');
            $table->foreignId('secondary_wire_type_id')->nullable()->constrained('wire_types')->onDelete('cascade');
            $table->string('location');
            $table->string('customer');
            $table->timestamps();


            $table->unique(['inventory_number', 'terminal_id', 'seal_id', 'primary_wire_type_id', 'secondary_wire_type_id', 'customer']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tools');
    }
};
