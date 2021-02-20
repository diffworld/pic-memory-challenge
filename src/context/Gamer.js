import React, { useState } from 'react';
import axios from 'axios';
import configs from '../config.json';
import data6 from '../data6.json';
import data9 from '../data9.json';
import data12 from '../data12.json';

export const gamerContext = React.createContext();

export const GamerProvider = ({ children }) => {

    const [challenge, setChallenge] = useState('6');
    const [cate, setCate] = useState('cat');

    const [score, setScore] = useState(0);

    const [gameNum, setGameNum] = useState(1);

    const getImages = (responseFun, errorFunc) => {
        // if (challenge === '6')
        //     responseFun(data6);
        // else if (challenge === '9')
        //     responseFun(data9);
        // else if (challenge === '12')
        //     responseFun(data12);
        // return;   
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
            score, setScore,
            gameNum, setGameNum }}>
            {children}
        </gamerContext.Provider>
    );
}