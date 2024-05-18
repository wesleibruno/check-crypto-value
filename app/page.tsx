"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoCard from '../components/CryptoCard';
import SearchBar from '../components/SearchBar';

interface PriceData {
  symbol: string;
  price: string;
}

export default function Home() {
  const [prices, setPrices] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get<PriceData[]>('https://api.binance.com/api/v3/ticker/price');
        const pricesData = response.data.reduce((acc, item) => {
          acc[item.symbol] = item.price;
          return acc;
        }, {} as { [key: string]: string });

        // Ordenar os preços em ordem decrescente
        const sortedPrices = Object.entries(pricesData)
          .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a))
          .reduce((acc, [symbol, price]) => {
            acc[symbol] = price;
            return acc;
          }, {} as { [key: string]: string });

        setPrices(sortedPrices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from Binance API', error);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // Atualiza a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredPrices = Object.keys(prices).filter((symbol) =>
    symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Crypto Prices</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrices.map((symbol) => (
          <CryptoCard key={symbol} symbol={symbol} price={prices[symbol]} />
        ))}
      </div>
    </div>
  );
}
