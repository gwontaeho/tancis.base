import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { envs, utils } from "@/comn/utils";
import { useForm, useFetch, useWijmo, useCondition, usePopup, useTheme, useModal, FormValuesType } from "@/comn/hooks";
import { BASE, URLS, APIS, SCHEMA_FORM_RPCK_ITM } from "./services/RpckItmAppService";

export const CGME0411002S = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const modal = useModal();
    const { condition } = useCondition();
    const form = useForm({ defaultSchema: SCHEMA_FORM_RPCK_ITM, values: condition });
    form.watch(["sameAsAbove", "cnsiTin", "cnsiNm", "cnsiTelno", "cnsiAddr"]);

    useEffect(() => {
        const observe = form.watch((value, { name, type }) => {
            if (name === "sameAsAbove" && utils.equals(value[name], ["Y"])) {
                form.setValues(
                    {
                        ntprTin: value.cnsiTin,
                        ntprNm: value.cnsiNm,
                        ntprTelno: value.cnsiTelno,
                        ntprAddr: value.cnsiAddr,
                    },
                    true
                );
                form.setSchemas(["ntprTin", "ntprNm", "ntprTelno", "ntprAddr"], { readOnly: true });
            } else {
                form.setSchemas(["ntprTin", "ntprNm", "ntprTelno", "ntprAddr"], { readOnly: false });
            }

            if (
                utils.equals(value.sameAsAbove, ["Y"]) &&
                (name === "cnsiTin" || name === "cnsiNm" || name === "cnsiTelno" || name === "cnsiAddr")
            ) {
                form.setValues(
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
    }, [form, form.watch]);

    const onSubmit = () => {
        modal.openModal({
            content: "저장하시겠습니까?",
            onConfirm: () => {
                APIS.saveRpckItmApp(form.getValues());
            },
            onCancel: () => {
                console.log("cancel...");
            },
        });
    };

    const saveRpckItmApp = (data: FormValuesType) => {
        console.log(data);
        console.log("a");
    };
    const submitRpckItmApp = (data: FormValuesType) => {
        console.log(data);
        console.log("b");
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
                            <Group.Control {...form.schema.rprtNo}></Group.Control>
                            <Group.Control {...form.schema.prcssStatCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.mblNo}></Group.Control>
                            <Group.Control {...form.schema.crn}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.cagClsfCd}></Group.Control>
                            <Group.Control {...form.schema.dstnPlcCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.godsDesc}></Group.Control>
                            <Group.Control {...form.schema.loadPortCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label={"L_PCKG_NO"} required={true} />
                            <Group.Control {...form.schema.blPckgNo} controlSize={2}></Group.Control>
                            <Group.Control {...form.schema.pckgUtCd} controlSize={2}></Group.Control>
                            <Group.Control {...form.schema.blGwght}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.pckgTpCd}></Group.Control>
                            <Group.Control {...form.schema.blNwght}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Group.Header title={"L_CO"} titleSize={2}></Group.Header>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.schema.exppnTin}></Group.Control>
                            <Group.Control {...form.schema.exppnNm}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.exppnTelno}></Group.Control>
                            <Group.Control {...form.schema.exppnAddr}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.cnsiTin}></Group.Control>
                            <Group.Control {...form.schema.cnsiNm}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.cnsiTelno}></Group.Control>
                            <Group.Control {...form.schema.cnsiAddr}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.sameAsAbove} controlSize={12}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.ntprTin}></Group.Control>
                            <Group.Control {...form.schema.ntprNm}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.ntprTelno}></Group.Control>
                            <Group.Control {...form.schema.ntprAddr}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Group.Header title={"L_WRHS"} titleSize={2}></Group.Header>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.schema.wrhsCd} controlSize={10}></Group.Control>
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
                            <Button onClick={form.handleSubmit(saveRpckItmApp)}>{t("B_SAVE")}</Button>
                            <Button onClick={form.handleSubmit(submitRpckItmApp)}>{t("B_SBMT")}</Button>
                        </Layout.Right>
                    </Layout>
                </Group>
            </form>
        </Page>
    );
};
