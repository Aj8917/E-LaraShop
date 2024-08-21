<?php

namespace App\Observers;

use App\Models\order;
use App\Models\OrderLog;
use Illuminate\Support\Facades\Log;

class OrderObserver
{
    /**
     * Handle the order "created" event.
     */
    public function created(order $order): void
    {
        $this->logOrderAction($order,'created');
    }

    /**
     * Handle the order "updated" event.
     */
    public function updated(order $order): void
    {
        //
    }

    /**
     * Handle the order "deleted" event.
     */
    public function deleted(order $order): void
    {
        //
    }

    /**
     * Handle the order "restored" event.
     */
    public function restored(order $order): void
    {
        //
    }

    /**
     * Handle the order "force deleted" event.
     */
    public function forceDeleted(order $order): void
    {
        //
    }

    protected function logOrderAction(Order $order, string $action)
    {
        $changes=$order->getChanges();
        
        OrderLog::create([
            'order_id'=>$order->id,
            'user_id'=>auth()->id(),
            'action'=>$action,
            'changes'=>json_encode($changes)
        ]);

        Log::channel('order_logs')->info("Order {$action}: ", [
            'order_id' => $order->id,
            'user_id' => auth()->id(),
            'changes' => $changes,
        ]);
    }
}
