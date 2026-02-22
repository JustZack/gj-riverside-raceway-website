"use client";

import BrowserUtils from '@/lib/utils/browser.utils';
import { useEffect, useState } from 'react';

export default function FebruaryFreezePDF() {
  const [isMobile, setIsMobile] = useState(false);
  const pdfLink = "/results/February.Freeze.pdf";

  useEffect(() => {
    if (BrowserUtils.isMobileUserAgent()) {
      setIsMobile(true);
      // Set the previous history entry to home, then redirect
      window.history.replaceState(null, '', '/');
      window.location.replace(pdfLink);
    }
  }, []);

  if (isMobile) {
    return <div style={{textAlign: 'center', marginTop: 40}}>Opening PDF...</div>;
  } else {
    return (
        <div style={{ height: '100%', width: '100vw' }}>
        <iframe
            src={pdfLink}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="February Freeze 2.7.2026 Results"
        />
        </div>
    );
    }
}