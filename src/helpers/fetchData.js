const fetchData = async (urlApi) => {
    try {
        const response = await fetch(urlApi);
        const data = await response.json();
        return data;
    } catch (error) {
        alert("An error occurred while fetching the data. He tries again in a minute.")
    }
};

export default fetchData;