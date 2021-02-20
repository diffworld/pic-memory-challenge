import React, { useEffect, useContext, useState, useRef } from 'react'
import { gamerContext } from '../context/Gamer';
import { Table } from 'react-bootstrap';

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

    const winUIRef = useRef('');

    const [curGameNum, setCurGameNum] = useState(1);

    const [curCate, setCurCate] = useState('cat');
    const [curChallenge, setCurChallenge] = useState('6');

    const [errorMessage, setErrorMessage] = useState('');

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
            if (opened2Ref.current === '' && opened1Ref.current != index) {
                openCard(index);
                opened2Ref.current = index;
                setTimeout(() => {
                    validateCards();
                }, 1000);                
            }
        }
    }

    const validateCards = () => {
        let card1Id = cardsRef.current[opened1Ref.current].id;
        let card2Id = cardsRef.current[opened2Ref.current].id;

        if (card1Id === card2Id) { // WIN
            winUIRef.current.className = 'win show';
            setTimeout( () => {
                let newScrore = parseInt(score);
                setScore(newScrore + 1);
                resetGame();
                winUIRef.current.className = 'win';
            }, 3000);
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
        const errorFunc = (err) => {
             if (err.message.includes('403')) {
                setErrorMessage(`Wow! We are getting popular. Too many requests this time. Please wait ☕ ...`);
            }
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

            // Smiley set
            const smileySet = ['😺', '🤯', '😰 ', '🥳', '🤫', '😟', '🤪 ', '🤬', '😌' , '😈', '😴', '🤖'];

            // Generate images into cards
            var cards;            
            cards = newImgList.map( (img, index) => {
                return <div id={`card-${img.id}`}
                            className='flip-card text-center'
                            onClick={(event, id, cardIndex) => handleClickCards(event, img.id, index) }
                            ref={ref => { cardsRef.current[index] = ref}}>
                            <div className="flip-card-inner">
                                <div className={`flip-card-front`}>{smileySet[getRndInteger(0, smileySet.length-1)]}</div>
                                <div className="flip-card-back" style={{ backgroundImage: `url('${img.urls.small}')` }}>                  
                                </div>
                            </div>
                        </div>
            });

            // Output in table            
            let cols = 2;
            let rows = Math.floor(newImgList.length / cols);
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

    // Category or Challenge Change
    useEffect(() => {
        if ( curCate != cate || curChallenge != challenge ) {
            loadImages();
            setCurCate(cate);
            setCurChallenge(challenge);
        }
    }, [cate, curCate, challenge, curChallenge])

    // Reset
    useEffect(() => {
        if (gameNum > curGameNum) { // Game reseted
            resetGame();
        }
    }, [gameNum, curGameNum]);

    // First time loader
    useEffect(() => {
        loadImages();
    }, []);

    return (     
        <div>
            <Table className="GameUITable">
                <tbody>
                    {imagesUI}              
                </tbody>            
            </Table>
            <div className="errorMessage">{errorMessage}</div>
            <div ref={winUIRef} className="win">
                <p className="tracking-in-expand-fwd">🎉 <br />
                    Great Jobs! <br /> </p>
            </div>
        </div>
    )
}
