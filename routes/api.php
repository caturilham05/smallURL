<?php

use App\Http\Controllers\Api\ShortUrlController;
use Illuminate\Support\Facades\Route;

Route::get('/shorten', [ShortUrlController::class, 'store'])->name('shorturl.shorten');
