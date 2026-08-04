<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Carbon;
use Spatie\OneTimePasswords\Models\OneTimePassword as SpatieOneTimePassword;

/**
 * @property string $uuid
 * @property string $password
 * @property string|null $origin_properties
 * @property Carbon $expires_at
 * @property string $authenticatable_type
 * @property string $authenticatable_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Table('one_time_passwords', key: 'uuid', keyType: 'string', incrementing: false)]
class OneTimePassword extends SpatieOneTimePassword
{
    use HasUuids;
}
