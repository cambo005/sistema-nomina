/**
 * Contrato que cumple toda deducción (Strategy).
 * Las subclases deben definir `name` y `calculate(employee, grossSalary)`.
 */
export class DeductionPolicy {
  get name() {
    throw new Error('name debe ser implementado por la subclase.');
  }

  /** Valor a descontar al empleado. */
  calculate(employee, grossSalary) {
    throw new Error('calculate() debe ser implementado por la subclase.');
  }
}
