export const ectEnvs = {
    base: `${process.env.REACT_APP_BASE_ECT}`,
};
/*
 * 프로젝트별 공통기능(함수) 사용시 작성
 */
export const ectUtils = {
    /*
     * 샘플 함수
     */
    func: () => {
        console.log("call project common function");
    },
};
