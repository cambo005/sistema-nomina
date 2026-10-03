import { PayrollConstants as C } from '../constants.js';
import { nonNegative } from '../guard.js';
import { Employee } from './Employee.js';

/** Pago por horas; las extras (más de 40 h) se pagan a 1.5x. No recibe bonos. */
export class HourlyEmployee extends Employee {
  constructor(name, identification, hourlyRate, hoursWorked,
              yearsOfService = 0, acceptsSavingsFund = false) {
    super(name, identification, yearsOfService);
    this.hourlyRate = nonNegative(hourlyRate, 'Tarifa por hora');
    this.hoursWorked = nonNegative(hoursWorked, 'Horas trabajadas');
    this.acceptsSavingsFund = acceptsSavingsFund;
  }

  calculateBasePay() {
    const regularHours = Math.min(this.hoursWorked, C.REGULAR_HOURS_LIMIT);
    const overtimeHours = Math.max(this.hoursWorked - C.REGULAR_HOURS_LIMIT, 0);

    const regularPay = regularHours * this.hourlyRate;
    const overtimePay = overtimeHours * this.hourlyRate * C.OVERTIME_MULTIPLIER;
    return regularPay + overtimePay;
  }

  isEligibleForSavingsFund() {
    return this.yearsOfService > C.SAVINGS_FUND_MIN_YEARS && this.acceptsSavingsFund;
  }
}
