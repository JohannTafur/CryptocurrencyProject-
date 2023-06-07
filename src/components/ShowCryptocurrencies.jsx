import { useState } from "react";
import fetchData from "../helpers/fetchData";
import SearchCryptocurrency from "./SearchCryptocurrency";
import CryptocurrencyCard from "./CryptocurrencyCard";
import Graph from "./ShowGraph";

import prueba from '../Json/prueba.JSON'

const Cryptocurrencies = () => {

    const [cryptocurrencyData, setcryptocurrencyData] = useState([]);
    const [search, setSearch] = useState('')
    const [selectCryptocurrency, setSelectCryptocurrency] = useState({})

    const cryptocurrencyUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    const searchCryptocurrencyUrl = `https://api.coingecko.com/api/v3/search?query=${search}`

    const showCryptocurrencyApi = async (urlApi) => {
        try {
            const data = await fetchData(urlApi);
            if (urlApi === searchCryptocurrencyUrl) {
                setcryptocurrencyData(data.coins);
            } else {
                setcryptocurrencyData(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const filteredCryptocurrencies = search
        ? cryptocurrencyData.filter((coins) =>
            coins.name.toLowerCase().startsWith(search.toLowerCase()) ||
            coins.symbol.toLowerCase().startsWith(search.toLowerCase())
        )
        : cryptocurrencyData;

    const renderCryptocurrency = filteredCryptocurrencies.map((coins) => (
        <div className="cryptocurrencyCard" key={coins.id} onClick={() => setSelectCryptocurrency({ id: coins.id, price: coins.current_price })}>
            <CryptocurrencyCard
                image={coins.image || coins.large}
                name={coins.name}
                symbol={coins.symbol}
                price={coins.current_price.toFixed(2).replace('.', ',')}
            />
        </div>
    ));


    if (cryptocurrencyData.length === 0) {
        showCryptocurrencyApi(prueba);
    }

    return (
        <>
            <Graph idCoin={selectCryptocurrency.id} price={selectCryptocurrency.price} />
            <div className="cryptocurrencySection">
                <h1>Control Panel</h1>
                <SearchCryptocurrency search={search} searchCryptocurrencies={(event) => setSearch(event.target.value)} />
                <div className="showCryptocurrencies">
                    {renderCryptocurrency}
                </div>
            </div>
        </>
    );
};

export default Cryptocurrencies;