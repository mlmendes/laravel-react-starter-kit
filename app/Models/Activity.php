<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Lang;
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

    protected function logName(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => __("activity_log.log_name.{$value}")
        );
    }

    protected function subjectType(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => __(array_last(explode('\\', $value)))
        );
    }

    protected function event(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => __("activity_log.event.{$value}")
        );
    }

    protected function attributeChanges(): Attribute
    {
        return Attribute::make(
            get: function (mixed $original) {
                return collect(json_decode($original, true))->mapWithKeys(function ($content, $index) {
                    $attributes = [];
                    foreach ($content as $attribute => $value) {
                        if (Lang::has("validation.attributes.{$attribute}")) {
                            $attributes[__("validation.attributes.{$attribute}")] = $value;
                        } else {
                            $attributes[$attribute] = $value;
                        }
                    }

                    return [$index => $attributes];
                })->all();
            }
        );
    }
}
