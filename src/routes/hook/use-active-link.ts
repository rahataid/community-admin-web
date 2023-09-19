import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

type ReturnType = boolean;

export function useActiveLink(path: string, deep = true): ReturnType {
  const pathname = usePathname();

  console.log(path)
  const checkPath = path.toString().startsWith('#');

  const currentPath = path === '/' ? '/' : `${path}/`;

  const normalActive = !checkPath && pathname === currentPath;

  const deepActive = !checkPath && pathname.includes(currentPath);

  return deep ? deepActive : normalActive;
}
