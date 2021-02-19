import React, { useEffect, useContext, useState, useRef } from 'react'
import { gamerContext } from '../context/Gamer';
import { Image } from 'react-bootstrap';

import '../assets/css/GameUI.scss';

export default function GameUI() {    
    
    const { getImages, cate, challenge,
            score, setScore,
            gameNum, setGameNum } = useContext(gamerContext);

    const [imagesList, setImagesList] = useState(null);
    const [addedImagesList, setAddedImagesList] = useState(null);

    const [imagesUI, setImagesUI] = useState(null);
    const cardsRef = useRef([]);

    const opened1Ref = useRef('');
    const opened2Ref = useRef('');

    const [curGameNum, setCurGameNum] = useState(1);

    // Open a card
    const openCard = ( index ) => {
        cardsRef.current[index].className = 'flip-card opened';
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    const handleClickCards = (event, id, index) => {
        if (opened1Ref.current === '') {
            openCard(index);
            opened1Ref.current = index;
        } else {
            if (opened2Ref.current === '' ) {
                openCard(index);
                opened2Ref.current = index;
                validateCards();
            }
        }
    }

    const validateCards = () => {
        let card1Id = cardsRef.current[opened1Ref.current].id;
        let card2Id = cardsRef.current[opened2Ref.current].id;

        if (card1Id === card2Id) { // WIN
            let newScrore = parseInt(score);
            setScore(newScrore + 1);
            resetGame();
            alert('WIN');
        } else {
            opened1Ref.current = '';
            opened2Ref.current = '';
            closeAllCard();
        }
    }

    const closeAllCard = () => {
        return new Promise ( (resolve, reject) => {
            for (let i = 0; i < challenge; i++) {
                cardsRef.current[i].className = 'flip-card';
            }
            resolve();
        });
    }

    const loadImages = () => {
        return new Promise ( (resolve, reject) => {
            const responseFun = (response) => {
                setImagesList(response);
                //setImagesList(response.data);
            }
            const errorFunc = (respone) => {
                console.log(respone);
            }
            getImages(responseFun, errorFunc);
            resolve(true);
        });
    }

    async function resetGame() { 
        await closeAllCard();  // Close all card
        
        await new Promise ( (resolve, reject) => { // Remove var
            opened1Ref.current = opened2Ref.current = '';
            cardsRef.current = [];
            setImagesList(null);
            setAddedImagesList(null)
            setImagesUI(null);
            resolve();
        });

        // Load new images
        await loadImages();

        let g = parseInt(curGameNum); // Update Game Num
        setCurGameNum(g+1);
        setGameNum(g+1);
    };

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
            setAddedImagesList(newImgList);
            //console.log('new', newImgList);

            // Generate images into cards
            var cards;            
            cards = newImgList.map( (img, index) => {
                return <div id={`card-${img.id}`}
                            className='flip-card'
                            onClick={(event, id, cardIndex) => handleClickCards(event, img.id, index) }
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
        console.log('cate', cate, challenge);

    }, [cate, challenge])

    // First time loader
    useEffect(() => {
        loadImages();
    }, []);

    // Reset change
    useEffect(() => {
        console.log('game num', gameNum, curGameNum);
        if (gameNum > curGameNum) { // Game reseted
            resetGame();
        }
    }, [gameNum, curGameNum])

    return (     
        <table className="GameUITable">
            <tbody>
                {imagesUI}                
            </tbody>            
        </table>
    )
}
