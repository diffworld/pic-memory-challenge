import React, { useEffect, useContext, useState, useRef } from 'react'
import { gamerContext } from '../context/Gamer';
import { Image } from 'react-bootstrap';

import '../assets/css/GameUI.scss';

export default function GameUI() {    
    
    const { getImages, cate, challenge,
            score, setScore,
            gameNum, setGameNum } = useContext(gamerContext);

    const [imagesList, setImagesList] = useState(null);

    const [imagesUI, setImagesUI] = useState(null);
    const cardsRef = useRef([]);

    const opened1Ref = useRef('');
    const opened2Ref = useRef('');

    const [curGameNum, setCurGameNum] = useState(1);

    const [curCate, setCurCate] = useState('cat');
    const [curChallenge, setCurChallenge] = useState('6');

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
        const responseFun = (response) => {
            setImagesList(response.data);
        }
        const errorFunc = (respone) => {
            console.log(respone);
        }
        getImages(responseFun, errorFunc);
    }

    async function resetGame() { 
        await closeAllCard();  // Close all card
        
        await new Promise ( (resolve, reject) => { // Remove var
            opened1Ref.current = opened2Ref.current = '';
            cardsRef.current = [];
            setImagesList(null);
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
            // Picking one images
            let ranPick = getRndInteger(0, imagesList.length-1);

            // Random position to add dupliced image
            let ranAdd = getRndInteger(0, challenge);
            let newImgList = [...imagesList];
            newImgList.splice(ranAdd, 0, imagesList[ranPick]);

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
            let cols = Math.floor( newImgList.length / rows );
            if ( newImgList.length > 9 ) {
                cols = 3;
                rows = Math.floor(newImgList.length / cols);
            }
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
        if ( curCate != cate || curChallenge != challenge ) {
            console.log(`changed cate=${cate} or challege=${challenge}`);
            loadImages();
            setCurCate(cate);
            setCurChallenge(challenge);
        }
    }, [cate, curCate, challenge, curChallenge])

    // Reset change
    useEffect(() => {
        console.log('game num', gameNum, curGameNum);
        if (gameNum > curGameNum) { // Game reseted
            resetGame();
        }
    }, [gameNum, curGameNum]);

    // First time loader
    useEffect(() => {
        loadImages();
    }, []);

    return (     
        <table className="GameUITable">
            <tbody>
                {imagesUI}                
            </tbody>            
        </table>
    )
}
