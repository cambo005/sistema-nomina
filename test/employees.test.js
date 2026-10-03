import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { CommissionEmployee } from '../src/employees/CommissionEmployee.js';
import { Employee } from '../src/employees/Employee.js';
import { HourlyEmployee } from '../src/employees/HourlyEmployee.js';
import { SalariedEmployee } from '../src/employees/SalariedEmployee.js';
import { TemporaryEmployee } from '../src/employees/TemporaryEmployee.js';
import { ValidationError } from '../src/errors.js';

describe('SalariedEmployee', () => {
  it('recibe bono del 10% con más de 5 años', () => {
    const e = new SalariedEmployee('Ana', '1', 4_000_000, 6);
    assert.equal(e.calculateBonus(), 400_000);
    assert.equal(e.calculateGrossSalary(), 4_400_000);
  });

  it('no recibe bono con exactamente 5 años', () => {
    const e = new SalariedEmployee('Ana', '1', 4_000_000, 5);
    assert.equal(e.calculateBonus(), 0);
  });
});

describe('HourlyEmployee', () => {
  it('paga solo horas regulares hasta 40', () => {
    assert.equal(new HourlyEmployee('Luis', '2', 10_000, 40).calculateGrossSalary(), 400_000);
  });

  it('paga las horas extra a 1.5x', () => {
    assert.equal(new HourlyEmployee('Luis', '2', 10_000, 45).calculateGrossSalary(), 475_000);
  });

  it('nunca recibe bonos', () => {
    assert.equal(new HourlyEmployee('Luis', '2', 10_000, 50, 10).calculateBonus(), 0);
  });

  it('rechaza horas negativas', () => {
    assert.throws(() => new HourlyEmployee('Luis', '2', 10_000, -1), ValidationError);
  });

  it('elegibilidad del fondo de ahorro', () => {
    assert.equal(new HourlyEmployee('L', '2', 1, 1, 2, true).isEligibleForSavingsFund(), true);
    assert.equal(new HourlyEmployee('L', '2', 1, 1, 1, true).isEligibleForSavingsFund(), false);
    assert.equal(new HourlyEmployee('L', '2', 1, 1, 3, false).isEligibleForSavingsFund(), false);
  });
});

describe('CommissionEmployee', () => {
  it('sin bono extra por debajo de $20M', () => {
    const e = new CommissionEmployee('Marta', '3', 2_000_000, 10_000_000, 0.02);
    assert.equal(e.calculateBonus(), 0);
    assert.equal(e.calculateGrossSalary(), 2_200_000);
  });

  it('bono extra del 3% con ventas superiores a $20M', () => {
    const e = new CommissionEmployee('Marta', '3', 2_000_000, 25_000_000, 0.02);
    assert.equal(e.calculateBonus(), 750_000);
    assert.equal(e.calculateGrossSalary(), 3_250_000);
  });

  it('sin bono extra con exactamente $20M', () => {
    const e = new CommissionEmployee('Marta', '3', 2_000_000, 20_000_000, 0.02);
    assert.equal(e.calculateBonus(), 0);
  });

  it('rechaza ventas negativas', () => {
    assert.throws(
      () => new CommissionEmployee('Marta', '3', 2_000_000, -1, 0.02),
      ValidationError,
    );
  });
});

describe('TemporaryEmployee', () => {
  it('salario fijo, sin bonos y no es permanente', () => {
    const e = new TemporaryEmployee('Carlos', '4', 2_500_000, 6, 10);
    assert.equal(e.calculateGrossSalary(), 2_500_000);
    assert.equal(e.isPermanent, false);
  });

  it('rechaza duración de contrato inválida', () => {
    assert.throws(() => new TemporaryEmployee('Carlos', '4', 2_500_000, 0), ValidationError);
  });
});

describe('Validaciones generales', () => {
  it('el nombre es obligatorio', () => {
    assert.throws(() => new SalariedEmployee('  ', '1', 1_000_000), ValidationError);
  });

  it('rechaza salarios no numéricos', () => {
    assert.throws(() => new SalariedEmployee('Ana', '1', 'abc'), ValidationError);
  });

  it('Employee es abstracta', () => {
    assert.throws(() => new Employee('X', '1'), TypeError);
  });
});
