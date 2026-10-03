import { PayrollConstants as C } from '../constants.js';
import { nonNegative } from '../guard.js';
import { Employee } from './Employee.js';

/** Salario fijo mensual; bono del 10% con más de 5 años en la empresa. */
export class SalariedEmployee extends Employee {
  constructor(name, identification, monthlySalary, yearsOfService = 0) {
    super(name, identification, yearsOfService);
    this.monthlySalary = nonNegative(monthlySalary, 'Salario mensual');
  }

  calculateBasePay() {
    return this.monthlySalary;
  }

  calculateBonus() {
    return this.yearsOfService > C.SENIORITY_YEARS_FOR_BONUS
      ? this.monthlySalary * C.SALARIED_BONUS_RATE
      : 0;
  }

  get isPermanent() {
    return true;
  }
}
