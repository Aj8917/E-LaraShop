<?php

namespace App\Observers;

use App\Models\Inventory;
use Log;

class InventoryObserver
{
    /**
     * Handle the Inventory "created" event.
     */
    public function created(Inventory $inventory): void
    {
        Log::channel('inventory_logs')->info('Inventory added', [
            'product_id' => $inventory->product_id,
            'vendor_id' => $inventory->vendor_id,
            'quantity' => $inventory->quantity,
            'timestamp' => now()
        ]);

    }

    /**
     * Handle the Inventory "updated" event.
     */
    public function updated(Inventory $inventory): void
    {
      
        Log::channel('inventory_logs')->info('Inventory updated', [
            'product_id' => $inventory->product_id,
            'vendor_id' => $inventory->vendor_id,
            'updated_fields' => [
                [
                    'field' => 'quantity',
                    'old_value' => $inventory->getOriginal('quantity'),
                    'new_value' => $inventory->quantity,
                ],
                [
                    'field' => 'updated_at',
                    'old_value' => $inventory->getOriginal('updated_at'),
                    'new_value' => $inventory->updated_at,
                ],
            ],
            'timestamp' => now(),
        ]);
    
    }

    /**
     * Handle the Inventory "deleted" event.
     */
    public function deleted(Inventory $inventory): void
    {
        //
    }

    /**
     * Handle the Inventory "restored" event.
     */
    public function restored(Inventory $inventory): void
    {
        //
    }

    /**
     * Handle the Inventory "force deleted" event.
     */
    public function forceDeleted(Inventory $inventory): void
    {
        Log::channel('inventory_logs')->warning('Inventory deleted', [
            'product_id' => $inventory->product_id,
            'vendor_id' => $inventory->vendor_id,
            'timestamp' => now()
        ]);

    }
}
