import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { envs, utils } from "@/comn/utils";
import { useForm, useToast, useFetch, usePopup, useStore, useModal, useAuth } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_RPCK_ITM_APP } from "./services/RpckItmAppService";

export const CGME0411002S = (props: any) => {
    const pgeUid = "UI-CGME-0411-002S";
    const { t } = useTranslation();
    const navigate = useNavigate();
    const modal = useModal();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();
    const auth = useAuth();

    const form = {
        rpckItmApp: useForm({
            defaultSchema: SF_RPCK_ITM_APP,
            defaultValues: { prcsTpCd: "A" },
        }),
    };

    form.rpckItmApp.watch(["sameAsAbove", "cnsiTin", "cnsiNm", "cnsiTelno", "cnsiAddr"]);
    const [state, setState] = useState(true);

    useEffect(() => {
        const observe = form.rpckItmApp.watch((value, { name, type }) => {
            if (name === "sameAsAbove" && utils.equals(value[name], ["Y"])) {
                form.rpckItmApp.setValues(
                    {
                        ntprTin: value.cnsiTin,
                        ntprNm: value.cnsiNm,
                        ntprTelno: value.cnsiTelno,
                        ntprAddr: value.cnsiAddr,
                    },
                    true
                );
                form.rpckItmApp.setSchemas(["ntprTin", "ntprNm", "ntprTelno", "ntprAddr"], { readOnly: true });
            } else {
                form.rpckItmApp.setSchemas(["ntprTin", "ntprNm", "ntprTelno", "ntprAddr"], { readOnly: false });
            }

            if (
                utils.equals(value.sameAsAbove, ["Y"]) &&
                (name === "cnsiTin" || name === "cnsiNm" || name === "cnsiTelno" || name === "cnsiAddr")
            ) {
                form.rpckItmApp.setValues(
                    {
                        ntprTin: value.cnsiTin,
                        ntprNm: value.cnsiNm,
                        ntprTelno: value.cnsiTelno,
                        ntprAddr: value.cnsiAddr,
                    },
                    true
                );
            }
        });

        return () => observe.unsubscribe();
    }, [form.rpckItmApp, form.rpckItmApp.watch]);

    const fetch = {
        saveRpckItmApp: useFetch({
            api: (data = form.rpckItmApp.getValues()) => {
                return APIS.saveRpckItmApp(data);
            },
            onSuccess: () => {},
            onError: () => {},
        }),
    };

    const handler = {
        saveRpckItmApp: () => {
            form.rpckItmApp.handleSubmit(
                () => {
                    if (!form.rpckItmApp.getValues("dcltTin")) form.rpckItmApp.setValue("dcltTin", auth.get("tin"));
                    modal.openModal({
                        content: t("msg.00101"),
                        onConfirm: () => {
                            fetch.saveRpckItmApp.fetch();
                        },
                    });
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                }
            )();
        },
        submitRpckItmApp: () => {
            form.rpckItmApp.handleSubmit(
                () => {
                    fetch.saveRpckItmApp.fetch();
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                }
            )();
        },
    };

    return (
        <Page>
            <Page.Navigation
                base={envs.base}
                nodes={[...BASE.nodes, { path: "/wrhs/rpck/cgme0411002s", label: "T_RPCK_ITM_DCLR_RGSR" }]}
            />
            <Page.Header
                title={t("T_RPCK_ITM_DCLR_RGSR")}
                description={t("T_RPCK_ITM_DCLR_RGSR")}
                id={"UI-CGME-0411-002S"}
            />
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.rprtNo}></Group.Control>
                            <Group.Control {...form.rpckItmApp.schema.prcssStatCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.mblNo}></Group.Control>
                            <Group.Control {...form.rpckItmApp.schema.crn}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.cagClsfCd}></Group.Control>
                            <Group.Control {...form.rpckItmApp.schema.dstnPlcCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.godsDesc}></Group.Control>
                            <Group.Control {...form.rpckItmApp.schema.loadPortCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label={"L_PCKG_NO"} required={true} />
                            <Group.Col>
                                <Group.Control {...form.rpckItmApp.schema.blPckgNo} controlSize={2}></Group.Control>
                                <Group.Control {...form.rpckItmApp.schema.pckgUtCd} controlSize={2}></Group.Control>
                            </Group.Col>
                            <Group.Control {...form.rpckItmApp.schema.blGwght}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.pckgTpCd}></Group.Control>
                            <Group.Control {...form.rpckItmApp.schema.blNwght}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Group.Header title={"L_CO"} titleSize={2}></Group.Header>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.exppnTin}></Group.Control>
                            <Group.Control {...form.rpckItmApp.schema.exppnNm}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.exppnTelno}></Group.Control>
                            <Group.Control {...form.rpckItmApp.schema.exppnAddr}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.cnsiTin}></Group.Control>
                            <Group.Control {...form.rpckItmApp.schema.cnsiNm}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.cnsiTelno}></Group.Control>
                            <Group.Control {...form.rpckItmApp.schema.cnsiAddr}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.sameAsAbove} controlSize={12}></Group.Control>
                        </Group.Row>
                        {state && (
                            <>
                                <Group.Row>
                                    <Group.Control {...form.rpckItmApp.schema.ntprTin}></Group.Control>
                                    <Group.Control {...form.rpckItmApp.schema.ntprNm}></Group.Control>
                                </Group.Row>
                                <Group.Row>
                                    <Group.Control {...form.rpckItmApp.schema.ntprTelno}></Group.Control>
                                    <Group.Control {...form.rpckItmApp.schema.ntprAddr}></Group.Control>
                                </Group.Row>
                            </>
                        )}
                    </Group.Body>
                    <Group.Header title={"L_WRHS"} titleSize={2}></Group.Header>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.wrhsCd} controlSize={10}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Group.Header title={"L_RPCK_ITM_LST"} titleSize={2}></Group.Header>
                </Group>

                <Group bgColor={false}>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    navigate(URLS.cgme0411001q);
                                }}
                            >
                                {t("B_LST")}
                            </Button>
                        </Layout.Left>
                        <Layout.Right>
                            <Button
                                onClick={() => {
                                    handler.saveRpckItmApp();
                                }}
                            >
                                {t("B_SAVE")}
                            </Button>
                            <Button
                                onClick={() => {
                                    handler.submitRpckItmApp();
                                }}
                            >
                                {t("B_SBMT")}
                            </Button>
                        </Layout.Right>
                    </Layout>
                </Group>
            </form>

            <button
                onClick={() => {
                    setState(!state);
                    console.log(form.rpckItmApp.getValues());
                }}
            >
                aaaa
            </button>
        </Page>
    );
};
