const CryptocurrencyCard = ({ name, image, price, symbol }) => {
    return (
        <>
            <img src={image} alt={name} className="cryptocurrencyImage" />
            <div className="cryptocurrencyInformation">
                <h3 className="cryptocurrencyName">{name}</h3>
                <p className="cryptocurrencySymbole">{symbol}</p>
            </div>
            <h3 className="cryptocurrencyPrice">${price}</h3>
        </>
    )
}

export default CryptocurrencyCard