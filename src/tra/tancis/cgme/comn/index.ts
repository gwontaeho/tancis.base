import { TFormSchema } from "@/comn/hooks";
import { comnUtils } from "@/comn/utils";

export const cgmEnvs = {
    base: `${process.env.REACT_APP_BASE_CGM}`,
};
/*
 * 프로젝트별 공통기능(함수) 사용시 작성
 */
export const cgmUtils = {
    /*
     * 샘플 함수
     */
    func: () => {
        console.log("call project common function");
    },

    /**
     * !==해당하는 폼에 값을 세팅한다.==!
     * Usage : cgmUtils.setFormValues(location.state, form.{formName})
     * @param state
     * @param form
     */
    setFormValues: (state: any, form: any) => {
        if (!comnUtils.isEmptyObject(state)) {
            Object.entries(state).map(([key, value]) => {
                console.log("key : %s , value: %s", key, value);
                form.setValue(key, value);
                // console.log(form.getValue());
            });
        } else {
            console.log("has no parameter datas.");
        }
    },

    setObjectValues: (fromObj: any, toObj: any) => {
        if (!comnUtils.isEmpty(fromObj)) {
            Object.keys(fromObj).forEach((item: any) => {
                // console.log("setObjectValues items ::: %s", item);
                if (toObj.hasOwnProperty(item)) {
                    toObj[item] = fromObj[item];
                }
            });
        }
    },
};
