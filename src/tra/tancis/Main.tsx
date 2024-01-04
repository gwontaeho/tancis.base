import { Routes, Route } from "react-router-dom";
import { comnEnvs } from "@/comn/utils";
import { WrhsRouter } from "@/tra/tancis/cgme/router/WrhsRouter";

/*
 * System main router
 * !== 시스템 메인 라우터 ==!
 */
export const Main = () => {
    return (
        <Routes>
            {/*
             * path : 웹 경로 설정, "*" 표시는 하위 모든 주소 매핑
             * element : 해당 path에 매핑될 하위 Router 컴포넌트
             */}
            <Route path={`${comnEnvs.base}/wrhs/*`} element={<WrhsRouter />} />
        </Routes>
    );
};
