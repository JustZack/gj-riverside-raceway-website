"use client";

import { useEffect, useState } from 'react';

export default function FebruaryFreezePDF() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const ua = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    };
    if (checkMobile()) {
      setIsMobile(true);
      window.location.href = "/results/February Freeze 2.7.2026 Results.pdf";
    }
  }, []);

  if (isMobile) {
    return <div style={{textAlign: 'center', marginTop: 40}}>Opening PDF...</div>;
  }

  return (
    <div style={{ height: '100%', width: '100vw' }}>
      <iframe
        src="/results/February Freeze 2.7.2026 Results.pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="February Freeze 2.7.2026 Results"
      />
    </div>
  );
}