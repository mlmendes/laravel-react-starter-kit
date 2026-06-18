<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddWelcomeValidUntilFieldToUsersTable extends Migration
{
    public function up(): void
    {
        Schema::table(table: 'users', callback: function (Blueprint $table) {
            $table->timestamp(column: 'welcome_valid_until')->nullable();
        });
    }
}
