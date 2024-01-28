import { ReactNode, useEffect } from 'react';
import { ProtectedPagesHeader } from '@shared-components/protected-pages-header';
import { Layout } from '@shared-components/layout';
import { Sidebar } from '@shared-components/sidebar';
import { useRouter } from 'next/router';
// Hooks
import { useProfile } from '@shared-hooks';
import { motion } from 'framer-motion';

interface UserLayoutProps {
  title: string | ReactNode;
  pathname: string;
  children: ReactNode;
  isOnProfile?: boolean;
  onProfileLoaded?: (user: any) => Promise<void> | void;
  isAdmin?: boolean;
  goBackwards?: string;
}

export default function UserLayout(props: UserLayoutProps) {
  const [user, isLoading] = useProfile(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (user === undefined) {
      router.push('/login');
      return;
    }

    if (!user.emailVerified) {
      router.push('/email-verification');
      return;
    }
    if (!user.twoFactorVerified) {
      router.push('/enable-2fa');
      return;
    }
    if (!user.emailLogged) {
      router.push('/login');
      return;
    }
    if (!user.twoFactorLogged) {
      router.push('/login');
      return;
    }

    const isPromise = props.onProfileLoaded?.(user);
    if (isPromise) {
      isPromise.then();
    }
  }, [isLoading, user]);

  return (
    <Layout>
      <Sidebar pathname={props.pathname} isAdmin={props.isAdmin} />
      <div className="w-full h-100 overflow-y-auto p-[16px] md:p-[30px] sm:p-[46px] flex flex-col">
        <ProtectedPagesHeader
          pathname={props.pathname}
          title={props.title}
          isOnProfile={props.isOnProfile}
          goBackwards={props.goBackwards}
          isAdmin={props.isAdmin}
        />
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-[100%]"
          >
            <>{props.children}</>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
