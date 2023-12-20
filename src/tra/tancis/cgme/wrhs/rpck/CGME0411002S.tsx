import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { envs } from "@/comn/utils";
import { useForm, useFetch, useWijmo, useCondition, usePopup, useTheme } from "@/comn/hooks";
import { BASE, URLS, APIS, SCHEMA_FORM_RPCK_ITM } from "./services/RpckItmAppService";

export const CGME0411002S = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { condition } = useCondition();
    const form = useForm({ defaultSchema: SCHEMA_FORM_RPCK_ITM, values: condition });

    const onSubmit = () => {};

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
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    form.reset();
                                }}
                            >
                                {t("B_RESET")}
                            </Button>
                        </Layout.Left>
                        <Layout.Right>
                            <Button type="submit">{t("B_SRCH")}</Button>
                        </Layout.Right>
                    </Layout>
                </Group>
            </form>
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
                        <Button onClick={() => {}}>{t("B_SAVE")}</Button>
                        <Button onClick={() => {}}>{t("B_SBMT")}</Button>
                    </Layout.Right>
                </Layout>
            </Group>
        </Page>
    );
};
