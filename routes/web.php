<?php

use App\Http\Controllers\Api\ShortUrlController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/links', function () {
    return Inertia::render('DashboardLinks');
})->middleware(['auth', 'verified'])->name('dashboard_links');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/links/{user_id}', [ShortUrlController::class, 'show_links_by_user_id'])->name('shorturl.show_links_by_user_id');
    Route::delete('/links/{user_id}', [ShortUrlController::class, 'destroy'])->name('shorturl.destroy');

});

Route::get('/', function(){
    return Inertia::render('HomePage',[
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
})->name('home');

Route::get('/register', function(){
    return Inertia::render('Auth/Register');
})->name('register');

Route::get('/login', function(){
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/{code}', [ShortUrlController::class, 'show'])->name('shorturl.show');

require __DIR__.'/auth.php';
