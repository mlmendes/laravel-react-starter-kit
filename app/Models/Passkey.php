<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Laravel\Passkeys\Contracts\PasskeyUser;
use Laravel\Passkeys\Passkey as LaravelPasskey;

/**
 * @mixin Builder<Passkey>
 *
 * @property string $id
 * @property int|string $user_id
 * @property string $name
 * @property string $credential_id
 * @property array<string, mixed> $credential
 * @property Carbon|null $last_used_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read PasskeyUser $user
 * @property-read string|null $authenticator
 */
#[Table(key: 'id', keyType: 'string', incrementing: false)]
class Passkey extends LaravelPasskey
{
    use HasUuids;

    public function user(): BelongsTo
    {
        // @phpstan-ignore return.type
        return $this->belongsTo(User::class, 'user_id', 'uuid');
    }
}
