import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { useForm, useToast, useFetch, useModal, useStore, useWijmo, usePopup } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_HS_CD_SRCH, SG_HS_CD_LIST } from "./services/CgmeDmscCriService";
/*
 * Target List For HS Code
 * !== HS 코드 대상 목록 ==!
 */
export const CGME0602006Q = (props: any) => {
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */

    const pgeUid = "UI-CGME-0602-006Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { close, postMessage, getParams } = usePopup();
    const params = getParams();

    const sampleHsCd = {
        content: [
            {
                hsCd: "970690000000",
                hsDesc: "Other; Antiques of an age exceeding 100 years",
            },
            {
                hsCd: "970610000000",
                hsDesc: "Of an age exceeding 250 years",
            },
            {
                hsCd: "970539000000",
                hsDesc: "Other; :Collections and collectors' pieces of zoological, botanical, mineralogical, anatomical, historical, archaeological, palaeontological, ethnographic or numismatic interest.",
            },
        ],
        page: { totalElements: 3 },
    };
    const [hsCdLst, setHsCdLst] = useState(sampleHsCd);

    console.log(params);

    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        // Repacking Item Application Search !== 재포장 품목 신청서 검색 ==!
        hsCdSrch: useForm({
            defaultSchema: SF_HS_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        // Repacking Item Application List !== 재포장 품목 신청서 목록 ==!
        hsCdList: useWijmo({
            defaultSchema: SG_HS_CD_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        // Get Repacking Item Application Item List !== 재포장 품목 신청서 목록 조회 ==!
        getHsCdList: useFetch({
            api: (data) => {
                return APIS.getHsCdList(params?.hsCd, grid.hsCdList.page, grid.hsCdList.size);
            },
            enabled: !!params?.hsCd,
            onSuccess: () => {},
            onError: () => {},
            showToast: true,
        }),
    };

    /*
     * Declaration Event Handler
     * !== 이벤트 핸들러 정의 ==!
     */
    const handler = {
        // Get Hs Code List !== HS코드 목록 조회 ==!
        getHsCdList: () => {
            form.hsCdSrch.handleSubmit(
                () => {
                    grid.hsCdList.setPage(0);
                    fetch.getHsCdList.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_HsCdList: {
            hsCd: (data: any) => {
                postMessage({ data: [data.rowValues] });
                close();
            },
        },
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        //handler.getHsCdList();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_TRGT_LST_HS_CD")}
            description={t("T_TRGT_LST_HS_CD")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { path: "/io/dmsc/cgme0602006q", label: "T_TRGT_LST_HS_CD" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.hsCdSrch.schema.dgt}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.hsCdSrch.schema.hsCd}></Group.Control>
                                <Group.Control {...form.hsCdSrch.schema.hsDesc}></Group.Control>
                            </Group.Row>
                        </Group.Section>

                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.hsCdSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getHsCdList();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>

            <Group>
                <Group.Body>
                    {/*
                     * 그리드
                     * @ 그리드 스키마 주입 : {...grid.[그리드이름].grid}
                     * @ 데이터 data={fetch.[fetch 명].data?.[api 리턴 vo 명]}
                     * @ 셀클릭이벤트 연결 : onCellClick={handler.[그리드 이벤트 핸들러명]}
                     */}
                    <Wijmo {...grid.hsCdList.grid} data={hsCdLst} onCellClick={handler.click_Grid_HsCdList} />
                </Group.Body>
            </Group>

            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button role="close" onClick={close}></Button>
                </Layout.Right>
            )}
        </Page>
    );
};
