import { useState, useEffect } from "react";

export const useTvlAndVolume = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/data.json'); // Path to your JSON file
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, []);

    return data || {};
};
