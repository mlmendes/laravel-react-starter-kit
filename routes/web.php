<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Spatie\WelcomeNotification\WelcomesNewUsers;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource(name: 'users', controller: UserController::class)->except(methods: 'show')->withTrashed();
    Route::post(uri: 'users/{user}/restore', action: [UserController::class, 'restore'])->name('users.restore')->withTrashed();
});

Route::middleware(WelcomesNewUsers::class)->group(function () {
    Route::get('welcome/{user}', [WelcomeController::class, 'showWelcomeForm'])->name('welcome');
    Route::post('welcome/{user}', [WelcomeController::class, 'savePassword'])->name('welcome.store');
});

require __DIR__.'/settings.php';
