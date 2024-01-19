import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { cgmUtils } from "@/tra/tancis/cgme/comn";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, useModal, useStore, useToast } from "@/comn/hooks";

import { APIS, BASE, SF_SPCD_APP_SRCH, SG_SPCD_APP_LIST, URLS } from "./services/CgmeSpcdAppService";

/*
 * Specific Code Declaration List
 * !== 특정 코드 신고서 목록 ==!
 */
export const CGME0601001Q = (props: any) => {
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-CGME-0601-001Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
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
        // Specific Code Application Search !== 특정코드 신청서 검색 ==!
        spcdAppSrch: useForm({
            defaultSchema: SF_SPCD_APP_SRCH,
            defaultValues:
                { ...pgeStore?.form, srchDtTpFrom: comnUtils.getDate(), srchDtTpTo: comnUtils.getDate({ d: +7 }) } ||
                {},
        }),
    };

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        // Specific Code Application List !== 특정코드 신청서 목록 ==!
        spcdAppList: useWijmo({
            defaultSchema: SG_SPCD_APP_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        // Get Specific Code Application List !== 특정코드 신청서 목록 조회 ==!
        getSpcdAppList: useFetch({
            api: (page = grid.spcdAppList.page) => {
                // hidden 값 있는 경우.
                //form.spcdAppSrch.setValue("hidden", "hidden_test");
                console.log(`form:${JSON.stringify(form.spcdAppSrch.getValues())}`);
                return APIS.getSpcdAppList(form.spcdAppSrch.getValues(), page, grid.spcdAppList.size);
            },
            enabled: comnUtils.isEmpty(form.spcdAppSrch.errors) && form.spcdAppSrch.isSubmitted,
            key: [grid.spcdAppList.page, grid.spcdAppList.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.spcdAppSrch.getValues(),
                    page: grid.spcdAppList.page,
                    size: grid.spcdAppList.size,
                });
            },
            onError: () => {},
            showToast: true,
        }),
    };

    /*
     * Declaration Event Handler
     * !== 이벤트 핸들러 정의 ==!
     */
    const handler = {
        //Search
        getSpcdAppList: () => {
            form.spcdAppSrch.handleSubmit(
                () => {
                    grid.spcdAppList.setPage(0);
                    fetch.getSpcdAppList.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        //Grid cell click
        click_Grid_SpcdAppList: {
            dclrNo: (data: any) => {
                const dclrNo = `${data.rowValues.dclrNo}`;
                console.log(dclrNo);
                navigate(`${URLS.cgme0601002s}/${dclrNo}`);
            },
        },
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        //[CHECK::Lucy] 2024.01.12 현재 공통 처리상태 값과 상이하여 임시로 화면 초기화시 조회 수행하도록 처리
        handler.getSpcdAppList();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_SPCD_DCLR_LST")}
            description={t("T_SPCD_DCLR_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { path: "/io/spcd/cgme0601001q", label: "T_SPCD_DCLR_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Label {...form.spcdAppSrch.schema.srchDtTp}></Group.Label>
                                <Group.Col>
                                    <Group.Control
                                        {...form.spcdAppSrch.schema.srchDtTpDtmRnge}
                                        controlSize={10}
                                    ></Group.Control>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.spcdAppSrch.schema.dclrNo}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.spcdAppSrch.schema.prcssStatCd}></Group.Control>
                            </Group.Row>
                        </Group.Section>

                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role={"reset"}
                                    onClick={() => {
                                        form.spcdAppSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getSpcdAppList();
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
                        {...grid.spcdAppList.grid}
                        data={fetch.getSpcdAppList.data?.spcdAppList}
                        onCellClick={handler.click_Grid_SpcdAppList}
                    />
                </Group.Body>
            </Group>

            <Layout direction="row">
                <Layout.Left>
                    <Button
                        onClick={() => {
                            navigate(URLS.cgme0601002s);
                        }}
                    >
                        {t("B_NEW_$0", { 0: t("") })}
                    </Button>
                </Layout.Left>
            </Layout>
        </Page>
    );
};
