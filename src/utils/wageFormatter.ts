/**
 * @param {number} wage 시급을 나타내는 숫자
 * @returns {string} "₩ 1,000" 형식으로 반환
 */
const formatWage = (wage: number): string => {
  const formattedWage = wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₩ ${formattedWage}`;
};


export default formatWage