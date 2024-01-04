import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils"; // 프로젝트 공통 유틸
import { utils } from "@/tra/tancis/cgme/comn"; // 시스템 공통 유틸
import { Page, Group, Layout, Button } from "@/comn/components"; // 화면 구성 컴포넌트
import { useForm, useFetch, useWijmo, useModal, useStore, useToast } from "@/comn/hooks"; // hook
import { BASE, URLS, APIS, SG_RPCK_ITM_APP_LIST, SF_RPCK_ITM_APP_SRCH } from "./services/RpckItmAppService"; // 서비스

/*
 * @ 화면 컴포넌트 주석
 * @ 메타 시스템을 참고 하여 표준 단어와 용어를 사용하여 작성
 * @ !== ... ==! 치환 부호는 개발 완료 후 한글 주석을 인지하여 제거하기 위한 표시
 * @ 기본 여러줄의 주석 형태를 사용
 * @ 포맷
 * @ [화면명 영문]
 * @ [지환부호시작] [화면명 한글] [치환부호종료]
 *
 * 화면명 영문
 * !== 화면명 한글 ==!
 */

/*
 * Repacking Item Declaration List
 * !== 재포장 BL(품목) 신고서 목록 ==!
 */
export const CGME0411001Q = (props: any) => {
    /*
     * @ 변수에 대한 주석 (기본 Hook 제외)
     * @ 메타 시스템을 참고 하여 표준 단어와 용어를 사용하여 작성
     * @ 기본 한줄 주석 형태를 사용
     * @ 포맷
     * @ [지환부호시작] [한글변수명] [지환부호종료]
     *
     * 예시) const pgeUid = "CGME0411001Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
     * 선언과 동시에 전개가 이루어 지는 경우 변수의 위쪽에 작성
     */

    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */

    const pgeUid = "UI-CGME-0411-001Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변화 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!

    /*
     * @ 화면에서 사용하는 form 객체를 선언
     * @ 기본 변수명은 메타 단어 조합 카멜 표기법을 따름
     * @ 검색 조건일 경우 구분을 위해 폼 이름 뒤에 Srch
     * @ const form = {
     *      [form 이름] : useForm({
     *          defaultSchema: [form의 schema 구조],
     *          defaultValues: [form의 기본 값] || {},
     *      }),
     *      ...
     * }
     */

    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        // Repacking Item Application Search !== 재포장 품목 신청서 검색 ==!
        rpckItmAppSrch: useForm({
            defaultSchema: SF_RPCK_ITM_APP_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    /*
     * @ 화면에서 사용하는 grid 객체를 선언
     * @ 기본 변수명은 메타 단어 조합 카멜 표기법을 따름
     * @ 그리드 변수명 뒤에 List (List) 를 붙여 구분
     * @ const grid = {
     *      [grid 이름] : useWijmo({
     *          defaultSchema: [grid의 schema 구조],
     *          page: [페이지 번호, 기본 0부터 시작],
                size: [한 페이지에 보여줄 데이터 갯수],
     *      }),
     *      ...
     * }
     */

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        // Repacking Item Application List !== 재포장 품목 신청서 목록 ==!
        rpckItmAppList: useWijmo({
            defaultSchema: SG_RPCK_ITM_APP_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * 화면에서 사용하는 api 호출 객체를 선언
     * 기본 변수명은 메타 단어 조합 카멜 표기법을 따름
     * Back-End Controller 메소드명과 동일하게 작성(Back-End 개발 가이드 참조)
     * 
     * 다건 조회    get         getRpckItmAppList
     * 단건 조회    get         getRpckItmApp
     * 등록         create      createRpckItmApp
     * 수정         update      updateRpckItmApp
     * 삭제         delete      deleteRpckItmApp
     * 저장 단건    save        saveRpckItmApp
     * 저장 다건    save        saveRpckItmAppList
     * 실행         execute     executeRpckItmApp
     * 
     * const fetch = {
     *      [fetch 이름] : useFetch({
     *          api: [fetch 실행 api, service 파일의 APIS 에 기재],
     *          enabled: [[fetch 가 실행되기 위한 조건]],
                key: [[fetch 에서 변화를 감지하여 자동실행할 변수]],
                onSuccess : [fetch 실행 성공시 실행],
                onError : [fetch 실행 실패시 실행],
                showToast: [성공/실패 결과 Toast메세지 표시 여부],
     *      }),
     *      ...
     * }
     */

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        // Get Repacking Item Application List !== 재포장 품목 신청서 목록 조회 ==!
        getRpckItmAppList: useFetch({
            api: (page = grid.rpckItmAppList.page) => {
                return APIS.getRpckItmAppList(form.rpckItmAppSrch.getValues(), page, grid.rpckItmAppList.size);
            },
            enabled: comnUtils.isEmpty(form.rpckItmAppSrch.errors) && form.rpckItmAppSrch.isSubmitted,
            key: [grid.rpckItmAppList.page, grid.rpckItmAppList.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.rpckItmAppSrch.getValues(),
                    page: grid.rpckItmAppList.page,
                    size: grid.rpckItmAppList.size,
                });
            },
            onError: () => {},
            showToast: true,
        }),
        deleteRpckItmApp: useFetch({
            api: (dclrNos) => APIS.deleteRpckItmApp(dclrNos),
            onSuccess: () => {
                toast.showToast({ type: "success", content: "msg.00003" });
                modal.openModal({ content: "msg.00003" });
                handler.getRpckItmAppList();
            },
            onError: () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        }),
    };

    /*
     * 화면에서 사용하는 이벤트, 함수를 선언
     * 기본 변수명은 메타 단어 조합 카멜 표기법을 따름
     * fetch 를 호출 하는 메소드: fetch 명과 동일하게 작성
     * 버튼이나 그리드의 이벤트의 경우 : [이벤트종류]_[이벤트대상타입]_[이벤트대상명]
     * 이벤트 대상 타입 : Btn , Grid ... 카멜표기법으로 표시, 첫글자 대문자
     * 이벤트 명 : 카멜표기법으로 표시, 첫글자 대문자
     *
     * const handler = {
     *      [handler 이름] : ()=>{ 함수 },
     *      click_Btn_Save : 저장버튼 클릭
     *      click_Grid_RpckItmAppList : 재포장 품목 신청서 그리드 클릭
     *      ...
     * }
     */

    /*
     * Declaration Event Handler
     * !== 이벤트 핸들러 정의 ==!
     */
    const handler = {
        // Get Repacking Item Application List !== 재포장 품목 신청서 목록 조회 ==!
        getRpckItmAppList: () => {
            form.rpckItmAppSrch.handleSubmit(
                () => {
                    grid.rpckItmAppList.setPage(0);
                    fetch.getRpckItmAppList.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                }
            )();
        },
        // Delete Repacking Item Application !== 재포장 품목 신청서 삭제 ==!
        deleteRpckItmApp: () => {
            const seltList: any[] = grid.rpckItmAppList.getChecked() || [];
            if (comnUtils.isEmpty(seltList)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }

            if (comnUtils.isEmpty(seltList)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }

            const dclrNos: string[] = [];
            seltList.forEach((item) => {
                dclrNos.push(`${item.dcltTin}-${item.dclrYy}-${item.prcsTpCd}-${item.dclrSrno}`);
            });

            fetch.deleteRpckItmApp.fetch(dclrNos.join(","));
        },
        // Click Grid of Repacking Item Application List !== 재포장 품목 신청서 목록 그리드 클릭 ==!
        click_Grid_RpckItmAppList: {
            dclrNo: (data: any) => {
                const dclrNo = `${data.rowValues.dcltTin}-${data.rowValues.dclrYy}-${data.rowValues.prcsTpCd}-${data.rowValues.dclrSrno}`;
                navigate(`${URLS.cgme0411002s}/${dclrNo}`);
            },
        },
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        fetch.getRpckItmAppList.fetch();
    }, []);

    return (
        <Page>
            <Page.Navigation
                base={comnEnvs.base}
                nodes={[...BASE.nodes, { path: "/wrhs/rpck/cgme0411001q", label: "T_RPCK_ITM_DCLR_LST" }]}
            />
            <Page.Header title={t("T_RPCK_ITM_DCLR_LST")} description={t("T_RPCK_ITM_DCLR_LST")} id={pgeUid} />
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control
                                {...form.rpckItmAppSrch.schema.frstRgsrDtmRnge}
                                controlSize={10}
                            ></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmAppSrch.schema.mrn}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmAppSrch.schema.prcssStatCd}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                as={"reset"}
                                onClick={() => {
                                    form.rpckItmAppSrch.reset();
                                }}
                            ></Button>
                        </Layout.Left>
                        <Layout.Right>
                            <Button
                                as="search"
                                onClick={() => {
                                    handler.getRpckItmAppList();
                                }}
                            ></Button>
                        </Layout.Right>
                    </Layout>
                </Group>
            </form>

            <Group>
                <Layout direction="row">
                    <Layout.Right>
                        <Button
                            as="delete"
                            onClick={() => {
                                handler.deleteRpckItmApp();
                            }}
                        ></Button>
                    </Layout.Right>
                </Layout>
                <Wijmo
                    {...grid.rpckItmAppList.grid}
                    data={fetch.getRpckItmAppList.data?.rpckItmAppList}
                    onCellClick={handler.click_Grid_RpckItmAppList}
                />
            </Group>

            <Group bgColor={false}>
                <Layout direction="row">
                    <Layout.Left>
                        <Button
                            onClick={() => {
                                navigate(URLS.cgme0411002s);
                            }}
                        >
                            {t("B_NEW_$0", { 0: t("L_RPCK_BL") })}
                        </Button>
                    </Layout.Left>
                </Layout>
            </Group>
        </Page>
    );
};
