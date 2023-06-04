const CryptocurrencyCards = ({ name, image, price, symbol}) => {
    return (
        <>
            <img src={image} alt={name} className="imageOfCryptocurrency" />
            <div className="cryptocurrencyInformation">
                <h3 className="cryptocurrencyName">{name}</h3>
                <p className="cryptocurrencySymbole">{symbol}</p>
            </div>
            <h3>${price}</h3>
        </>
    )
}

export default CryptocurrencyCards