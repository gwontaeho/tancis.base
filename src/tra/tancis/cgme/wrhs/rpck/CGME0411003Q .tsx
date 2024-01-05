import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { comnEnvs } from "@/comn/utils";
import { useForm, useFetch, useWijmo, usePopup, useTheme } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_RPCK_ITM_APP_SRCH } from "./services/RpckItmAppService";

export const CGME0411003Q = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const form = useForm({ defaultSchema: SF_RPCK_ITM_APP_SRCH });

    const onSubmit = () => {};

    return (
        <Page>
            <Page.Navigation
                base={comnEnvs.base}
                nodes={[...BASE.nodes, { path: "/wrhs/rpck/cgme0411001q", label: "T_RPCK_ITM_DCLR_LST" }]}
            />
            <Page.Header
                title={t("T_RPCK_ITM_DCLR_LST")}
                description={t("T_RPCK_ITM_DCLR_LST")}
                id={"UI-CGME-0411-001Q"}
            />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.schema.frstRgsrDtmRnge} controlSize={10}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.mrn}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.prcssStatCd}></Group.Control>
                            </Group.Row>
                        </Group.Section>
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
                    </Group.Body>
                </Group>
            </form>
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
