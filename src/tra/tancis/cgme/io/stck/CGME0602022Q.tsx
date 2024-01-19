import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tab, Wijmo } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, useModal, useStore, useToast } from "@/comn/hooks";
import {
    APIS,
    BASE,
    SF_DMSC_GODS_STCK_DTL,
    SG_DMSC_GODS_CRI_STCK,
    SG_DMSC_GODS_CRO_STCK,
    ST_DMSC_GODS_STCK_DTL,
    URLS,
} from "./services/CgmeIoStckService";
import { useTab } from "@/comn/hooks/useTab";

/*
 * [화면명 영문]
 * !== [화면명 국문] ==!
 */
export const CGME0602022Q = (props: any) => {
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-CGME-0602-022Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변화 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { key } = useParams(); // Key Parameter !== 넘어온 키 Parameter ==!
    const [gridCriList, setCriList] = useState({ content: [], page: {} }); //반입 목록
    const [gridCroList, setCroList] = useState({ content: [], page: {} }); //반출 목록

    const { tab, value, setActive, setDisabled, setVisible, setLabel } = useTab({
        defaultSchema: ST_DMSC_GODS_STCK_DTL,
    });
    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        dmscGodsStckDtl: useForm({
            defaultSchema: SF_DMSC_GODS_STCK_DTL,
            defaultValues: {},
        }),
    };

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        criStckList: useWijmo({
            defaultSchema: SG_DMSC_GODS_CRI_STCK,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
        croStckList: useWijmo({
            defaultSchema: SG_DMSC_GODS_CRO_STCK,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        getDmscGodsStckInfo: useFetch({
            api: (data) => APIS.getDmscGodsStckInfo(key),
            enabled: !!key,
            onSuccess: (data) => {
                form.dmscGodsStckDtl.setValues({
                    ...data.dmscGodsStck.content,
                    epzMub: `[${data.dmscGodsStck.content.wrhsCd}] ${data.dmscGodsStck.content.wrhsNm}`,
                });

                grid.criStckList.resetData();
                grid.croStckList.resetData();

                let criList = data.dmscGodsStck.content.criList;
                let croList = data.dmscGodsStck.content.croList;

                //grid setData 처리
                setCriList({
                    content: criList,
                    page: {
                        totalElements: criList.length,
                    },
                });
                setCroList({
                    content: croList,
                    page: {
                        totalElements: croList.length,
                    },
                });

                console.log(
                    `[fetch::getDmscGodsStckInfo::onSuccess] ${JSON.stringify(form.dmscGodsStckDtl.getValues())}`,
                );
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
        navigateToList: () => navigate(URLS.cgme0602021q),
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        key && fetch.getDmscGodsStckInfo.fetch();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_DMSC_GODS_STCK_DTL")}
            description={t("T_DMSC_GODS_STCK_DTL")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { path: "/io/stck/cgme0602022q", label: "T_DMSC_GODS_STCK_DTL" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.dmscGodsStckDtl.schema.epzMub}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.dmscGodsStckDtl.schema.hsCd}></Group.Control>
                                <Group.Control {...form.dmscGodsStckDtl.schema.spcd}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.dmscGodsStckDtl.schema.godsDesc}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
            </form>

            <Tab {...tab}>
                <Tab.Panel>
                    <Group>
                        <Group.Body>
                            <Wijmo {...grid.criStckList.grid} data={gridCriList} />
                        </Group.Body>
                    </Group>
                </Tab.Panel>
                <Tab.Panel>
                    <Group>
                        <Group.Body>
                            <Wijmo {...grid.croStckList.grid} data={gridCroList} />
                        </Group.Body>
                    </Group>
                </Tab.Panel>
            </Tab>
            <Layout direction="row">
                <Layout.Left>
                    <Button role="list" onClick={handler.navigateToList}></Button>
                </Layout.Left>
            </Layout>
        </Page>
    );
};
