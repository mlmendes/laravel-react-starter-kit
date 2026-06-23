<?php

namespace App\Models;

use Database\Factories\RoleFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;

#[Fillable(['name', 'guard_name'])]
class Role extends SpatieRole
{
    /** @use HasFactory<RoleFactory> */
    use HasFactory, HasUuids;

    protected $primaryKey = 'uuid';

    protected $with = ['permissions'];
}
