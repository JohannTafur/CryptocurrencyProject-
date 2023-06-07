const fetchData = async (urlApi) => {
    try {
        const response = await fetch(urlApi);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting cryptocurrency: ', error);
    }
};

export default fetchData;