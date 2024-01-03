import { Routes, Route } from "react-router-dom";
import { envs } from "@/comn/utils";
import { WrhsRouter } from "@/tra/tancis/cgme/router/WrhsRouter";

export const Main = () => {
    return (
        <Routes>
            <Route path={`${envs.base}/wrhs/*`} element={<WrhsRouter />} />
        </Routes>
    );
};
