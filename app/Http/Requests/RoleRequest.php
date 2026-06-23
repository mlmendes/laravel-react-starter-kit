<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
{
    public function attributes(): array
    {
        return [
            'name' => __('Name'),
            'permissions' => __('Permissions'),
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                $this->role === null
                    ? Rule::unique(table: 'roles', column: 'name')
                    : Rule::unique(table: 'roles', column: 'name')->ignore(id: $this->role->uuid, idColumn: 'uuid'),
            ],
            'permissions' => ['array', 'exists:permissions,uuid'],
        ];
    }
}
