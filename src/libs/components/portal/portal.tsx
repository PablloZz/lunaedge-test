import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

type Properties = {
  children: React.ReactNode;
};

const Portal: React.FC<Properties> = ({ children }) => {
  const portalNode = useMemo(() => {
    return document.createElement("div");
  }, []);

  useEffect(() => {
    document.body.append(portalNode);

    return () => {
      portalNode.remove();
    };
  }, [portalNode]);

  return createPortal(children, portalNode);
};

export { Portal };
