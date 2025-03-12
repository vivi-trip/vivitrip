/**
 * @param params - string[]
 * @returns string
 * @description 파라미터가 하나 이상 있을 경우 ?로 시작하고, 나머지는 &로 연결
 */
const convertParamToQueryString: (params: string[]) => string = (
  params: string[],
) => {
  return params.length > 0 ? `?${params.join("&")}` : "";
};

export default convertParamToQueryString;
