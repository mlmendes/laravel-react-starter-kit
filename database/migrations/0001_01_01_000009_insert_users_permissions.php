<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        batchInsertPermissions(startingWith: 'users:');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        batchDeletePermissions(startingWith: 'users:');
    }
};
