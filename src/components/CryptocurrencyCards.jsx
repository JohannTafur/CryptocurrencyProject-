import '../style.css'

const CryptocurrencyCards = ({ name, image, price, symbol }) => {
    return (
        <div className="card">
            <img src={image} alt={name} className="imageOfCryptocurrency" />
            <div className="cryptocurrencyInformation">
                <h3 className="cryptocurrencyName">{name}</h3>
                <p class="cryptocurrencySymbole">{symbol}</p>
            </div>
            <h3>${price}</h3>
        </div>
    )
}

export default CryptocurrencyCards