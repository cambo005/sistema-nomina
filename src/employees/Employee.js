import { ValidationError } from '../errors.js';
import { nonNegative } from '../guard.js';

/**
 * Clase base abstracta de todo empleado.
 * Cada subclase define cómo calcula su pago (polimorfismo).
 * Las deducciones y beneficios generales viven en otras clases (SRP).
 */
export class Employee {
  constructor(name, identification, yearsOfService = 0) {
    if (new.target === Employee) {
      throw new TypeError('Employee es abstracta y no se puede instanciar.');
    }
    if (typeof name !== 'string' || name.trim() === '') {
      throw new ValidationError('El nombre es obligatorio.');
    }
    this.name = name.trim();
    this.identification = identification;
    this.yearsOfService = nonNegative(yearsOfService, 'Años de servicio');
  }

  /** Pago base del periodo, sin bonos. Debe implementarlo cada subclase. */
  calculateBasePay() {
    throw new Error('calculateBasePay() debe ser implementado por la subclase.');
  }

  /** Bono del periodo. Por defecto no hay bono. */
  calculateBonus() {
    return 0;
  }

  /** Salario bruto = pago base + bono (Template Method). */
  calculateGrossSalary() {
    return this.calculateBasePay() + this.calculateBonus();
  }

  /** Indica si recibe el bono de alimentación. */
  get isPermanent() {
    return false;
  }

  /** Indica si puede aportar al fondo de ahorro. */
  isEligibleForSavingsFund() {
    return false;
  }
}
