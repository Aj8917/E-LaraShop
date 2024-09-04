<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class SanitizeInput implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
     // Basic XSS protection by stripping tags
     $sanitized = strip_tags($value);
    
     if($sanitized!==$value)
     {
        $fail('The :attribute contains invalid charateres.');
     }
   
    } 
}
