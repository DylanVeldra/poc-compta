import { useLanguageDictionary } from "@shared-hooks";
import { UserLayout } from "@shared-components/user-layout";
import Head from "next/head";

// Helpers
import { PerformanceSummary } from "components/perfomance-summary";
import { useRouter } from "next/router";

export default function PerformanceMonitoring() {
  const dict = useLanguageDictionary();
  const router = useRouter();

  const title = `${
    process.env.NEXT_PUBLIC_APP_NAME
  } | ${dict.performanceMonitoring.myPerformance.toUpperCase()}`;

  return (
    <UserLayout
      pathname={router.pathname}
      title={dict.accountManagement.sidebar[1]}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <PerformanceSummary showProfitTable />
    </UserLayout>
  );
}
