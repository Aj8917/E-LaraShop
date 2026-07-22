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
        Schema::create('stock_transactions', function (Blueprint $table) {
            $table->id();
             $table->foreignId('product_id')
                ->constrained()
                ->cascadeOnDelete();

            // Transaction type
            $table->enum('type', [
                'top_up',
                'deduct',
                'adjustment',
                'sale',
                'purchase',
                'return',
            ]);

            // Quantity moved
            $table->integer('quantity');

            // Stock before and after (optional but recommended)
            $table->integer('stock_before');
            $table->integer('stock_after');

           
            // User who performed the transaction
            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_transactions');
    }
};
