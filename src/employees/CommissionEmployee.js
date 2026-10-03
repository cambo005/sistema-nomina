import { PayrollConstants as C } from '../constants.js';
import { nonNegative } from '../guard.js';
import { Employee } from './Employee.js';

/** Salario base + comisión; bono del 3% si las ventas superan $20.000.000. */
export class CommissionEmployee extends Employee {
  constructor(name, identification, baseSalary, sales, commissionRate, yearsOfService = 0) {
    super(name, identification, yearsOfService);
    this.baseSalary = nonNegative(baseSalary, 'Salario base');
    this.sales = nonNegative(sales, 'Ventas');
    this.commissionRate = nonNegative(commissionRate, 'Porcentaje de comisión');
  }

  calculateBasePay() {
    return this.baseSalary + this.sales * this.commissionRate;
  }

  calculateBonus() {
    return this.sales > C.HIGH_SALES_THRESHOLD
      ? this.sales * C.HIGH_SALES_BONUS_RATE
      : 0;
  }

  get isPermanent() {
    return true;
  }
}
