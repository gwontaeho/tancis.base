import { Routes, Route } from "react-router-dom";
import { CGME0601001Q } from "@/tra/tancis/cgme/io/spcd/CGME0601001Q";
import { CGME0601002S } from "@/tra/tancis/cgme/io/spcd/CGME0601002S";
import { CGME0602006Q } from "@/tra/tancis/cgme/io/dmsc/CGME0602006Q";
import { CGME0602001Q } from "@/tra/tancis/cgme/io/dmsc/CGME0602001Q";
import { CGME0602021Q } from "@/tra/tancis/cgme/io/stck/CGME0602021Q";
import { CGME0602022Q } from "@/tra/tancis/cgme/io/stck/CGME0602022Q";

/*
 * 응용기능별 Router
 * - 명명규칙 : 응용기능 2 레벨 메타 단어(용어) 카멜표기(첫글자 대문자) + Router
 * - 응용기능 2 레벨 별로 Router 분리 원칙(기본)
 * - 응용기능 레벨별로 소문자로 구분하여 경로 작성
 * - 최종 라우팅하는 주소는 화면 아이디에서 '-' 구분자를 빼고 소문자로 변환하여 작성
 * - element 에 해당 화면 컴포넌트 기입
 * - 화면에서 파라메터로 받아서 사용할 키값은 path 문자열에 ':변수명' 으로 기입하여 해당 컴포넌트 인지하여 사용
 */

export const IoRouter = () => {
    return (
        <Routes>
            <Route path="/spcd/cgme0601001q" element={<CGME0601001Q />} />
            <Route path="/spcd/cgme0601002s" element={<CGME0601002S />} />
            <Route path="/spcd/cgme0601002s/:dclrNo" element={<CGME0601002S />} />
            <Route path="/dmsc/cgme0602001q/" element={<CGME0602001Q />} />
            <Route path="/dmsc/cgme0602006q/" element={<CGME0602006Q />} />
            <Route path="/dmsc/cgme0602006q/:hsCd" element={<CGME0602006Q />} />
            <Route path="/dmsc/cgme0602021q/" element={<CGME0602021Q />} />
            <Route path="/dmsc/cgme0602022q/" element={<CGME0602022Q />} />
            <Route path="/dmsc/cgme0602022q/:key" element={<CGME0602022Q />} />
        </Routes>
    );
};
