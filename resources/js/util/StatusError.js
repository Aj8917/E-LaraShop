// utils/statusError.js
import { toast } from 'react-toastify';

export const handleResponse = (response, successMessage) => {
    if (response.status === 200 || response.status === 201 || successMessage == 'Checkout successful!') {

        toast.success(successMessage);
    } else {
        toast.error('Unexpected response from server.');
    }
};

export const handleError = (error) => {
    if (error.response && error.response.status === 401) {
        toast.error('Unauthorized: Please log in again.');
    } else if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors)
            .flat()
            .map(err => `• ${err}`)
            .join('\n');
        toast.error(`Checkout error:\n${errorMessages}`);
    } else if (error.message) {
        // Handle a typical error message
        toast.error(`An unexpected error occurred: ${error.message}`);
    } else {
        // Convert the entire object to a string to display something meaningful
        toast.error(`Opps ! SOmething went wrong: ${JSON.stringify(error)}`);
    }
};
