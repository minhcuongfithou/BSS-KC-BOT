'use client';

import { useEffect, useState } from 'react';
import '@/app/styles/toast.css';

export default function Toast({ message, show }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div className={`toast ${visible ? 'show' : ''}`}>
      {message}
    </div>
  );
}
