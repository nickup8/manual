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
        Schema::create('crimp_standards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('terminal_id')->constrained('terminals')->nullOnDelete();
            $table->foreignId('seal_id')->nullable()->constrained('seals')->nullOnDelete();
            $table->foreignId('primary_wire_type_id')->constrained('wires')->nullOnDelete();
            $table->foreignId('secondary_wire_type_id')->nullable()->constrained('wires')->nullOnDelete();
            $table->decimal('primary_wire_cross_section', 3, 2);
            $table->decimal('secondary_wire_cross_section', 3, 2)->nullable();
            $table->decimal('strip_length', 3, 2);
            $table->decimal('conductor_crimp_height', 3, 2);
            $table->decimal('conductor_crimp_height_tolerance', 3, 2);
            $table->decimal('conductor_crimp_width_min', 3, 2);
            $table->decimal('conductor_crimp_width_max', 3, 2);
            $table->decimal('insulation_crimp_height', 3, 2);
            $table->decimal('insulation_crimp_height_tolerance', 3, 2);
            $table->decimal('insulation_crimp_width_min', 3, 2);
            $table->decimal('insulation_crimp_width_max', 3, 2);
            $table->integer('primary_wire_separation_force');
            $table->integer('secondary_wire_separation_force')->nullable();
            $table->enum('location_wires', ['inside', 'near'])->nullable();
            $table->string('customer');
            $table->timestamps();

            $table->unique(['terminal_id', 'seal_id', 'primary_wire_type_id', 'secondary_wire_type_id', 'primary_wire_cross_section', 'secondary_wire_cross_section', 'customer']);

            $table->index(['terminal_id', 'seal_id', 'primary_wire_type_id', 'secondary_wire_type_id', 'primary_wire_cross_section', 'secondary_wire_cross_section']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crimp_standards');
    }
};
