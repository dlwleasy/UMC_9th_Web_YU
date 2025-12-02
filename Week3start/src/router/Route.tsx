import { ReactElement } from 'react';

type RouteProps = { path: string; component: () => ReactElement };
export function Route(_: RouteProps) {
  return null; // 단순히 구조적 마커 역할
}