import React from 'react';
import axios from 'axios';
import configs from '../config.json';
import data from '../data.json'

export const gamerContext = React.createContext();

export const GamerProvider = ({ children }) => {

    const getImages = (qs, responseFun, errorFunc) => {

        responseFun(data);
        return;
        
        // const url = `${configs.IMAGE_API_ENDPOINT}?${qs}&client_id=${configs.IMAGE_API_KEY}`
        // axios.get(url)
        //     .then(response => { console.log(response); responseFun(response)})
        //     .catch(error => errorFunc(error));
    }

    return (
        <gamerContext.Provider
            value={{ getImages }}>
            {children}
        </gamerContext.Provider>
    );
}