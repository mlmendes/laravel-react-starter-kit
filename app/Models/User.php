<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;
use Spatie\WelcomeNotification\ReceivesWelcomeNotification;

/**
 * @property string $uuid
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $avatar
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable(['name', 'email', 'password', 'avatar'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail, PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, HasRoles, HasUuids, Notifiable, PasskeyAuthenticatable, ReceivesWelcomeNotification, SoftDeletes, TwoFactorAuthenticatable;

    protected $primaryKey = 'uuid';

    /**
     * @return Attribute <string|null, void>
     */
    protected function avatar(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => is_null($value) ? null : Storage::url($value),
        );
    }

    protected static function booted(): void
    {
        static::updating(function (User $user) {
            if ($user->isDirty('avatar') && $user->getRawOriginal('avatar')) {
                Storage::disk('public')->delete($user->getRawOriginal('avatar'));
            }
        });
        static::forceDeleting(function (User $user) {
            if ($user->getRawOriginal('avatar')) {
                Storage::disk('public')->delete($user->getRawOriginal('avatar'));
            }
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function destroyAvatar(): bool
    {
        $relativePath = $this->getRawOriginal('avatar');

        if ($relativePath) {
            if (Storage::disk('public')->delete($relativePath)) {
                return $this->forceFill(['avatar' => null])->save();
            }
        }

        return false;
    }
}
