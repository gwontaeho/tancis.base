import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, useModal, useStore, useToast } from "@/comn/hooks";
import { APIS, BASE, SF_DMSC_GODS_STCK_SRCH, SG_DMSC_GODS_STCK_LST, URLS } from "./services/CgmeIoStckService";

/*
 * Domestic Goods Inventory List
 * !== 내국 물품 재고 목록 ==!
 */
export const CGME0602021Q = (props: any) => {
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-CGME-0602-021Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
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
        // Domestic Goods Inventory Search !== 내국 물품 재고 검색 ==!
        dmscGodsStckSrch: useForm({
            defaultSchema: SF_DMSC_GODS_STCK_SRCH,
            defaultValues:
                {
                    ...pgeStore?.form,
                    criDtFrom: comnUtils.getDate(),
                    criDtTo: comnUtils.getDate({ d: +7 }),
                    stck: ["Y", "N"], // Checkbox 초기값 설정
                } || {},
        }),
    };

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        // Domestic Goods Inventory List !== 내국 물품 재고 목록 ==!
        dmscGodsStckList: useWijmo({
            defaultSchema: SG_DMSC_GODS_STCK_LST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        getDmscGodsStckList: useFetch({
            api: (page = grid.dmscGodsStckList.page) => {
                return APIS.getDmscGodsStckList(form.dmscGodsStckSrch.getValues(), page, grid.dmscGodsStckList.size);
            },
        }),
    };

    /*
     * Declaration Event Handler
     * !== 이벤트 핸들러 정의 ==!
     */
    const handler = {
        getDmscGodsStckList: () => {
            console.log(`form.dmscGodsCriRprtSrch:${JSON.stringify(form.dmscGodsStckSrch.getValues())}`);
            form.dmscGodsStckSrch.handleSubmit(
                () => {
                    grid.dmscGodsStckList.setPage(0);
                    fetch.getDmscGodsStckList.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_StckList: {
            hsCd: (data: any) => {
                goDtl(data);
            },
            spcd: (data: any) => {
                goDtl(data);
            },
        },
    };

    const goDtl = (data: any) => {
        navigate(`${URLS.cgme0602022q}/${data.rowValues.wrhsCd}-${data.rowValues.hsCd}-${data.rowValues.spcd}`);
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        handler.getDmscGodsStckList();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_DMSC_GODS_STCK_LST")}
            description={t("T_DMSC_GODS_STCK_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { path: "/io/stck/cgme0602021q", label: "T_DMSC_GODS_STCK_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.dmscGodsStckSrch.schema.criDtRange}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.dmscGodsStckSrch.schema.hsCd}></Group.Control>
                                <Group.Control {...form.dmscGodsStckSrch.schema.spcd}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.dmscGodsStckSrch.schema.stck}></Group.Control>
                            </Group.Row>
                        </Group.Section>

                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.dmscGodsStckSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getDmscGodsStckList();
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
                        {...grid.dmscGodsStckList.grid}
                        data={fetch.getDmscGodsStckList.data?.dmscGodsStckList}
                        onCellClick={handler.click_Grid_StckList}
                    />
                </Group.Body>
            </Group>
        </Page>
    );
};
