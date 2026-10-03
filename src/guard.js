import { ValidationError } from './errors.js';

/** Convierte a número y exige que sea válido y >= 0. */
export function nonNegative(value, fieldName) {
  const number = Number(value);
  if (value === null || value === '' || Number.isNaN(number)) {
    throw new ValidationError(`${fieldName} debe ser un valor numérico.`);
  }
  if (number < 0) {
    throw new ValidationError(`${fieldName} no puede ser negativo.`);
  }
  return number;
}

/**
 * Redondea dinero a 2 decimales.
 * toPrecision(12) elimina el ruido de punto flotante (ej. 22968.000000000004).
 */
export function roundMoney(amount) {
  return Math.round(Number((amount * 100).toPrecision(12))) / 100;
}
