import { useState } from "react";
import apiConsumption from "../helpers/api";
import CryptocurrencyCards from "./CryptocurrencyCards";
import Search from "./SearchCryptocurrencies";
import Graph from "./ShowGraph";
import prueba from '../Json/prueba.JSON'

const Cryptocurrencies = () => {

    const [api, setApi] = useState([]);
    const [search, setSearch] = useState('')
    const [selected, setSelected] = useState({})

    const cryptocurrencyUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    const searchCryptocurrencyUrl = `https://api.coingecko.com/api/v3/search?query=${search}`

    const showCryptocurrencyApi = async (urlApi) => {
        try {
            const data = await apiConsumption(urlApi);
            if (urlApi === searchCryptocurrencyUrl) {
                setApi(data.coins);
            } else {
                setApi(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const FilterCryptocurrencySearch = search ? api.filter((coins) =>
        coins.name.toLowerCase().startsWith(search.toLowerCase()) || coins.symbol.toLowerCase().startsWith(search.toLowerCase())
    )
        : api;

    const renderCryptocurrency = FilterCryptocurrencySearch.map((coins) => (
        <div className="card" key={coins.id} onClick={() => setSelected({ id: coins.id, price: coins.current_price })}>
            <CryptocurrencyCards
                name={coins.name}
                image={coins.image === undefined ? coins.large : coins.image}
                price={coins.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, ",")}
                symbol={coins.symbol} />
        </div>
    ))

    if (api.length === 0) {
        showCryptocurrencyApi(prueba);
    }

    return (
        <>
            <Graph idCoin={selected.id} price={selected.price} />
            <div className="showCryptocurrencies">
                <h1>Control Panel</h1>
                <Search search={search} searchCryptocurrencies={(e) => setSearch(e.target.value)} />
                <div className="cryptocurrencies">
                    {renderCryptocurrency}
                </div>
            </div>
        </>
    );
};

export default Cryptocurrencies;