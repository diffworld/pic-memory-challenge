import React, { useEffect, useContext, useState, useRef } from 'react'
import { gamerContext } from '../context/Gamer';
import { Image } from 'react-bootstrap';

import '../assets/css/GameUI.scss';

export default function GameUI(props) {    
    const { getImages } = useContext(gamerContext);
    const [imagesList, setImagesList] = useState(null);
    const [imagesUI, setImagesUI] = useState(null);
    const cardsRef = useRef([]);

    const handleClickCards = (event, id, index) => {
        let classes = cardsRef.current[index].className.split(' ');
        const classExisted = (cl) => cl === 'opened';
        if ( classes.findIndex( classExisted ) == -1 ) {
            cardsRef.current[index].className = 'flip-card opened';
        } else {
            cardsRef.current[index].className = 'flip-card';
        }
    }

    useEffect(() => {
        if (imagesList) {
            // Generate images into cards
            var cards;
            cards = imagesList.map( (img, index) => {
                return <div id={`card-${img.id}`}
                            className='flip-card'
                            onClick={(event, id) => handleClickCards(event, img.id, index) }
                            ref={ref => { cardsRef.current[index] = ref}}>
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <p>hi</p>
                                </div>
                                <div className="flip-card-back" style={{ backgroundImage: `url('${img.urls.small}')` }}>                  
                                </div>
                            </div>
                        </div>
            });

            let rows = 3;
            let cols = Math.floor(imagesList.length / rows);
            let index = 0;
            let tr = [];
            for (var i = 0; i < rows; i++) {
                var td = [];
                for (let j = 0; j < cols; j++) {
                    td.push(<td key={`${i}-${j}`}>{cards[index]}</td>);
                    index++;
                }
                tr.push(<tr key={i}>{td}</tr>);
            }
            setImagesUI(tr);
        }
    }, [imagesList])

    useEffect(() => {
        const qs = `query=thailand&orientation=landscape&count=6`;
        const responseFun = (response) => {
            setImagesList(response);
            //setImagesList(response.data);
        }
        const errorFunc = (respone) => {
            console.log(respone);
        }
        getImages(qs, responseFun, errorFunc);
    }, [])

    return (     
        <table className="GameUITable">
            <tbody>
                {imagesUI}                
            </tbody>            
        </table>
    )
}
