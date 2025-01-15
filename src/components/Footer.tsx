// Footer.tsx
import React from 'react';

export function Footer() {
  return (
    <footer style={{ 
      position: 'fixed', 
      bottom: 0, 
      width: '100%', 
      textAlign: 'center', 
      padding: '10px', 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      color: '#fff' 
    }}>
      © 2023 Your Company Name. All rights reserved.
    </footer>
  );
}