<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Spatie\WelcomeNotification\WelcomesNewUsers;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource(name: 'users', controller: UserController::class)->except(methods: 'show')->withTrashed();
    Route::post(uri: 'users/{user}/restore', action: [UserController::class, 'restore'])->name('users.restore')->withTrashed();
    Route::name('users.')->prefix('users')->group(function (): void {
        Route::get('activity_log', ActivityController::class)->name('activity_log');
        Route::resource(name: 'roles', controller: RoleController::class)->except(methods: 'show');
    });
});

Route::middleware(WelcomesNewUsers::class)->group(function (): void {
    Route::get('welcome/{user}', [WelcomeController::class, 'showWelcomeForm'])->name('welcome');
    Route::post('welcome/{user}', [WelcomeController::class, 'savePassword'])->name('welcome.store');
});

Route::get(uri: 'otp-challenge', action: [OtpController::class, 'show'])->name('otp-challenge.show');
Route::post(uri: 'otp-challenge', action: [OtpController::class, 'store'])->name('otp-challenge.store');
Route::put(uri: 'otp-challenge', action: [OtpController::class, 'update'])->name('otp-challenge.update');

require __DIR__.'/settings.php';
