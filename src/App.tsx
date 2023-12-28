import { Route } from "react-router-dom";
import { Base } from "@/comn";
import { Main } from "@/tra/tancis/Main";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        // if (!indexedDB) return;

        test2();
    }, []);

    const test1 = () => {
        const request = indexedDB.open("TANCIS");

        /**
         * create object store
         */
        request.onupgradeneeded = (event) => {
            console.log("db created");
            const db = request.result;
            db.createObjectStore("COMN_CD", { keyPath: "key" });
            console.log("store created");
        };

        /**
         * db connected
         */
        request.onsuccess = (event) => {
            console.log("db connected");
            const db = request.result;
            const ts = db.transaction("COMN_CD", "readwrite");
            const os = ts.objectStore("COMN_CD");
            os.add({ key: "test", code: [{ a: "a" }, { a: "b" }, { a: "c" }] });
        };
    };

    const test2 = () => {
        const request = indexedDB.open("TANCIS");

        /**
         * db connected
         */
        request.onsuccess = (event) => {
            console.log("db connected");
        };
    };

    return (
        <Base>
            <Route path="*" element={<Main />} />
        </Base>
    );
}

export default App;
