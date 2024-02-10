import { ReactNode, useEffect } from 'react';
import { ProtectedPagesHeader } from '@shared-components/protected-pages-header';
import { Layout } from '@shared-components/layout';
import { Sidebar } from '@shared-components/sidebar';
import { useRouter } from 'next/router';
// Hooks
import { useProfile } from '@shared-hooks';
import { motion } from 'framer-motion';
import { NavItem } from 'src/var/navigation';

interface UserLayoutProps {
  title: string | ReactNode;
  pathname: string;
  children: ReactNode;
  isOnProfile?: boolean;
  onProfileLoaded?: (user: any) => Promise<void> | void;
  navItems: NavItem[];
  goBackwards?: string;
}

export default function UserLayout(props: UserLayoutProps) {
  const {user, isLoading, accessToken} = useProfile(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    
    if (user === undefined || accessToken === undefined) {
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
    if (!accessToken.emailLogged) {
      router.push('/login');
      return;
    }
    if (!accessToken.twoFactorLogged) {
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
      <Sidebar pathname={props.pathname} navItems={props.navItems} />
      <div className="w-full h-100 overflow-y-auto p-[16px] md:p-[64px] sm:p-[46px] flex flex-col">
        <ProtectedPagesHeader
          pathname={props.pathname}
          title={props.title}
          isOnProfile={props.isOnProfile}
          goBackwards={props.goBackwards}
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
