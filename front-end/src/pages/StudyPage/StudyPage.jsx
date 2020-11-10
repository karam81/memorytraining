import React, { useState, useEffect } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import { Link } from 'react-router-dom';
import CoreStyles from '../StudyPage/styles.scss';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/open-animation/open-animation.scss';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import 'react-sweet-progress/lib/style.css';
import '../../assets/css/back-btn-styles.css';
import './StudyPage.css';
import Speech from 'react-speech';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { BsBookmark } from 'react-icons/bs';
import { FcBookmark } from 'react-icons/fc';

import axios from 'axios';
import SERVER from '../../api/server';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
const ref = React.createRef();

const StudyPage = (props) => {
  const cards = props.location.state.cardList;
  const book = props.location.state.book;

  const [cardList, setCardList] = useState(cards);

  useEffect(() => {
    console.log('props =>', props);
    console.log('book : ', book);
    console.log('@@@@@@@@@@@@@@@@@@@@ cards : ', cards);
  }, []);

  const handleCard = (card) => {
    console.log('handleCard called.');

    var idx = cardList.findIndex((ele) => ele.id == card.id);
    console.log('idx : ', idx);

    let tmpCardList = [...cardList];
    tmpCardList[idx].bookmark_flag = !tmpCardList[idx].bookmark_flag;

    setCardList(tmpCardList);
  };

  return (
    // <SimpleBar style={{ height: '100%' }}>
    <div className="StudyPageContainer">
      <div className="Study-BackgroundColor"></div>
      <AwesomeButton
        className="aws-btn"
        type="primary"
        onPress={() => {
          props.history.push({ pathname: '/set-detail', state: { book: book } });
        }}
      >
        <span>뒤로가기</span>
      </AwesomeButton>
      {cards.length == 0 && (
        <div className="FlippyContainer-root" key={0}>
          북마크 된 단어가 없습니다.
        </div>
      )}
      {cards.length != 0 && (
        <AwesomeSlider className="slider" infinite={false} bullets={false} animation="openAnimation" cssModule={(CoreStyles, AwesomeSliderStyles)}>
          {cards.map((data, index) => (
            <div className="FlippyContainer-root" key={index}>
              <Card data={data} handleCard={handleCard} book={book} />
            </div>
          ))}
        </AwesomeSlider>
      )}
    </div>
    // </SimpleBar>
  );
};

const Card = ({ data, handleCard, book }) => {
  console.log('각각의 카드 데이터 : ', data);
  console.log('각각의 카드 bookmark_flag : ', data.bookmark_flag);
  // const [color, setColor] = useState(data.bookmark_flag ? 'red' : 'black');

  const [card, setCard] = useState(data);

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    console.log('Card useEffect called.');
    console.log('card : ', card);

    setCard(data);
  });

  return (
    <div className="FlippyContainer">
      <Flippy
        className="flippy"
        flipOnHover={false} // default false
        flipOnClick={true} // default false
        flipDirection="vertical" // horizontal or vertical
      >
        <FrontSide className="FrontSide">
          <div className="bookmark-icon">
            <button
              onClick={(e) => {
                console.log('bookmark button clicked.');

                // 북마크가 안되어있는 상태라면 -> 북마크 활성화
                if (!card.bookmark_flag) {
                  axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: book.id, card_id: card.id }).then((res) => {
                    console.log(res);
                  });
                }

                // 북마크가 되있는 상태라면 -> 북마크 해제
                else {
                  axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: book.id, card_id: card.id } }).then((res) => {
                    console.log(res);
                  });
                }

                handleCard(card);
                e.stopPropagation();
              }}
            >
              {card.bookmark_flag && <FcBookmark size={32} />}
              {!card.bookmark_flag && <BsBookmark size={32} />}
            </button>
          </div>
          <div className="word-type">단어</div>
          <div className="speech-button" onClick={stopPropagation}>
            <Speech text={data.word} />
          </div>
          <p>{data.word}</p>
        </FrontSide>
        <BackSide className="BackSide">
          <div className="bookmark-icon">
            <button
              onClick={(e) => {
                console.log('bookmark button clicked.');

                // 북마크가 안되어있는 상태라면 -> 북마크 활성화
                if (!card.bookmark_flag) {
                  axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: book.id, card_id: card.id }).then((res) => {
                    console.log(res);
                  });
                }

                // 북마크가 되있는 상태라면 -> 북마크 해제
                else {
                  axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: book.id, card_id: card.id } }).then((res) => {
                    console.log(res);
                  });
                }

                handleCard(card);
                e.stopPropagation();
              }}
            >
              {card.bookmark_flag && <FcBookmark size={32} />}
              {!card.bookmark_flag && <BsBookmark size={32} />}
            </button>
          </div>
          <div className="word-type">뜻</div>
          <div className="speech-button" onClick={stopPropagation}>
            <Speech text={data.meaning}></Speech>
          </div>
          <p>{data.meaning}</p>
        </BackSide>
      </Flippy>
    </div>
  );
};

export default StudyPage;
