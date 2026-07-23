'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pdz-cookie-consent');
    if (!consent) {
      // Delay showing to avoid layout shift
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('pdz-cookie-consent', 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="bg-card-bg border border-card-border rounded-xl p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <Cookie className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-foreground font-medium mb-1">Cookie Notice</p>
                <p className="text-xs text-muted leading-relaxed mb-4">
                  We use cookies to enhance your browsing experience and analyze site traffic. By
                  clicking &quot;Accept&quot;, you consent to our use of cookies.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={accept}
                    className="bg-accent hover:bg-accent-hover text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  >
                    Accept
                  </button>
                  <Link
                    href="/privacy-policy"
                    className="text-xs text-muted hover:text-foreground transition-colors"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
              <button
                onClick={accept}
                className="text-muted hover:text-foreground transition-colors flex-shrink-0"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
