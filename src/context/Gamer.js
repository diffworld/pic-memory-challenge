import React, { useState } from 'react';
import axios from 'axios';
import configs from '../config.json';
import data from '../data.json'

export const gamerContext = React.createContext();

export const GamerProvider = ({ children }) => {

    const [challenge, setChallenge] = useState(6);
    const [cate, setCate] = useState('cat');

    const [score, setScore] = useState(0);

    const getImages = (responseFun, errorFunc) => {

        responseFun(data);
        return;   

        let qs = `query=${cate}&orientation=landscape&count=${challenge-1}`;     
        const url = `${configs.IMAGE_API_ENDPOINT}?${qs}&client_id=${configs.IMAGE_API_KEY}`
        axios.get(url)
            .then(response => { responseFun(response) })
            .catch(error => errorFunc(error));
    }

    return (
        <gamerContext.Provider
            value={{ getImages, 
            challenge, setChallenge,
            cate, setCate,
            score, setScore }}>
            {children}
        </gamerContext.Provider>
    );
}