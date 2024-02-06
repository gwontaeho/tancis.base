import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils"; // 프로젝트 공통 유틸
import { cgmUtils } from "@/tra/tancis/cgme/comn"; // 시스템 공통 유틸
import { Page, Group, Layout, Button } from "@/comn/components"; // 화면 구성 컴포넌트
import {
    useForm,
    useFetch,
    useWijmo,
    useModal,
    useStore,
    useToast,
    TFormSchema,
    WijmoSchemaType,
    usePopup,
} from "@/comn/hooks"; // hook
import { APIS } from "./services/CgmeBtDclaService";

export const CGME0303003Q = (props: any) => {
    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */
    const pgeUid = "UI-CGME-0303-003Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    // const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    // const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { close, postMessage, getParams } = usePopup();

    /**
     * Declaration Form Schema
     * !==폼 스키마 정의==!
     */
    const SF_TANSAD_NO_SRCH: TFormSchema = {
        id: "form_CgmeTansadSrch",
        schema: {
            rgsrDtmRnge: {
                type: "daterange",
                label: "L_RGSR_DTM",
                start: { name: "rgsrDtmFrom", required: true },
                end: { name: "rgsrDtmTo", required: true },
                rangeButton: 0,
                controlSize: 10,
                required: true,
            },
            tansadNo: { type: "text", label: "L_TANSAD_NO" },
        },
    };

    const SG_TANSAD_NO_LIST: WijmoSchemaType = {
        id: "tansad_list_grid",
        options: { pagination: "out", isReadOnly: true, checkbox: true },
        // head: [{ cells: [{ header: "L_TANSAD_NO", binding: "tansadNo" }] }, { cells: [{ header: "L_REFF_NO", binding: "reffNo" }] }, { cells: [{ header: "L_CRN", binding: "crn" }] }],
        head: [
            { cells: [{ header: "L_TANSAD_NO", binding: "tansadNo" }] },
            { cells: [{ header: "L_REFF_NO", binding: "dclNo" }] },
            { cells: [{ header: "L_CRN", binding: "crn" }] },
        ],
        // body: [{ cells: [{ binding: "tansadNo", width: "*" }] }, { cells: [{ binding: "reffNo", width: 200 }] }, { cells: [{ binding: "crn", width: "*" }] }],
        body: [
            {
                cells: [
                    {
                        render: (cellData) => {
                            return <span className="underline">{`${cellData.rowValues.tansadNo}`}</span>;
                        },
                        binding: "tansadNo",
                        width: "*",
                    },
                ],
            },
            { cells: [{ binding: "dclNo", width: 200 }] },
            { cells: [{ binding: "crn", width: "*" }] },
        ],
    };

    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        tansadSrch: useForm({
            defaultSchema: SF_TANSAD_NO_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        tansadList: useWijmo({
            defaultSchema: SG_TANSAD_NO_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        getTansadNoList: useFetch({
            api: (page = grid.tansadList.page) => {
                return APIS.getTansadNoList(form.tansadSrch.getValues(), page, grid.tansadList.size);
            },
            enabled: comnUtils.isEmpty(form.tansadSrch.errors) && form.tansadSrch.isSubmitted,
            key: [grid.tansadList.page, grid.tansadList.size],
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
        getTansadNoList: () => {
            form.tansadSrch.handleSubmit(
                (data) => {
                    // alert(11);
                    grid.tansadList.setPage(0);
                    fetch.getTansadNoList.fetch(0);
                },
                (data) => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_tansadNo: {
            tansadNo: (data: any) => {
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
        form.tansadSrch.setValue("rgsrDtmFrom", comnUtils.getDate({ d: -7 }));
        form.tansadSrch.setValue("rgsrDtmTo", comnUtils.getDate());
        handler.getTansadNoList();
    }, []);

    return (
        <>
            <Page id={pgeUid} title={t("T_BT_TANSAD_NO_LIST")} description={t("T_BT_TANSAD_NO_LIST")}></Page>
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                {/* Registration Date !== 등록일자 ==!  */}
                                <Group.Control {...form.tansadSrch.schema.rgsrDtmRnge} controlSize={10}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.tansadSrch.schema.tansadNo} controlSize={10}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.tansadSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getTansadNoList();
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
                        {...grid.tansadList.grid}
                        data={fetch.getTansadNoList.data?.getTansadNoList}
                        onCellClick={handler.click_tansadNo}
                    ></Wijmo>
                </Group.Body>
            </Group>
            {comnUtils.isPopup() && (
                <Group>
                    <Group.Body>
                        <Layout direction="row">
                            <Layout.Right>
                                <Button
                                    role="apply"
                                    onClick={() => {
                                        close();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            )}
        </>
    );
};
