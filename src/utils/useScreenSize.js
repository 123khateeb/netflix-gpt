import { useEffect, useState } from "react";


const getScreenName = (width) => {
  if (width < 480) return "smallMobile";
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1280) return "desktop";
  return "largeDesktop";
};

const useScreenSize = () => {
  const getWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 0;

  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    let timer;

    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setWidth(getWidth());
      }, 200); // smooth & performance friendly
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
        width,
        screen: getScreenName(width),
    }
};

export default useScreenSize;
