<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Pagination\CursorPaginator;
use Illuminate\Support\Facades\Hash;

readonly class UserService
{
    public function __construct(private UserRepository $userRepository) {}

    /**
     * @return CursorPaginator<int, User>
     */
    public function getAll(): CursorPaginator
    {
        return $this->userRepository->all();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function save(array $data): User
    {
        $data['password'] = Hash::make('');

        return $this->userRepository->save($data);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(User $user, array $data): User
    {
        return $this->userRepository->update($user, $data);
    }

    public function delete(User $user): User
    {
        return $this->userRepository->delete($user);
    }

    public function restore(User $user): User
    {
        return $this->userRepository->restore($user);
    }
}
