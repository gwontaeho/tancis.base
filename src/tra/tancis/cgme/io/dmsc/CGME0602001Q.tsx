import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, useModal, useStore, useToast } from "@/comn/hooks";
import { APIS, BASE, SF_DMSC_GODS_CRI_RPRT_SRCH, SG_DMSC_GODS_CRI_RPRT_LST, URLS } from "./services/CgmeDmscCriService";

/*
 * Domestic Goods Carry-In Report List
 * !== 내국 물품 반입 보고서 목록 ==!
 */
export const CGME0602001Q = (props: any) => {
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-CGME-0602-001Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변화 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!

    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        // Domestic Goods Carry-In Report Search !== 내국 물품 반입 보고서 검색 ==!
        dmscGodsCriRprtSrch: useForm({
            defaultSchema: SF_DMSC_GODS_CRI_RPRT_SRCH,
            defaultValues:
                { ...pgeStore?.form, criDtFrom: comnUtils.getDate(), criDtTo: comnUtils.getDate({ d: +7 }) } || {},
        }),
    };

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        // Domestic Goods Carry-In Report List !== 내국 물품 반입 보고서 목록 ==!
        dmscGodsCriRprtList: useWijmo({
            defaultSchema: SG_DMSC_GODS_CRI_RPRT_LST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        getDmscGodsCriRprtList: useFetch({
            api: (page = grid.dmscGodsCriRprtList.page) => {
                return APIS.getDmscGodsCriRprtList(
                    form.dmscGodsCriRprtSrch.getValues(),
                    page,
                    grid.dmscGodsCriRprtList.size,
                );
            },
        }),
    };

    /*
     * Declaration Event Handler
     * !== 이벤트 핸들러 정의 ==!
     */
    const handler = {
        getDmscGodsCriRprtList: () => {
            console.log(`form.dmscGodsCriRprtSrch:${JSON.stringify(form.dmscGodsCriRprtSrch.getValues())}`);
            form.dmscGodsCriRprtSrch.handleSubmit(
                () => {
                    grid.dmscGodsCriRprtList.setPage(0);
                    fetch.getDmscGodsCriRprtList.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_RprtList: {
            rprtNo: (data: any) => {},
        },
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        handler.getDmscGodsCriRprtList();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_DMSC_GODS_CRI_RPRT_LST")}
            description={t("T_DMSC_GODS_CRI_RPRT_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { path: "/io/dmsc/cgme0602001q", label: "T_DMSC_GODS_CRI_RPRT_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.dmscGodsCriRprtSrch.schema.criDtRange}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.dmscGodsCriRprtSrch.schema.rprtNo}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.dmscGodsCriRprtSrch.schema.prcssStatCd}></Group.Control>
                            </Group.Row>
                        </Group.Section>

                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.dmscGodsCriRprtSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getDmscGodsCriRprtList();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>
            <Group>
                <Group.Body>
                    <Wijmo
                        {...grid.dmscGodsCriRprtList.grid}
                        data={fetch.getDmscGodsCriRprtList.data?.dmscGodsCriRprtList}
                        onCellClick={handler.click_Grid_RprtList}
                    />
                </Group.Body>
            </Group>
            <Layout direction="row">
                <Layout.Left>
                    <Button
                        onClick={() => {
                            navigate(URLS.cgme0602002s);
                        }}
                    >
                        {t("B_NEW_$0", { 0: t("") })}
                    </Button>
                </Layout.Left>
            </Layout>
        </Page>
    );
};
