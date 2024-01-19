import { Route, Routes } from "react-router-dom";
import { EFME0104016Q } from "@/tra/tancis/efme/offe/EFME0104016Q";

/*
 * 응용기능별 Router
 * - 명명규칙 : 응용기능 2 레벨 메타 단어(용어) 카멜표기(첫글자 대문자) + Router
 * - 응용기능 2 레벨 별로 Router 분리 원칙(기본)
 * - 응용기능 레벨별로 소문자로 구분하여 경로 작성
 * - 최종 라우팅하는 주소는 화면 아이디에서 '-' 구분자를 빼고 소문자로 변환하여 작성
 * - element 에 해당 화면 컴포넌트 기입
 * - 화면에서 파라메터로 받아서 사용할 키값은 path 문자열에 ':변수명' 으로 기입하여 해당 컴포넌트 인지하여 사용
 */

export const OffeRouter = () => {
    return (
        <Routes>
            <Route path="/efme0104016q" element={<EFME0104016Q />} />
        </Routes>
    );
};
