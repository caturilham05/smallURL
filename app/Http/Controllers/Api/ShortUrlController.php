<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShortUrl;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;

class ShortUrlController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'original_url' => 'required|url:http,https',
        ], [
            'original_url.url' => 'Please include http or https protocol. eg: http:// or https://'
        ]);

        $short_url = Str::random(7);
        $short_url_created = ShortUrl::create([
            'original_url' => $request->input('original_url'),
            'short_url' => $short_url,
            'visits' => 0,
        ]);

        return response()->json([
            'message' => 'Short URL created successfully',
            'result' => [
                'original_url' => $short_url_created->original_url,
                'short_url' => url($short_url),
                'visits' => $short_url_created->visits,
            ],
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $short_url)
    {
        $short_url = ShortUrl::where('short_url', $short_url)->firstOrFail();
        $short_url->increment('visits');
        return Redirect::to($short_url->original_url, 301);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
