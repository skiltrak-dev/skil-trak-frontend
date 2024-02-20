import { isBrowser } from "@utils";
import { useEffect, useState } from "react";

export const useWindowWidth = () => {
    const [width, setWidth] = useState(isBrowser() ? window.innerWidth : 0);
    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return width;
}