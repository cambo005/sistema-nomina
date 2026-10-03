// Excepciones propias del dominio de nómina.

/** Error base del sistema de nómina. */
export class PayrollError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

/** Un dato de entrada incumple una regla de negocio. */
export class ValidationError extends PayrollError {}

/** El salario neto calculado resultó negativo. */
export class NegativeNetSalaryError extends PayrollError {}
