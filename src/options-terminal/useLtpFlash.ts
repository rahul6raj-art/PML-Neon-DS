import { useEffect, useRef, useState } from 'react';

/** +1 up / -1 down / 0 neutral — resets after a short pulse for tick flash UI */
export function useLtpFlash(lastClose: number): number {
  const prev = useRef(lastClose);
  const [flash, setFlash] = useState(0);

  useEffect(() => {
    const d = lastClose - prev.current;
    prev.current = lastClose;
    const fd = d > 0.0001 ? 1 : d < -0.0001 ? -1 : 0;
    if (fd === 0) return;
    /* LTP tick flash: brief tint — deferred to avoid sync setState-in-effect lint */
    const t0 = window.setTimeout(() => {
      setFlash(fd);
    }, 0);
    const t1 = window.setTimeout(() => setFlash(0), 380);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
    };
  }, [lastClose]);

  return flash;
}
