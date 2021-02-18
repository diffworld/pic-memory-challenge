import React, { useEffect, useContext, useState, useRef } from 'react'
import { gamerContext } from '../context/Gamer';
import { Image } from 'react-bootstrap';

import '../assets/css/GameUI.scss';

export default function GameUI(props) {    
    const { getImages, cate, challenge } = useContext(gamerContext);
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

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    // Image List Change
    useEffect(() => {
        if (imagesList != null) {

            let ranPick = getRndInteger(0, imagesList.length-1);
            //console.log('ranPick', ranPick);

            // Random add
            let ranAdd = getRndInteger(0, challenge);
            //console.log('ranAdd', ranAdd);

            let newImgList = [...imagesList];
            newImgList.splice(ranAdd, 0, imagesList[ranPick]);
            //console.log('new', newImgList);

            // Generate images into cards
            var cards;            
            cards = newImgList.map( (img, index) => {
                return <div id={`card-${img.id}`}
                            className='flip-card'
                            onClick={(event, id) => handleClickCards(event, img.id, index) }
                            ref={ref => { cardsRef.current[index] = ref}}>
                            <div className="flip-card-inner">
                                <div className="flip-card-front"></div>
                                <div className="flip-card-back" style={{ backgroundImage: `url('${img.urls.small}')` }}>                  
                                </div>
                            </div>
                        </div>
            });
            // Output in table
            let rows = 3;
            let cols = Math.floor(newImgList.length / rows);
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
    }, [imagesList]);

    // Cate, Challenge Change
    useEffect(() => {
        console.log(cate, challenge);

    }, [cate, challenge])

    // First time loader
    useEffect(() => {
        const responseFun = (response) => {
            //setImagesList(response);
            setImagesList(response.data);
        }
        const errorFunc = (respone) => {
            console.log(respone);
        }
        getImages(responseFun, errorFunc);
    }, []);

    return (     
        <table className="GameUITable">
            <tbody>
                {imagesUI}                
            </tbody>            
        </table>
    )
}
