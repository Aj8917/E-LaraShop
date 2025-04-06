<?php

namespace App\Providers;
use App\Events\RegistrationSuccessful;
use App\Listeners\SendWelcomeEmail;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\Products;
use App\Observers\InventoryObserver;
use App\Observers\OrderObserver;
use App\Policies\OrderPolicy;
use App\Policies\ProductPolicy;
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
        Gate::policy(Products::class, ProductPolicy::class);
       
        Order::observe(OrderObserver::class);
        Inventory::observe(InventoryObserver::class);
        Event::listen(
            RegistrationSuccessful::class,
            SendWelcomeEmail::class,
        );
    }
}
