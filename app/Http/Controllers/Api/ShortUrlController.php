<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShortUrl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;

class ShortUrlController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $user = auth();
        // dd($user);
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
            'user_id' => $request->user_id
        ]);

        return response()->json([
            'ok' => 1,
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
    public function destroy(int $id)
    {
        $link = ShortUrl::findOrFail($id);
        $link->delete();

        return response()->json([
            'ok' => 1,
            'message' => sprintf('link %s berhasil dihapus', $link->original_url),
            'result' => []
        ], 200);
    }

    public function show_links_by_user_id(int $user_id, Request $request)
    {
        $user = Auth::user();
        if ($user->id != $user_id) {
            return response()->json([
                'ok' => 0,
                'message' => 'you dont have access this api',
                'result' => []
            ], 400);
        }
        $links = ShortUrl::where('user_id', $user_id)->latest()->paginate($request->limit);
        if ($links->isEmpty()) {
            return response()->json([
                'ok' => 0,
                'message' => 'your dont have data short url',
                'result' => []
            ], 404);
        }

        return response()->json([
            'ok' => 1,
            'message' => 'fetch data successfully',
            'result' => $links
        ], 200);
    }
}
