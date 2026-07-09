# Laravel React Starter Kit

[![Total Downloads](https://img.shields.io/packagist/dt/mlmendes/laravel-react-starter-kit.svg)](https://packagist.org/packages/mlmendes/laravel-react-starter-kit)

I was tired of configuring the same boilerplate every time I started a new Laravel project, so I've built my own opinionated React starter kit over the original one. This kit introduces features for i18n, better security features and reduced repeated code.

## Core Features

This kit inherits the robust foundation of Laravel and pushes it further:

- **Built-in Laravel authentication:** Fully configured session-based authentication.
- **All Fortify features** enabled by default, including Two-Factor Authentication, Passkeys, and mandatory Email Verification.
- **SPA experience** with React + Inertia.js + Vite.

## What's Different?

I've modified the base kit to solve common development pain points and improve security:

### Security and architecture
- **UUIDs for Users:** The default integer `id` column in the users table has been replaced with `uuid` to prevent user-count inference attacks.
- **Email verification forced by default**
- **Advanced RBAC:** User CRUD with strict Role-Based Access Control powered by `spatie/laravel-permission`.
- **User Invitations:** Seamless user onboarding via email invitations using `spatie/laravel-welcome-notification`.

### UI/UX
- **Pruned repeated code:** Navigation links unified into a single `lib` file, shared seamlessly across both Sidebar and Header layouts.
- **Rich colors:** `shadcn sonner` defined with `richColors` by default for better user feedback visibility.

### Internationalization (i18n)
- **`react-i18next` integration:** Pre-configured with browser language auto-detection and a built-in UI component to switch languages on the go.
  - By the way, it is loaded before the React app, so the users won't see the texts changing before their eyes
  - The chosen/detected language is stored in a cookie, synchronized with Laravel backend via Inertia.
- **Single translation source:** I've built a custom adapter for `react-i18next` so it expects the standard Laravel parameters syntax `:name` instead of the default `{{name}}`. **No need of separate JSON files for back and frontend.**
- **pt-BR included:** The entire starter kit is fully translated into Brazilian Portuguese, serving as a perfect base if you'd like to contribute here by adding more languages, or use on your own project.
  - The original kit doesn't apply user-friendly attribute names on the default profile requests, so I also fixed it... and translated, of course.
  - This translation also includes the default email notifications for **email verification** and **password reset**.

## Installation
Require the package via Composer:

```bash
composer create-project mlmendes/laravel-react-starter-kit
```

Or through the Laravel Installer, if you prefer using it:

```bash
laravel new my-app --using=mlmendes/laravel-react-starter-kit
```

If you don't have the official Laravel installer, [take a look at the docs](https://laravel.com/docs/13.x#installing-php).

## Roadmap
There are more improvements coming next:

- **Multi-level tenancy:** Architecture to support a single application serving multiple clients, where clients can also manage their own sub-clients.
- **Profile Picture Upload:** Built-in avatar management for users.
- **Teams Integration:** Implementing the missing Teams feature from the original starter kit.
- **WorkOS Branch:** A dedicated branch/option for WorkOS authentication.
