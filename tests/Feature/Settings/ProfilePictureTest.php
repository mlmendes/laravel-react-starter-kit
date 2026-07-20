<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\assertEquals;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('profile picture page is displayed ', function () {
    $this->actingAs($this->user)
        ->get(route('avatar.view'))
        ->assertOk();
});

test('profile picture can be uploaded and removed', function () {
    Storage::fake('public');
    $file = UploadedFile::fake()->image('avatar.jpg', 250, 250);
    $this->actingAs($this->user)
        ->from(route('avatar.view'))
        ->post(route('avatar.upload'), [
            'avatar' => $file,
        ])
        ->assertRedirectToRoute('avatar.view');

    assertEquals($this->user->getRawOriginal('avatar'), 'avatars/'.$file->hashName());

    Storage::disk('public')->assertExists('avatars/'.$file->hashName());

    $this->actingAs($this->user)
        ->from(route('avatar.view'))
        ->post(route('avatar.upload'), [
            'avatar' => null,
        ])
        ->assertRedirectToRoute('avatar.view');

    Storage::disk('public')->assertMissing('avatars/'.$file);
});
