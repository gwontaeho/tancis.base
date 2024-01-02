import { Routes, Route } from "react-router-dom";
import { CGME0411001Q } from "@/tra/tancis/cgme/wrhs/rpck/CGME0411001Q";
import { CGME0411002S } from "@/tra/tancis/cgme/wrhs/rpck/CGME0411002S";

export const WrhsRouter = () => {
    return (
        <Routes>
            <Route path="/rpck/cgme0411001q" element={<CGME0411001Q />} />
            <Route path="/rpck/cgme0411002s" element={<CGME0411002S />} />
            <Route path="/rpck/cgme0411002s/:id" element={<CGME0411002S />} />
        </Routes>
    );
};
