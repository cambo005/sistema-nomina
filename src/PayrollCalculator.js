import { NegativeNetSalaryError } from './errors.js';
import { roundMoney } from './guard.js';
import { FoodAllowanceBenefit } from './policies/FoodAllowanceBenefit.js';
import {
  ArlDeduction,
  SavingsFundDeduction,
  SocialSecurityPensionDeduction,
} from './policies/deductions.js';

/** Suma los valores de un objeto { nombre: valor }. */
const sumValues = (record) => Object.values(record).reduce((total, v) => total + v, 0);

/**
 * Orquesta empleado + beneficios + deducciones.
 * Depende de abstracciones (DIP): recibe las políticas por constructor,
 * por lo que se pueden agregar nuevas sin modificar esta clase (OCP).
 */
export class PayrollCalculator {
  constructor(
    benefits = [new FoodAllowanceBenefit()],
    deductions = [
      new SocialSecurityPensionDeduction(),
      new ArlDeduction(),
      new SavingsFundDeduction(),
    ],
  ) {
    this.benefits = benefits;
    this.deductions = deductions;
  }

  /** Calcula el desprendible (payslip) de un empleado. */
  calculate(employee) {
    const gross = employee.calculateGrossSalary();

    const benefits = {};
    for (const benefit of this.benefits) {
      benefits[benefit.name] = roundMoney(benefit.calculate(employee, gross));
    }

    const deductions = {};
    for (const deduction of this.deductions) {
      deductions[deduction.name] = roundMoney(deduction.calculate(employee, gross));
    }

    const net = roundMoney(roundMoney(gross) + sumValues(benefits) - sumValues(deductions));

    // Regla de negocio: ningún empleado puede tener salario neto negativo.
    if (net < 0) {
      throw new NegativeNetSalaryError(
        `El salario neto de ${employee.name} es negativo (${net}).`,
      );
    }

    return Object.freeze({
      employeeName: employee.name,
      grossSalary: roundMoney(gross),
      benefits,
      deductions,
      netSalary: net,
    });
  }
}
