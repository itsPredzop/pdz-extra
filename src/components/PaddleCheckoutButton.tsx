'use client';

import { useEffect, useState } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';

interface PaddleCheckoutButtonProps {
  productId: string; // This should be the Paddle Price ID or Product ID
  className?: string;
  children?: React.ReactNode;
}

export default function PaddleCheckoutButton({ productId, className, children }: PaddleCheckoutButtonProps) {
  const [paddle, setPaddle] = useState<Paddle | undefined>();

  useEffect(() => {
    // Initialize Paddle
    const initPaddle = async () => {
      const paddleInstance = await initializePaddle({
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV === 'production' ? 'production' : 'sandbox',
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '', // Your Paddle Client Token
      });
      setPaddle(paddleInstance);
    };

    initPaddle();
  }, []);

  const openCheckout = () => {
    if (paddle) {
      paddle.Checkout.open({
        items: [
          {
            priceId: productId, // E.g., 'pri_01h...'
            quantity: 1,
          },
        ],
      });
    } else {
      console.error('Paddle has not been initialized yet');
    }
  };

  return (
    <button onClick={openCheckout} className={className} disabled={!paddle}>
      {children || 'Buy Now'}
    </button>
  );
}
