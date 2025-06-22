<?php

use App\Http\Controllers\Api\ShortUrlController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/links/{user_id}', [ShortUrlController::class, 'show_links_by_user_id'])->name('shorturl.show_links_by_user_id');
});

Route::post('/shorten', [ShortUrlController::class, 'store'])->name('shorturl.shorten');
