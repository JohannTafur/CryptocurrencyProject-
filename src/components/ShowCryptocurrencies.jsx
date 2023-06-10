import { useEffect, useState } from "react";
import fetchData from "../helpers/fetchData";
import SearchCryptocurrency from "./SearchCryptocurrency";
import CryptocurrencyCard from "./CryptocurrencyCard";
import ShowGraph from "./ShowGraph";
import prueba from '../Json/prueba.JSON'

const ShowCryptocurrencies = () => {

    const [cryptocurrencyData, setcryptocurrencyData] = useState([]);
    const [searchCryptocurrency, setSearchCryptocurrency] = useState('')
    const [selectCryptocurrency, setSelectCryptocurrency] = useState([])
    const [browserData, setBrowserData] = useState([]);

    const cryptocurrencyUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    const searchCryptocurrencyUrl = `https://api.coingecko.com/api/v3/search?query=${searchCryptocurrency}`

    const showApiCryptocurrencies = async (urlApi) => {
        const data = await fetchData(urlApi);
        setcryptocurrencyData(data);
    };

    const fetchSearch = async (urlSearch) => {
        const data = await fetchData(urlSearch)
        setBrowserData(data)
    }

    const cryptocurrencyFilter = searchCryptocurrency
        ? cryptocurrencyData.filter((coin) =>
            browserData.coins.some((searchCoin) => searchCoin.id === coin.id)
        )
        : cryptocurrencyData;

    const renderCryptocurrency = cryptocurrencyFilter.map((coins) => (
        <div
            className="cryptocurrencyCard"
            key={coins.id}
            onClick={() => setSelectCryptocurrency({ id: coins.id, price: coins.current_price, name: coins.name })}>

            <CryptocurrencyCard
                image={coins.image}
                name={coins.name}
                symbol={coins.symbol}
                price={coins.current_price.toFixed(2).replace('.', ',')}
            />
        </div>
    ));

    useEffect(() => {
        showApiCryptocurrencies(cryptocurrencyUrl);
    }, [])

    useEffect(() => {
        fetchSearch(searchCryptocurrencyUrl)
    }, [searchCryptocurrency])

    return (
        <>
            {cryptocurrencyData.length > 0 && (<ShowGraph
                idCoin={selectCryptocurrency.id || cryptocurrencyData[0].id}
                price={selectCryptocurrency.price || cryptocurrencyData[0].current_price}
                name={selectCryptocurrency.name || cryptocurrencyData[0].name}
            />)}
            <div className="cryptocurrencySection">
                <h1>Control Panel</h1>
                <SearchCryptocurrency
                    search={searchCryptocurrency}
                    searchCryptocurrencies={(event) => setSearchCryptocurrency(event.target.value)}
                />
                <div className="showCryptocurrencies">
                    {renderCryptocurrency}
                </div>
            </div>
        </>
    );
};

export default ShowCryptocurrencies;