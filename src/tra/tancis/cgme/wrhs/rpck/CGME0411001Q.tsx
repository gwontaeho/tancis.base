import { useEffect } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { envs } from "@/comn/utils";
import {
    useForm,
    useFetch,
    useWijmo,
    useCondition,
    usePopup,
    useTheme,
    useStore,
    FormValuesType,
    useToast,
} from "@/comn/hooks";
import { BASE, URLS, APIS, SF_RPCK_ITM_APP_SRCH } from "./services/RpckItmAppService";

export const CGME0411001Q = (props: any) => {
    const pgeUid = "CGME0411001Q";
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();

    const form = {
        rpckItmAppSrch: useForm({
            defaultSchema: SF_RPCK_ITM_APP_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const onSubmit = (data: FormValuesType) => {
        console.log(data);
    };

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
                                onClick={() => {
                                    form.rpckItmAppSrch.reset();
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
