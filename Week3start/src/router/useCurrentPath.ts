import { useEffect, useState} from 'react';
import {ROUTE_CHANGE} from './utils';

export function useCurrentPath() {
    const [path, setPath] = useState(() => window.location.pathname);

    useEffect(()=> {

    const update = () => setPath(window.location.pathname);

    window.addEventListener('popstate', update);
    window.addEventListener(ROUTE_CHANGE, update);

    return () => {
        window.removeEventListener('popstate', update);
        window.removeEventListener(ROUTE_CHANGE, update);
    };
},[]);
return path;
}
