"use client";

import BrowserUtils from '@/lib/utils/browser.utils';
import { useEffect, useState } from 'react';

export default function SummerSpintacularFlier() {
  const [isMobile, setIsMobile] = useState(false);
  const imgLink = "/images/fliers/summer-spintacular-2026.jpg";

  useEffect(() => {
    if (BrowserUtils.isMobileUserAgent()) {
      setIsMobile(true);
      // Set the previous history entry to home, then redirect
      window.history.replaceState(null, '', '/');
      window.location.replace(imgLink);
    }
  }, []);

  if (isMobile) {
    return <div style={{textAlign: 'center', marginTop: 40}}>Opening Flier...</div>;
  } else {
    return (
        <div style={{ height: '100%', width: '100vw' }}>
        <img
            src={imgLink}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="Summer Spintacular 2026 Flier"
        />
        </div>
    );
    }
}