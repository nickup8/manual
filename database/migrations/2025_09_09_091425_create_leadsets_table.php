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
        Schema::create('leadsets', function (Blueprint $table) {
            $table->id();
            $table->string('leadset_id')->unique();
            $table->string('description')->nullable();
            $table->string('customer');
            $table->foreignId('wire_id')->constrained('wires')->nullOnDelete();
            $table->foreignId('terminal_id')->nullable()->constrained('terminals')->nullOnDelete();
            $table->foreignId('seal_id_1')->nullable()->constrained('seals')->nullOnDelete();
            $table->foreignId('crimp_standard_id')->nullable()->constrained('crimp_standards')->nullOnDelete();
            $table->enum('status', ['normal', 'incomplite'])->default('incomplite');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leadsets');
    }
};
