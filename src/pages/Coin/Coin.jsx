import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { Coincontext } from '../../context/coinContect';
import Linechart from '../../components/Linechart/Linechart';

const Coin = () => {
    const { coinId } = useParams();
    const [coinData, setcoinData] = useState(null);
    const [historicalData, sethistoricalData] = useState(null);
    const { currency } = useContext(Coincontext);

    // Fetch coin details
    const fetchCoinData = async () => {
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
            const data = await res.json();
            setcoinData(data); // Update the state with fetched data
        } catch (err) {
            console.error("Error fetching coin data:", err);
        }
    };

    // Fetch historical data
    const fetchHistoricalData = async () => {
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency?.name}&days=10&interval=daily`,
                options
            );
            const data = await res.json();
            sethistoricalData(data); // Update the state with historical data
        } catch (err) {
            console.error("Error fetching historical data:", err);
        }
    };

    useEffect(() => {
        fetchCoinData();
        fetchHistoricalData();
    }, [currency, coinId]); // Add `currency` and `coinId` to the dependency array

    if (!coinData) {
        return (
            <div className="spinner">
                <div className="spin"></div>
            </div>
        );
    }

    return (
        <div className="coin">
            <div className="coin-name">
                <img src={coinData.image?.large} alt={coinData.name} />
                <p><b>{coinData.name} ({coinData.symbol?.toUpperCase()})</b></p>
            </div>
            <div className="coin-chart">
                <Linechart historicalData={historicalData?.prices} />
            </div>
            <div className="coin-details">
                <p>Market Cap Rank: {coinData.market_cap_rank}</p>
                <p>Current Price: {currency?.symbol} {coinData.market_data?.current_price[currency?.name]}</p>
              
            </div>
          
        </div>
    );
};

export default Coin;
