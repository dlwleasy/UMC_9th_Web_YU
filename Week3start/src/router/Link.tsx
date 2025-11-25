import { MouseEvent } from 'react';
import { navigateTo, getCurrentPath } from './utils';

export const Link = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (getCurrentPath() === to) return;
    navigateTo(to);
  };
  return <a href={to} onClick={handleClick}>{children}</a>;
};