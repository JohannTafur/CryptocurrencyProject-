import { useState } from "react";
import apiConsumption from "../helpers/api";
import CryptocurrencyCards from "./CryptocurrencyCards";
import prueba from '../Json/prueba.JSON'

const Cryptocurrencies = () => {
    const [api, setApi] = useState([]);

    const showCryptocurrency = async () => {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
        const data = await apiConsumption(prueba);
        console.log(data);
        setApi(data);
    };

    if (api.length === 0) {
        showCryptocurrency();
    }

    return (
        <>
            {api.map((coins) => (
                // <h1 key={coins.id}>{coins.name}</h1>
                <CryptocurrencyCards name={coins.name} image={coins.image} price={coins.current_price} symbol={coins.symbol} />
            ))}
        </>
    );
};

export default Cryptocurrencies;