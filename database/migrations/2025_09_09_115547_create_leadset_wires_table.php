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
        Schema::create('leadset_wires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('leadset_id')->constrained('leadsets')->onDelete('cascade');
            $table->foreignId('wire_id')->constrained('wires')->onDelete('cascade');
            $table->string('wire_name')->unique();
            $table->decimal('stripe_length_one', 5, 2);
            $table->decimal('stripe_length_two', 5, 2);
            $table->integer('position');
            $table->unique('leadset_id');
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leadset_wires');
    }
};
