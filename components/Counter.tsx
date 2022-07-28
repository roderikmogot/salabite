import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";

const commafy = (num: string) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(document.createElement("span"));

  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration: 0.5,
      onUpdate(value: number) {
        node.textContent = commafy(value.toFixed(0))
      },
    });
    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef as React.RefObject<HTMLSpanElement>} />;
}
