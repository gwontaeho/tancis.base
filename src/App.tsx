import { Route } from "react-router-dom";
import { Base } from "@/comn";
import { Main } from "@/tra/tancis/Main";
import { useEffect } from "react";

function App() {
    useEffect(() => {}, []);

    return (
        <Base>
            <Route path="*" element={<Main />} />
        </Base>
    );
}

export default App;
