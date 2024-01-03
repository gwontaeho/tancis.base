import { Routes, Route } from "react-router-dom";
import { comnEnvs } from "@/comn/utils";
import { WrhsRouter } from "@/tra/tancis/cgme/router/WrhsRouter";

export const Main = () => {
    return (
        <Routes>
            <Route path={`${comnEnvs.base}/wrhs/*`} element={<WrhsRouter />} />
        </Routes>
    );
};
