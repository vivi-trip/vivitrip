/**
 * @param {Date} date 변환할 날짜데이터
 * @returns {string} 2024-05-22 형식으로 반환
 */
const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
/**
 * @param {string} dateString 선택한 스케줄 날짜
 * @returns {string} '2024/05/22' 형식으로 반환
 */
export const formatDate = (dateString: string) => {
  // 입력된 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 연, 월, 일을 추출
  const year = date.getFullYear().toString().slice(-2); // 연도의 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
  const day = date.getDate().toString().padStart(2, "0"); // 일자를 2자리로 맞춤

  // 원하는 형식으로 포맷팅
  return `${year}/${month}/${day}`;
};

/**
 * @param {string} dateString 선택한 스케줄 날짜
 * @returns {string} '2024/05/22' 형식으로 반환
 */
export const formatDate2 = (dateString: string) => {
  // 입력된 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 연, 월, 일을 추출
  const year = date.getFullYear().toString().slice(-2); // 연도의 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
  const day = date.getDate().toString().padStart(2, "0"); // 일자를 2자리로 맞춤

  // 원하는 형식으로 포맷팅
  return `${year}.${month}.${day}`;
};


export const formatDateToKorean = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};



export default formatDateToYYYYMMDD;
