<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('one_time_passwords', function (Blueprint $table) {
            $table->uuid()->primary();

            $table->string('password');
            $table->text('origin_properties')->nullable();

            $table->dateTime('expires_at')->index();
            $table->uuidMorphs('authenticatable');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('one_time_passwords');
    }
};
