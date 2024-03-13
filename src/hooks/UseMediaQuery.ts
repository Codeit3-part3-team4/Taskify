"use client"

import { useEffect, useState } from "react";

export enum MediaQueryType {
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
}

export const UseMediaQuery = () => {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryType>(MediaQueryType.MOBILE);

  const handleMediaQuery = (event:MediaQueryListEvent, queryType: MediaQueryType) => {
    if(event.matches)
      setMediaQuery(queryType);
  };

  useEffect(() =>{
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const tabletQuery = window.matchMedia('(min-width: 769px) and (max-width: 1024px)');
    const desktopQuery = window.matchMedia('(min-width: 1025px)');

    if (mobileQuery.matches) {
      setMediaQuery(MediaQueryType.MOBILE);
    } else if (tabletQuery.matches) {
      setMediaQuery(MediaQueryType.TABLET);
    } else if (desktopQuery.matches) {
      setMediaQuery(MediaQueryType.DESKTOP);
    }

    mobileQuery.addEventListener('change', (event) => {
      if (event.matches)
        handleMediaQuery(event, MediaQueryType.MOBILE);
      });
    tabletQuery.addEventListener('change', (event) => {
      if (event.matches)
        handleMediaQuery(event, MediaQueryType.TABLET);
      });
    desktopQuery.addEventListener('change', (event) => {
      if (event.matches)
        handleMediaQuery(event, MediaQueryType.DESKTOP);
      });
}, []);

  return mediaQuery
}