import { PayrollCalculator } from './PayrollCalculator.js';
import { CommissionEmployee } from './employees/CommissionEmployee.js';
import { HourlyEmployee } from './employees/HourlyEmployee.js';
import { SalariedEmployee } from './employees/SalariedEmployee.js';
import { TemporaryEmployee } from './employees/TemporaryEmployee.js';

const formatMoney = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
  }).format(value);

function printPayslip(payslip) {
  console.log(`\n=== ${payslip.employeeName} ===`);
  console.log(`Salario bruto: ${formatMoney(payslip.grossSalary)}`);
  for (const [name, value] of Object.entries(payslip.benefits)) {
    console.log(`  + ${name}: ${formatMoney(value)}`);
  }
  for (const [name, value] of Object.entries(payslip.deductions)) {
    console.log(`  - ${name}: ${formatMoney(value)}`);
  }
  console.log(`Salario neto: ${formatMoney(payslip.netSalary)}`);
}

const employees = [
  new SalariedEmployee('Ana Gómez', '1001', 4_000_000, 6),
  new HourlyEmployee('Luis Pérez', '1002', 10_000, 45, 2, true),
  new CommissionEmployee('Marta Ruiz', '1003', 2_000_000, 25_000_000, 0.02),
  new TemporaryEmployee('Carlos Díaz', '1004', 2_500_000, 6),
];

const calculator = new PayrollCalculator();
employees.forEach((employee) => printPayslip(calculator.calculate(employee)));
