import Head from "next/head";
import { Layout } from "@shared-components/layout";
import { FourOFour } from "@shared-components/four-o-four";

export default function FourOhFour() {
  const title = `${process.env.NEXT_PUBLIC_APP_NAME} | 404`;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <FourOFour />
    </Layout>
  );
}
