<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Carbon;
use Spatie\Activitylog\Models\Activity as SpatieActivity;

/**
 * @property string $uuid
 * @property string $log_name
 * @property string $description
 * @property string $subject_type
 * @property string $subject_id
 * @property string $event
 * @property string $causer_type
 * @property string $causer_id
 * @property string $attribute_changes
 * @property string $properties
 * @property Carbon|null $created_at
 */
#[Table(name: 'activity_log', key: 'uuid', keyType: 'string', incrementing: false)]
class Activity extends SpatieActivity
{
    use HasUuids;

    public ?string $updated_at = null;
}
