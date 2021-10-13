
export const displayComponent = (isActive: boolean): React.CSSProperties => {
  return isActive ? {display: "block"} : {display: "none"};
};
