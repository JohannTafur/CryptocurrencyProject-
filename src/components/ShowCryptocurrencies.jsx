import { useEffect, useState } from "react";
import fetchData from "../helpers/fetchData";
import SearchCryptocurrency from "./SearchCryptocurrency";
import CryptocurrencyCard from "./CryptocurrencyCard";
import Graph from "./ShowGraph";
import prueba from '../Json/prueba.JSON'

const Cryptocurrencies = () => {

    const [cryptocurrencyData, setcryptocurrencyData] = useState([]);
    const [search, setSearch] = useState('')
    const [selectCryptocurrency, setSelectCryptocurrency] = useState([])
    const [searchData, setSearchData] = useState([]);

    const cryptocurrencyUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    const searchCryptocurrencyUrl = `https://api.coingecko.com/api/v3/search?query=${search}`

    const showCryptocurrencyApi = async (urlApi) => {
        try {
            const data = await fetchData(urlApi);
            setcryptocurrencyData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        showCryptocurrencyApi(cryptocurrencyUrl);
    }, [])

    useEffect(() => {
        const fetchSearch = async (urlSearch) => {
            const data = await fetchData(urlSearch)
            setSearchData(data)
        }

        fetchSearch(searchCryptocurrencyUrl)
    }, [search])

    const cryptocurrencyFilter = search
        ? cryptocurrencyData.filter((coin) =>
            searchData.coins.some((searchCoin) => searchCoin.id === coin.id)
        )
        : cryptocurrencyData;

    console.log(cryptocurrencyFilter)

    const renderCryptocurrency = cryptocurrencyFilter.map((coins) => (
        <div className="cryptocurrencyCard" key={coins.id} onClick={() => setSelectCryptocurrency({ id: coins.id, price: coins.current_price })}>
            <CryptocurrencyCard
                image={coins.image || coins.large}
                name={coins.name}
                symbol={coins.symbol}
                price={coins.current_price.toFixed(2).replace('.', ',')}
            />
        </div>
    ));

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