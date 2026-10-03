import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { PayrollCalculator } from '../src/PayrollCalculator.js';
import { CommissionEmployee } from '../src/employees/CommissionEmployee.js';
import { HourlyEmployee } from '../src/employees/HourlyEmployee.js';
import { SalariedEmployee } from '../src/employees/SalariedEmployee.js';
import { TemporaryEmployee } from '../src/employees/TemporaryEmployee.js';
import { NegativeNetSalaryError } from '../src/errors.js';
import { DeductionPolicy } from '../src/policies/DeductionPolicy.js';

describe('PayrollCalculator', () => {
  const calculator = new PayrollCalculator();

  it('desprendible del asalariado', () => {
    const slip = calculator.calculate(new SalariedEmployee('Ana', '1', 4_000_000, 6));
    assert.equal(slip.grossSalary, 4_400_000);
    assert.equal(slip.benefits['Bono de alimentación'], 1_000_000);
    assert.equal(slip.deductions['Seguro social y pensión'], 176_000);
    assert.equal(slip.deductions['ARL'], 22_968);
    assert.equal(slip.netSalary, 5_201_032);
  });

  it('empleado por horas con fondo de ahorro', () => {
    const slip = calculator.calculate(new HourlyEmployee('Luis', '2', 10_000, 45, 2, true));
    assert.equal(slip.deductions['Fondo de ahorro'], 9_500);
    assert.equal(slip.benefits['Bono de alimentación'], 0);
    assert.equal(slip.netSalary, 444_020.5);
  });

  it('empleado por horas que rechaza el fondo no tiene descuento de ahorro', () => {
    const slip = calculator.calculate(new HourlyEmployee('Luis', '2', 10_000, 40, 2));
    assert.equal(slip.deductions['Fondo de ahorro'], 0);
  });

  it('empleado por comisión recibe bono de alimentación', () => {
    const slip = calculator.calculate(
      new CommissionEmployee('Marta', '3', 2_000_000, 25_000_000, 0.02),
    );
    assert.equal(slip.benefits['Bono de alimentación'], 1_000_000);
    assert.equal(slip.netSalary, 4_103_035);
  });

  it('empleado temporal no recibe beneficios', () => {
    const slip = calculator.calculate(new TemporaryEmployee('Carlos', '4', 2_500_000, 6));
    assert.equal(slip.benefits['Bono de alimentación'], 0);
    assert.equal(slip.netSalary, 2_386_950);
  });

  it('rechaza un salario neto negativo', () => {
    // Deducción de prueba: demuestra el OCP (se agrega sin tocar el calculador).
    class HugeDeduction extends DeductionPolicy {
      get name() { return 'Embargo'; }
      calculate(employee, grossSalary) { return grossSalary * 2; }
    }

    const strict = new PayrollCalculator([], [new HugeDeduction()]);
    assert.throws(
      () => strict.calculate(new SalariedEmployee('Ana', '1', 1_000_000)),
      NegativeNetSalaryError,
    );
  });
});
