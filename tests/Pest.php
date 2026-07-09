<?php

use App\Models\Permission as PermissionModel;
use App\Models\Role as RoleModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Random\RandomException;
use Tests\TestCase;

use function Pest\Laravel\assertModelExists;
use function Pest\Laravel\from;

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "pest()" function to bind different classes or traits.
|
*/

pest()->extend(TestCase::class)
    ->use(RefreshDatabase::class)
    ->in('Feature');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

function savePassword(string $password): void
{
    $queryString = parse_url(test()->welcomeNotification->showWelcomeFormUrl, PHP_URL_QUERY);
    parse_str($queryString, $queryParams);
    from(test()->welcomeNotification->showWelcomeFormUrl)->post(route('welcome.store', [
        'user' => test()->user,
        'expires' => $queryParams['expires'],
        'signature' => $queryParams['signature'],
    ]), [
        'password' => $password,
        'password_confirmation' => $password,
    ])
        ->assertRedirectToRoute('dashboard');
}

/**
 * @return array<int, string>
 *
 * @throws RandomException
 */
function randomPermissionsIds(): array
{
    return PermissionModel::all()->random(random_int(1, PermissionModel::count()))->pluck('uuid')->toArray();
}

/**
 * @param  array<int, string>  $permissionsIds
 */
function assertRoleExists(string $name, array $permissionsIds): void
{
    $role = RoleModel::query()->where([
        'name' => $name,
    ])->whereHas(relation: 'permissions', callback: function (Builder $query) use ($permissionsIds) {
        $query->whereIn(column: 'uuid', values: $permissionsIds);
    }, operator: '=', count: count($permissionsIds)
    )->whereDoesntHave(relation: 'permissions', callback: function ($query) use ($permissionsIds) {
        $query->whereNotIn(column: 'uuid', values: $permissionsIds);
    })->sole();

    assertModelExists($role);
}
