import { ValidationError } from '../errors.js';
import { nonNegative } from '../guard.js';
import { Employee } from './Employee.js';

/** Salario fijo con contrato a término definido. Sin bonos ni beneficios adicionales. */
export class TemporaryEmployee extends Employee {
  constructor(name, identification, monthlySalary, contractMonths, yearsOfService = 0) {
    super(name, identification, yearsOfService);
    this.monthlySalary = nonNegative(monthlySalary, 'Salario mensual');

    const months = nonNegative(contractMonths, 'Duración del contrato');
    if (months <= 0) {
      throw new ValidationError('La duración del contrato debe ser mayor a 0 meses.');
    }
    this.contractMonths = months;
  }

  calculateBasePay() {
    return this.monthlySalary;
  }
}
