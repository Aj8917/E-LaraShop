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
        if (!Schema::hasTable('addresses')) {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('order_id');
            $table->integer('city_id');
            $table->string('address');
            $table->timestamps();

            $table->foreign('order_id')->references('order_id')->on('orders');
        });
     }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
