import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { utils, envs } from "@/comn/utils";
//import {} from "@/tra/tancis/cgme/comn";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, useModal, useStore, useToast } from "@/comn/hooks";
import { BASE, URLS, APIS, SG_RPCK_ITM_APP_LIST, SF_RPCK_ITM_APP_SRCH } from "./services/RpckItmAppService";

export const CGME0411001Q = (props: any) => {
    const pgeUid = "CGME0411001Q";
    const { t } = useTranslation();
    const navigate = useNavigate();
    const modal = useModal();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();

    const form = {
        rpckItmAppSrch: useForm({
            defaultSchema: SF_RPCK_ITM_APP_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        rpckItmAppLst: useWijmo({
            defaultSchema: SG_RPCK_ITM_APP_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getRpckItmAppLst: useFetch({
            /*
             * api : 해당 fetch 가 실제 실행하는 API, Service 에 정의 후 사용
             * enabled : 해당 fetch 가 실행가능한 조건
             * key : 변경되었을때 fetch 가 재실행되는 key
             * showToast : fetch 의 성공 실패 결과를 Toast 메세지로 표시 여부, default : false
             */
            api: (page = grid.rpckItmAppLst.page) => {
                return APIS.getRpckItmAppList(form.rpckItmAppSrch.getValues(), page, grid.rpckItmAppLst.size);
            },
            enabled: utils.isEmpty(form.rpckItmAppSrch.errors) && form.rpckItmAppSrch.isSubmitted,
            key: [grid.rpckItmAppLst.page, grid.rpckItmAppLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.rpckItmAppSrch.getValues(),
                    page: grid.rpckItmAppLst.page,
                    size: grid.rpckItmAppLst.size,
                });
            },
            showToast: true,
        }),
        deleteRpckItmApp: useFetch({
            api: (dclrNos) => APIS.deleteRpckItmApp(dclrNos),
            onSuccess: () => {
                toast.showToast({ type: "success", content: "msg.00003" });
                modal.openModal({ content: "msg.00003" });
                handler.getRpckItmAppLst();
            },
            onError: () => {
                modal.openModal({ content: "msg.00003" });
            },
        }),
    };

    const handler = {
        getRpckItmAppLst: () => {
            form.rpckItmAppSrch.handleSubmit(
                () => {
                    grid.rpckItmAppLst.setPage(0);
                    fetch.getRpckItmAppLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                }
            )();
        },
        deleteRpckItmApp: () => {
            const seltLst: any[] = grid.rpckItmAppLst.getChecked() || [];
            if (utils.isEmpty(seltLst)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }

            const dclrNos: string[] = [];
            seltLst.forEach((item) => {
                dclrNos.push(`${item.dcltTin}-${item.dclrYy}-${item.prcsTpCd}-${item.dclrSrno}`);
            });

            fetch.deleteRpckItmApp.fetch(dclrNos.join(","));
        },
        click_Grid_RpckItmAppLst: {
            dclrNo: (data: any) => {
                const dclrNo = `${data.rowValues.dcltTin}-${data.rowValues.dclrYy}-${data.rowValues.prcsTpCd}-${data.rowValues.dclrSrno}`;
                navigate(`${URLS.cgme0411002s}/${dclrNo}`);
            },
        },
    };

    useEffect(() => {
        fetch.getRpckItmAppLst.fetch();
    }, []);

    return (
        <Page>
            <Page.Navigation
                base={envs.base}
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
                                    handler.getRpckItmAppLst();
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
                    {...grid.rpckItmAppLst.grid}
                    data={fetch.getRpckItmAppLst.data?.rpckItmAppList}
                    onCellClick={handler.click_Grid_RpckItmAppLst}
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
