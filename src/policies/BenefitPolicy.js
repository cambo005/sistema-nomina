/**
 * Contrato que cumple todo beneficio adicional (Strategy).
 * Las subclases deben definir `name` y `calculate(employee, grossSalary)`.
 */
export class BenefitPolicy {
  get name() {
    throw new Error('name debe ser implementado por la subclase.');
  }

  /** Valor del beneficio que recibe el empleado. */
  calculate(employee, grossSalary) {
    throw new Error('calculate() debe ser implementado por la subclase.');
  }
}
