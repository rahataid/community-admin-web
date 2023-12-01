'use client';

// routes
import { paths } from '@routes/paths';
import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'src/routes/hook';
import useAuthStore from 'src/store/auths';
//

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const authenticated = useAuthStore((state) => state.isAuthenticated);
  const returnTo = searchParams.get('returnTo');
  // const { isActive } = useWeb3React();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(returnTo || paths.dashboard.root);
    }
  }, [authenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);
  return <>{children}</>;
}
