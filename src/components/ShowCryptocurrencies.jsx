import { useState } from "react";
import apiConsumption from "../helpers/api";
import CryptocurrencyCards from "./CryptocurrencyCards";
import prueba from '../Json/prueba.JSON'

const Cryptocurrencies = () => {

    const [api, setApi] = useState([]);
    const [search, setSearch] = useState('')

    const cryptocurrencyUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    const searchCryptocurrencyUrl = `https://api.coingecko.com/api/v3/search?query=${search}`

    const showCryptocurrencyApi = async (urlApi) => {
        const data = await apiConsumption(urlApi);
        if (urlApi === searchCryptocurrencyUrl) {
            setApi(data.coins);
        } else {
            setApi(data);
        }
        console.log(data);
    };

    const searchCryptocurrencies = (event) => {
        setSearch(event.target.value.toLowerCase())
        showCryptocurrencyApi(searchCryptocurrencyUrl)
    }

    if (api.length === 0) {
        showCryptocurrencyApi(prueba);
    }

    const renderCryptocurrency = api.map((coins) => (
        <>
            <CryptocurrencyCards
                name={coins.name}
                image={coins.image === undefined ? coins.large : coins.image}
                price={coins.current_price}
                symbol={coins.symbol} />
        </>
    ))

    return (
        <>
            <h1>Control Panel</h1>
            <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={searchCryptocurrencies}
                placeholder="Enter your search currency request..."
            />
            {renderCryptocurrency}
        </>
    );
};

export default Cryptocurrencies;