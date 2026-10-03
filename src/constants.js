// Parámetros de negocio centralizados (evita "números mágicos").
export const PayrollConstants = Object.freeze({
  // Empleado asalariado
  SENIORITY_YEARS_FOR_BONUS: 5,
  SALARIED_BONUS_RATE: 0.1,

  // Empleado por horas
  REGULAR_HOURS_LIMIT: 40,
  OVERTIME_MULTIPLIER: 1.5,
  SAVINGS_FUND_MIN_YEARS: 1,
  SAVINGS_FUND_RATE: 0.02,

  // Empleado por comisión
  HIGH_SALES_THRESHOLD: 20_000_000,
  HIGH_SALES_BONUS_RATE: 0.03,

  // Deducciones y beneficios
  SOCIAL_SECURITY_PENSION_RATE: 0.04,
  ARL_RATE: 0.00522, // Riesgo clase I (parametrizable)
  FOOD_ALLOWANCE: 1_000_000,
});
