const SearchCryptocurrency = ({ search, searchCryptocurrencies }) => {
    return (
        <>
            <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={searchCryptocurrencies}
                placeholder="Enter your search currency request..."
            />
        </>
    )
}

export default SearchCryptocurrency