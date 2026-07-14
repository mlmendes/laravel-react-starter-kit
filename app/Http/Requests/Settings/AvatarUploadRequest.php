<?php

namespace App\Http\Requests\Settings;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AvatarUploadRequest extends FormRequest
{
    /**
     * @return array<string,string>
     */
    public function attributes(): array
    {
        return [
            'avatar' => __('Profile picture'),
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
            'avatar' => [
                'nullable',
                'file',
                'image',
                Rule::dimensions()
                    ->height(250)
                    ->width(250)
                    ->ratio(1),
            ],
        ];
    }
}
