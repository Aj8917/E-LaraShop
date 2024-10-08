<?php

namespace App\Providers;
use App\Events\RegistrationSuccessful;
use App\Listeners\SendWelcomeEmail;
use App\Models\Order;
use App\Observers\OrderObserver;
use App\Policies\OrderPolicy;
use Event;
use Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::policy(Order::class, OrderPolicy::class);
        Order::observe(OrderObserver::class);
        Event::listen(
            RegistrationSuccessful::class,
            SendWelcomeEmail::class,
        );
    }
}
