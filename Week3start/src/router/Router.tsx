import { ReactElement, ReactNode } from 'react';
import { useCurrentPath } from './useCurrentPath';
import { Route } from './Route';

type RouterProps = { children: ReactNode };

export const Router = ({ children }: RouterProps) => {
  const path = useCurrentPath();
  let notFound: ReactElement | null = null;

  for (const child of (children as any[])) {
    if (!child || child.type?.name !== 'Route') continue;
    const { path: p, component: C } = child.props;
    if (p === path) return <C />;
    if (p === '/not-found') notFound = <C />;
  }
  return notFound ?? null;
};