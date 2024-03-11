/**
 * @example 1.1 => 2
 */
const roundToLargerInt = (val: number): number =>
  Number.isInteger(val) ? val : Math.trunc(val) + 1

export default roundToLargerInt
