import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { Coincontext } from '../../context/coinContect';
import { Link } from 'react-router-dom';

const Home = () => {
    const { allCoin, currency } = useContext(Coincontext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('');

    const inputHandler = (event) => {
        setInput(event.target.value);
        if(event.target.value ===""){
            setDisplayCoin(allCoin);
        }
    };

    const searchHandler = (event) => {
        event.preventDefault();
        if (allCoin && allCoin.length > 0) {
            const coins = allCoin.filter((item) =>
                item.name.toLowerCase().includes(input.toLowerCase())
            );
            setDisplayCoin(coins);
        }
    };

    useEffect(() => {
        if (allCoin && allCoin.length > 0) {
            setDisplayCoin(allCoin);
        }
    }, [allCoin]);

    return (
        <div className="home">
            <div className="hero">
                <h1>Largest<br />Crypto Marketplace</h1>
                <p>
                    Welcome to the world's largest cryptocurrency Marketplace. Sign in to explore more.
                </p>
                <form onSubmit={searchHandler}>
                    <input
                        onChange={inputHandler}
                        value={input}
                        type="text"
                        list='coinlist'
                        placeholder="Search crypto.."
                        required
                    />
                    
                    <datalist id= 'coinlist'> // code for dropdown list in searchbox
                        {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}
                    </datalist>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p className="market-cap">Market Cap</p>
                </div>
                {displayCoin?.slice(0, 10).map((item, index) => (
                    <Link to={`/coin/${item.id}`}className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <p>{item.name} - {item.symbol}</p>
                            <img src={item.image} alt={item.name} />
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p
                            className={item.price_change_percentage_24h > 0 ? "green" : "red"}
                            style={{ textAlign: "center" }}
                        >
                            {Math.floor(item.price_change_percentage_24h)}%
                        </p>
                        <p className="market-cap">
                            {currency.symbol} {item.market_cap.toLocaleString()}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
