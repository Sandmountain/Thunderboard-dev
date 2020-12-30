import React, { useEffect, useState } from 'react';

export const useResize = (myRef) => {
  const [sidebarWidth, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(myRef.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return { sidebarWidth };
};
