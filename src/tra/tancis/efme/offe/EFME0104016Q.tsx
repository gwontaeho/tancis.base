import { useTranslation } from "react-i18next";
import { comnUtils } from "@/comn/utils";
import { Button, Group, Layout, Page, Wijmo } from "@/comn/components";
import { useFetch, useForm, useStore, useToast, useWijmo } from "@/comn/hooks";
import { efmEnvs } from "@/tra/tancis/efme/comn";
import { APIS, BASE, SF_OFFE_SRCH, SG_OFFE_LIST } from "@/tra/tancis/efme/offe/services/OffeService";
import { useEffect } from "react";

/*
 * Offence report list
 * !== 위반 보고 목록 ==!
 */
export const EFME0104016Q = (props: any) => {
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-EFME-0104-016Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        // Repacking Item Application Search !== 재포장 품목 신청서 검색 ==!
        offeSrch: useForm({
            defaultSchema: SF_OFFE_SRCH,
            defaultValues: { strtDt: comnUtils.getDate(), endDt: comnUtils.getDate() },
        }),
    };

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        // Repacking Item Application List !== 재포장 품목 신청서 목록 ==!
        offeList: useWijmo({
            defaultSchema: SG_OFFE_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };
    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        getOffeList: useFetch({
            api: (page = grid.offeList.page) => {
                return APIS.getOffeList(form.offeSrch.getFormValues(), page, grid.offeList.size);
            },
            enabled: comnUtils.isEmpty(form.offeSrch.errors) && form.offeSrch.isSubmitted,
            key: [grid.offeList.page, grid.offeList.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.offeSrch.getFormValues(),
                    page: grid.offeList.page,
                    size: grid.offeList.size,
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
        getCgmeBtList: () => {
            form.offeSrch.handleSubmit(
                (data) => {
                    grid.offeList.setPage(0);
                    fetch.getOffeList.fetch(0);
                },
                (data) => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };
    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        form.offeSrch.setValue("prcssDtmFrom", comnUtils.getDate({ d: -7 }));
        form.offeSrch.setValue("prcssDtmTo", comnUtils.getDate());
        fetch.getOffeList.fetch();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_OFFE_LST")}
            description={t("T_OFFE_LST")}
            navigation={{
                base: efmEnvs.base,
                nodes: [...BASE.nodes, { path: "/offe/efme0104016q", label: "T_OFFE_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                {/* Search status !== 조회 상태 ==!  */}
                                <Group.Control
                                    {...form.offeSrch.schema.srchSttsCd}
                                    options={[
                                        // !== TODO KNH 추후 상태코드에 추가 필요 ==!
                                        { label: "OFFENCE REPORT", value: "A" },
                                        { label: "CHARGE SHEET", value: "B" },
                                        { label: "CASE SETTLEMENT REQUEST", value: "I" },
                                        { label: "CASE SETTLEMENT ORDER", value: "C" },
                                        { label: "PENALTY", value: "D" },
                                        { label: "AUCTION", value: "E" },
                                        { label: "DONATION", value: "F" },
                                        { label: "DESTROY", value: "G" },
                                        { label: "CASE CLOSE", value: "H" },
                                    ]}
                                ></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Label
                                    {...form.offeSrch.schema.rottTpCd}
                                    options={[
                                        { label: "L_OFFE_ROTT_NO", value: "1" },
                                        { label: "L_SZRE_NO", value: "2" },
                                    ]}
                                ></Group.Label>
                                <Group.Col colSize={6}>
                                    <Group.Control
                                        {...form.offeSrch.schema.stcd}
                                        options={[{ label: "MCE", value: "MCE" }]}
                                    ></Group.Control>
                                    <Group.Any> - OFF - </Group.Any>
                                    <Group.Control {...form.offeSrch.schema.rottYy}></Group.Control>
                                    <Group.Any> - </Group.Any>
                                    <Group.Control {...form.offeSrch.schema.rottSrno}></Group.Control>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.offeSrch.schema.ofndNm} />
                                <Group.Control {...form.offeSrch.schema.prprOfcr} />
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.offeSrch.schema.offeRprtDt} />
                            </Group.Row>
                        </Group.Section>

                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.offeSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        // handler.getCgmeBtList();
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
                        {...grid.offeList.grid}
                        data={fetch.getOffeList.data?.getOffeList}
                        // onCellClick={handler.click_Grid_List}
                    />
                </Group.Body>
            </Group>
        </Page>
    );
};
