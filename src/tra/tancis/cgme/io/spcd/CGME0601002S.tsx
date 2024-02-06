import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { cgmUtils } from "@/tra/tancis/cgme/comn";
import { Page, Group, Layout, Button, Wijmo } from "@/comn/components";
import { useForm, useFetch, useWijmo, useModal, useToast, usePopup, useStore } from "@/comn/hooks";
import { APIS, BASE, PRCS_TP_CD, SF_SPCD_APP, SG_SPCD_LIST, URLS } from "./services/CgmeSpcdAppService";

/*
 * Specific Code Declaration Registration
 * !== 특정 코드 신고서 등록 ==!
 */
export const CGME0601002S = () => {
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-CGME-0601-002S"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { pgeStore, setStore, getStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변화 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { dclrNo } = useParams(); // Key Parameter !== 넘어온 키 Parameter ==!
    const { openPopup } = usePopup();

    const [gridSpcdList, setSpcdList] = useState({ content: [], page: {} }); //특정코드 목록
    const [prcssStatCd, setPrcssStatCd] = useState({ statCd: PRCS_TP_CD.NONE, editable: true });

    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        spcdApp: useForm({
            defaultSchema: SF_SPCD_APP,
            defaultValues: { prcsTpCd: "S" },
        }),
    };

    /*
     * Specific Code List Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        // Specific Code List !== 특정코드 목록 ==!
        spcdList: useWijmo({
            defaultSchema: SG_SPCD_LIST,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        // 특정코드 신청서 상세  조회
        getSpcdApp: useFetch({
            api: (data) => APIS.getSpcdApp(dclrNo),
            enabled: !!dclrNo,
            onSuccess: (data) => {
                form.spcdApp.setValues({
                    ...data.spcdApp.content,
                });

                console.log(data.spcdApp.content);
                let _prcssStatCd = data.spcdApp.content.prcssStatCd;
                let _ediable = true;
                if (_prcssStatCd === PRCS_TP_CD.APPROVED) _ediable = false;
                setPrcssStatCd({ statCd: _prcssStatCd, editable: _ediable });

                grid.spcdList.resetData();
                let spcdRLst = data.spcdApp.content.spcdRLst;
                // [CHECK::Lucy] search 이벤트를 위한 임시값
                spcdRLst = data.spcdApp.content.spcdRLst.map((spcdInfo: any) => {
                    if (_ediable) return { ...spcdInfo, hsCdSrch: "🔍" };
                    else return { ...spcdInfo };
                });

                //특정코드 목록 grid setData 처리
                setSpcdList({
                    content: spcdRLst,
                    page: {
                        totalElements: spcdRLst.length,
                    },
                });

                console.log(`[fetch::getSpcdApp::onSuccess] ${JSON.stringify(form.spcdApp.getValues())}`);
            },
            onError: () => {},
            showToast: true,
        }),
        // 특정코드 신청서 임시 저장
        saveSpcdApp: useFetch({
            api: (data) => APIS.saveSpcdApp({ ...data, spcdRLst: grid.spcdList.getData() }),
            onSuccess: (res_data) => {
                console.log(`[fetch::saveSpcdApp::onSuccess]${JSON.stringify(res_data)}`);
                const succ_dclrNo = res_data.spcdAppDto.content.dclrNo;
                toast.showToast({ type: "success", content: "success" });
                navigate(`${URLS.cgme0601002s}/${succ_dclrNo}`);
            },
            onError: () => {},
        }),
        // 특정코드 신청서 제출
        submitSpcdApp: useFetch({
            api: (data) => APIS.submitSpcdApp({ ...data }),
            onSuccess: () => {
                toast.showToast({ type: "success", content: "success" });
                handler.navigateToList();
            },
            onError: () => {},
        }),
        // 특정코드 신청서 삭제
        deleteSpcdApp: useFetch({
            api: (data) => APIS.deleteSpcdApp(dclrNo),
            onSuccess: () => {
                toast.showToast({ type: "success", content: "success" });
                handler.navigateToList();
            },
            onError: () => {},
        }),
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        dclrNo && fetch.getSpcdApp.fetch();
    }, []);

    /**
     * != 처리상태코드에 따른 화면 처리 ==!
     */
    useEffect(() => {
        //Grid에서 사용하는 값은 setStore 사용
        setStore(pgeUid, { prcssStatCd: prcssStatCd });
        if (prcssStatCd.editable) {
            form.spcdApp.resetSchema(SF_SPCD_APP);
        } else {
            //form.spcdApp.setSchemas(["dclrRsn"], { readOnly: true });
            form.spcdApp.setEditable(false);
            // 입력불가
            // 그리드 체크박스 제거, 버튼 없어야 되고
            // editable
        }
    }, [prcssStatCd]);

    /*
     * Declaration Event Handler
     * !== 이벤트 핸들러 정의 ==!
     */
    const handler = {
        // 목록으로 이동
        navigateToList: () => navigate(URLS.cgme0601001q),
        /**
         * 임시 저장
         * validation 성공 시 open modal,
         * modal confirm 시 fetch
         * validation 실패 시 toast
         */
        saveSpcdApp: form.spcdApp.handleSubmit((data) => {
            console.log(`[handler::saveSpcdApp][grid]=================================`);
            console.log(`grid.spcdList.getData().length:${grid.spcdList.getData().length}`);
            console.log(grid.spcdList.getData());
            console.log(`[handler::saveSpcdApp][form]=================================`);
            console.log(form.spcdApp.getValues());

            if (grid.spcdList.getData().length > 0) {
                modal.openModal({
                    content: "msg.00101",
                    onConfirm: () => {
                        fetch.saveSpcdApp.fetch(data);
                    },
                });
            } else {
                modal.openModal({ content: t("msg.ptl.com.00265", { 0: t("L_SPCD_LST") }) });
            }
        }),
        submitSpcdApp: form.spcdApp.handleSubmit((data) => {
            // modal.openModal({
            //     content: "msg.00102",
            //     onConfirm: () => {
            //         fetch.saveSpcdApp.fetch(data);
            //     },
            // });
        }),
        deleteSpcdApp: form.spcdApp.handleSubmit((data) => {
            modal.openModal({
                content: "msg.00103",
                onConfirm: () => {
                    fetch.deleteSpcdApp.fetch(data);
                },
            });
        }),
        click_Btn_AddSpcd: () => {
            const item = { hsCdSrch: "🔍" };
            grid.spcdList.addRow(item);
        },
        click_Btn_DelSpcd: () => {
            const seltList: any[] = grid.spcdList.getChecked() || [];
            if (comnUtils.isEmpty(seltList)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }
            grid.spcdList.deleteRow();
        },

        click_Grid_SpcdList: {
            hsCdSrch: (data: any) => {
                console.log(getStore(pgeUid));
                /**
                 * 그리드에서 State 값을 사용하여 control 하는 경우
                 * 그리드 내에서(예> cell click 시) state 값을 가져오면
                 * 그리드 생성 시점의 state 정보를 불러옴으로 최신의 State 정보를 얻지 못함
                 * 그런 경우에는 상단에 Page Store에 선언하고 getStore 하여 사용함
                 */
                if (getStore(pgeUid).prcssStatCd.editable) {
                    let selRowIndex = data.rowValues.__index;
                    openPopup({
                        url: URLS.cgme0602006q,
                        params: { dclrNo: dclrNo },
                        size: "sm",
                        callback: ({ data = Array<any> }) => {
                            // 1. SpcdLst 그리드에서 getData
                            // 2. 클릭한 row의 hscd를 반영
                            // 3. 그리드에 state set.
                            if (comnUtils.isEmpty(data) || comnUtils.isEmpty(data[0])) return;

                            const gridData = grid.spcdList.getData();
                            console.log(`gridData:${JSON.stringify(gridData)}`);

                            let item = data[0];

                            let index = comnUtils.findIndex(gridData, {
                                __index: selRowIndex,
                            });
                            if (index > -1) {
                                gridData[index].hsCd = item.hsCd;
                            }

                            setSpcdList({
                                content: gridData,
                                page: {
                                    totalElements: gridData.length,
                                },
                            });
                        },
                    });
                }
            },
        },
    };

    return (
        <Page
            id={"UI-CGME-0601-002S"}
            title={t("T_SPCD_DCLR_RGSR")}
            description={t("T_SPCD_DCLR_RGSR")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { path: "/io/spcd/cgme0601002s", label: "T_SPCD_DCLR_RGSR" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.spcdApp.schema.dclrNo} />
                                <Group.Control {...form.spcdApp.schema.sbmtDt} />
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.spcdApp.schema.dclrRsn} controlSize={10} rows={3} />
                            </Group.Row>
                        </Group.Section>
                        <Group.Title title={"L_SPCD_LST"} titleSize={2}></Group.Title>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        console.log(`Excel Upload Click`);
                                    }}
                                    variant="outline-info"
                                >
                                    {t("B_EXCL_UPLD")}
                                </Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    onClick={() => {
                                        handler.click_Btn_AddSpcd();
                                    }}
                                    variant="outline-primary"
                                >
                                    Add
                                </Button>
                                <Button
                                    onClick={() => {
                                        handler.click_Btn_DelSpcd();
                                    }}
                                    variant="outline-danger"
                                >
                                    Del
                                </Button>
                            </Layout.Right>
                        </Layout>
                        {/*
                         * 그리드
                         * @ 그리드 스키마 주입 : {...grid.[그리드이름].grid}
                         * @ 데이터 data={fetch.[fetch 명].data?.[api 리턴 vo 명]}
                         * @ 셀클릭이벤트 연결 : onCellClick={handler.[그리드 이벤트 핸들러명]}
                         */}
                        <Wijmo {...grid.spcdList.grid} data={gridSpcdList} onCellClick={handler.click_Grid_SpcdList} />
                    </Group.Body>
                </Group>
            </form>
            <Layout direction="row">
                <Layout.Left>
                    <Button role="list" onClick={handler.navigateToList}></Button>
                </Layout.Left>
                <Layout.Right>
                    {prcssStatCd.editable && (
                        <>
                            <Button role="save" onClick={handler.saveSpcdApp}></Button>
                            <Button role="submit" onClick={handler.submitSpcdApp}></Button>
                            {dclrNo !== undefined && <Button role="delete" onClick={handler.deleteSpcdApp}></Button>}
                        </>
                    )}
                </Layout.Right>
            </Layout>
        </Page>
    );
};
