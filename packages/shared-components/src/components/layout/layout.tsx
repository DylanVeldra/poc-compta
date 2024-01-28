import { ReactNode } from 'react';
import Head from 'next/head';
import { useLanguageDictionary } from '@shared-hooks';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const dict = useLanguageDictionary();

  return (
    <div className="flex items-stretch min-h-screen">
      <Head>
        <link rel="icon" href="/logo.svg" />
        <meta name="og:title" content={process.env.NEXT_PUBLIC_APP_NAME} />
      </Head>
      <main className="flex w-full bg-fake-white dark:bg-fake-black font-sans">
        <>{props.children}</>
      </main>
    </div>
  );
}
