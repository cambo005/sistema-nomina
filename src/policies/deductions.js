import { PayrollConstants as C } from '../constants.js';
import { DeductionPolicy } from './DeductionPolicy.js';

/** Seguro social y pensión: 4% del salario bruto. */
export class SocialSecurityPensionDeduction extends DeductionPolicy {
  get name() {
    return 'Seguro social y pensión';
  }

  calculate(employee, grossSalary) {
    return grossSalary * C.SOCIAL_SECURITY_PENSION_RATE;
  }
}

/** ARL: porcentaje parametrizable sobre el salario bruto. */
export class ArlDeduction extends DeductionPolicy {
  constructor(rate = C.ARL_RATE) {
    super();
    this.rate = rate;
  }

  get name() {
    return 'ARL';
  }

  calculate(employee, grossSalary) {
    return grossSalary * this.rate;
  }
}

/** Aporte del 2% al fondo de ahorro, solo para empleados elegibles que lo aceptaron. */
export class SavingsFundDeduction extends DeductionPolicy {
  get name() {
    return 'Fondo de ahorro';
  }

  calculate(employee, grossSalary) {
    return employee.isEligibleForSavingsFund() ? grossSalary * C.SAVINGS_FUND_RATE : 0;
  }
}
