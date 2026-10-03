import { PayrollConstants as C } from '../constants.js';
import { BenefitPolicy } from './BenefitPolicy.js';

/** Bono de alimentación cubierto por la empresa para empleados permanentes. */
export class FoodAllowanceBenefit extends BenefitPolicy {
  get name() {
    return 'Bono de alimentación';
  }

  calculate(employee) {
    return employee.isPermanent ? C.FOOD_ALLOWANCE : 0;
  }
}
