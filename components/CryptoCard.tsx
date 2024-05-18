// components/CryptoCard.tsx
import React from 'react';
import { Card,  CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface CryptoCardProps {
  symbol: string;
  price: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ symbol, price }) => {
  return (
    <Card>
      <CardContent className='p-4'>
        <CardTitle>{symbol}</CardTitle>
        <CardDescription>{price}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
