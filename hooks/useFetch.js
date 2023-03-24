import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from "@env";

// const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
            ...query,
        },
        headers: {
            "X-RapidAPI-Key":
                "ee9420864emsh3f584ecdb487c99p10fc85jsn19130876a4b4",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.request(options);
            setData(res.data.data);
            setIsLoading(false);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;
