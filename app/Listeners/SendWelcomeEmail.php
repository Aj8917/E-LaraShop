<?php

namespace App\Listeners;

use App\Events\RegistrationSuccessful;
use App\Mail\WelcomeMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Mail;
class SendWelcomeEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(RegistrationSuccessful $event): void
    {
        $user=$event->user;

        Mail::to($user->email)
             ->send(new WelcomeMail($user));
    }
}
