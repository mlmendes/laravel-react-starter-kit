<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource(name: 'users', controller: UserController::class)->except(methods: 'show')->withTrashed();
    Route::post(uri: 'users/{user}/restore', action: [UserController::class, 'restore'])->name('users.restore')->withTrashed();
});

require __DIR__.'/settings.php';
