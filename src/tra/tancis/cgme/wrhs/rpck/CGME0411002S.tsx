import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { envs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useToast, useFetch, useModal, useAuth } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_RPCK_ITM_APP } from "./services/RpckItmAppService";

/**
 * 페이지 구현 순서
 *
 * 1. method, util import 및 선언
 * 2. form 초기화
 * 3. fetch 초기화
 * 4. 내부 로직 구현
 * 5. handler 초기화
 *
 * 1. ui component 배치
 * 2. schema 연결 (form, grid 등)
 * 3. handler 연결
 */

export const CGME0411002S = () => {
    const pgeUid = "UI-CGME-0411-002S";

    const navigate = useNavigate();
    const { t } = useTranslation();
    const modal = useModal();
    const toast = useToast();
    const auth = useAuth();

    /**
     * form 초기화
     */
    const form = {
        rpckItmApp: useForm({
            defaultSchema: SF_RPCK_ITM_APP,
            defaultValues: { prcsTpCd: "A" },
        }),
    };

    /**
     * fetch 초기화
     */
    const fetch = {
        saveRpckItmApp: useFetch({
            /**
             * fetch 인자로 data를 전달받아 tin과 함께 호출
             */
            api: (data) => APIS.saveRpckItmApp({ ...data, dcltTin: auth.get("tin") }),
            onSuccess: () => {
                toast.showToast({ type: "success", content: "success" });
                handler.navigateToList();
            },
            onError: () => {},
        }),
    };

    /**
     * 수하인 - 통지처 값 동기화 로직
     */
    const [sameAsAbove, setSameAsAbove] = useState(false);
    useEffect(() => {
        /**
         * sameAsAbove 값에 따라 해당 필드 readOnly
         */
        form.rpckItmApp.setSchemas(["ntprTin", "ntprNm", "ntprTelno", "ntprAddr"], { readOnly: sameAsAbove });
        if (!sameAsAbove) return;

        /**
         * 동기화 적용 시 로직
         * (sameAsAbove=true)
         */
        const matched = {
            cnsiTin: "ntprTin",
            cnsiNm: "ntprNm",
            cnsiTelno: "ntprTelno",
            cnsiAddr: "ntprAddr",
        };

        /**
         * 1.
         * 현재의 ntpr값을 cnsi값과 일치
         */
        Object.entries(matched).forEach(([cnsi, ntpr]) => {
            form.rpckItmApp.setValue(ntpr, form.rpckItmApp.getValues(cnsi));
        });

        /**
         * 2.
         * 각 cnsi필드 value의 변화를 감지하여 ntpr필드에 삽입
         */
        const subscription = form.rpckItmApp.watch((value, { name }) => {
            switch (name) {
                case "cnsiTin":
                case "cnsiNm":
                case "cnsiTelno":
                case "cnsiAddr":
                    form.rpckItmApp.setValue(matched[name], value[name]);
            }
        });

        /**
         * clean up
         */
        return () => {
            subscription.unsubscribe();
        };
    }, [sameAsAbove]);

    /**
     * event handler
     */
    const handler = {
        /**
         * 목록으로 이동
         */
        navigateToList: () => navigate(URLS.cgme0411001q),

        /**
         * 제출
         * validation 성공 시 open modal,
         * modal confirm 시 fetch
         * validation 실패 시 toast
         */
        saveRpckItmApp: form.rpckItmApp.handleSubmit(
            (data) => {
                modal.openModal({
                    onConfirm: () => {
                        fetch.saveRpckItmApp.fetch(data);
                    },
                });
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            }
        ),

        /**
         * 제출
         * validation 성공 시 fetch
         * validation 실패 시 toast
         */
        submitRpckItmApp: form.rpckItmApp.handleSubmit(
            (data) => {
                fetch.saveRpckItmApp.fetch(data);
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            }
        ),
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
                            <Group.Control {...form.rpckItmApp.schema.rprtNo} />
                            <Group.Control {...form.rpckItmApp.schema.prcssStatCd} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.mblNo} />
                            <Group.Control {...form.rpckItmApp.schema.crn} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.cagClsfCd} />
                            <Group.Control {...form.rpckItmApp.schema.dstnPlcCd} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.godsDesc} />
                            <Group.Control {...form.rpckItmApp.schema.loadPortCd} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label={"L_PCKG_NO"} required={true} />
                            <Group.Col>
                                <Group.Control {...form.rpckItmApp.schema.blPckgNo} controlSize={2} />
                                <Group.Control {...form.rpckItmApp.schema.pckgUtCd} controlSize={2} />
                            </Group.Col>
                            <Group.Control {...form.rpckItmApp.schema.blGwght} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.pckgTpCd} />
                            <Group.Control {...form.rpckItmApp.schema.blNwght} />
                        </Group.Row>
                    </Group.Body>
                    <Group.Header title={"L_CO"} titleSize={2}></Group.Header>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.exppnTin} />
                            <Group.Control {...form.rpckItmApp.schema.exppnNm} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.exppnTelno} />
                            <Group.Control {...form.rpckItmApp.schema.exppnAddr} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.cnsiTin} />
                            <Group.Control {...form.rpckItmApp.schema.cnsiNm} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.cnsiTelno} />
                            <Group.Control {...form.rpckItmApp.schema.cnsiAddr} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="boolean"
                                inputLabel="L_SAME_AS_ABOVE"
                                value={sameAsAbove}
                                onChange={(value) => setSameAsAbove(value)}
                            />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.ntprTin} />
                            <Group.Control {...form.rpckItmApp.schema.ntprNm} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.ntprTelno} />
                            <Group.Control {...form.rpckItmApp.schema.ntprAddr} />
                        </Group.Row>
                    </Group.Body>
                    <Group.Header title={"L_WRHS"} titleSize={2}></Group.Header>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.wrhsCd} controlSize={10} />
                        </Group.Row>
                    </Group.Body>
                    <Group.Header title={"L_RPCK_ITM_LST"} titleSize={2}></Group.Header>
                </Group>

                <Group bgColor={false}>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button onClick={handler.navigateToList}>{t("B_LST")}</Button>
                        </Layout.Left>
                        <Layout.Right>
                            <Button onClick={handler.saveRpckItmApp}>{t("B_SAVE")}</Button>
                            <Button onClick={handler.submitRpckItmApp}>{t("B_SBMT")}</Button>
                        </Layout.Right>
                    </Layout>
                </Group>
            </form>
        </Page>
    );
};
