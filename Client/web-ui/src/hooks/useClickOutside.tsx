import React, { useEffect } from "react";

interface ClickOutsideProps {
  onClick(e: MouseEvent): void;
  ref: React.RefObject<HTMLElement>;
}

const useClickOutside = ({ref, onClick}: ClickOutsideProps ) => {
  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (onClick && !ref.current.contains(e.target as Node)) {
        onClick(e);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick]);
};

export default useClickOutside;
