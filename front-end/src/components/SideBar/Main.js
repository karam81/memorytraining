import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';

import { FcBookmark } from 'react-icons/fc';
import { FaBookmark } from 'react-icons/fa';
import { BsBookmark } from 'react-icons/bs';
import axios from 'axios';
import SERVER from '../../api/server';
import './Main.css';

const Main = ({ collapsed, rtl, image, handleToggleSidebar, handleCollapsedChange, handleRtlChange, handleImageChange, book }) => {
  const intl = useIntl();
  const [cardList, setCardList] = useState([]);

  const getCardList = async () => {
    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.getbook + book.id).then((res) => {
      console.log(res);
      setCardList(res.data);
    });
  };

  useEffect(() => {
    getCardList();
  }, []);

  return (
    <main>
      <div className="sidebar-btn">
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
      </div>
      <header className="header-div">
        <div className="book-title text-center">{book.title}</div>
      </header>

      <div className="CardList-root">
        <div className="CardList-container">
          {cardList.map((card) => (
            <Card book={book} card={card} key={card.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

const Card = ({ book, card }) => {
  const [color, setColor] = useState(card.bookmark_flag ? 'red' : 'black');

  useEffect(() => {
    console.log('useEffect -> color : ', color);
  });

  return (
    <div className="courses-container">
      <div className="course">
        <div className="course-info">
          <div>
            <button
              className=""
              onClick={() => {
                if (color == 'black') {
                  console.log('bookmark.');
                  setColor('red');
                  console.log('book.id : ', book.id);
                  console.log('card.id : ', card.id);
                  axios.post(SERVER.BASE_URL + SERVER.ROUTES.bookmark, { book_id: book.id, card_id: card.id }).then((res) => {
                    console.log(res);
                  });
                } else {
                  console.log('unbookmark.');
                  setColor('black');
                  console.log('book.id : ', book.id);
                  console.log('card.id : ', card.id);
                  axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unbookmark, { data: { book_id: book.id, card_id: card.id } }).then((res) => {
                    console.log(res);
                  });
                }
              }}
            >
              {color == 'red' && <FcBookmark size={32} />}
              {color == 'black' && <BsBookmark size={32} />}
            </button>
          </div>
          <div className="Card-word">
            <p>
              <big style={{ fontWeight: 900 }}>단어 : </big>
              {card.word}
            </p>
          </div>
          <div className="Card-meaning">
            <p>
              <big>뜻 : </big>
              {card.meaning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
