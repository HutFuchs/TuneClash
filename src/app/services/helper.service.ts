import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HelperService {
	constructor() {}

	// Converts a numeric value to a localized string representation.
	// If the value isn't a valid number, logs an error and returns a warning message.
	toLocal(numericValue: number | string): string {
		const numberValue = typeof numericValue === 'string' ? parseFloat(numericValue) : numericValue;
		if (!isNaN(numberValue)) {
			return numberValue.toLocaleString();
		} else {
			console.error('Invalid numeric value:', numericValue);
			return 'Invalid number';
		}
	}
}
