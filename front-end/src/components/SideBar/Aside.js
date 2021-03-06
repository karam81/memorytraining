import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import sidebarBg from '../../assets/bg1.jpg';
import iconMemorize from '../../assets/images/memorize.png';
import iconQuiz from '../../assets/images/quiz.png';
import iconTest from '../../assets/images/test.png';
import iconSetting from '../../assets/images/setting.png';
import iconGame from '../../assets/images/game.png';

import axios from 'axios';
import SERVER from '../../api/server';

import './Aside.css';

const Aside = ({ book, image, collapsed, rtl, toggled, handleToggleSidebar, history, entireCardList, bookmarkedCardList, entireQuizList, bookmarkedQuizList }) => {
  const intl = useIntl();

  const device_check = () => {
    // 디바이스 종류 설정
    var pc_device = "win16|win32|win64|mac|macintel";
 
    // 접속한 디바이스 환경
    var this_device = navigator.platform;
    var mobileRestrictions = document.getElementById('MobileRestrictions')
    if ( this_device ) {
 
      if ( pc_device.indexOf(navigator.platform.toLowerCase()) < 0 ) {
          // console.log('MOBILE');
          mobileRestrictions.classList.add('mobile-notest')
      } else {
          // console.log('PC');
      }
 
    }
  }

  useEffect(() => {
    device_check();
    //수정 console.log('Aside useEffect called.');
    //수정 console.log('book : ', book);
  }, []);

  useEffect(() => {
    // //수정 console.log('entireCardList : ', entireCardList);
    //수정 console.log('Aside.js useEffect called');
    //수정 console.log('bookmarkedCardList : ', bookmarkedCardList);
    //수정 console.log('entireQuizList : ', entireQuizList);
    //수정 console.log('bookmarkedQuizList : ', bookmarkedQuizList);
  });

  return (
    <ProSidebar image={image ? sidebarBg : false} rtl={rtl} collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: '2em',
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'white',
          }}
        >
          {book.write_flag == 0 && '스크랩한 세트'}
          {book.write_flag == 1 && '내가 작성한 세트'}
        </div>
        {/* <div style={{ height: '2rem' }}></div> */}
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          {/* <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">{intl.formatMessage({ id: 'new' })}</span>}
          > */}

          <SubMenu
            // className="MenuItem"
            title="암기하기"
            icon={<img src={iconMemorize} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} />}
          >
            <MenuItem
              className="MenuItem"
              onClick={() => {
                history.history.push({ pathname: '/study', state: { cardList: entireCardList, book: book } });
              }}
            >
              전체
            </MenuItem>
            <MenuItem
              className="MenuItem"
              onClick={() => {
                history.history.push({ pathname: '/study', state: { cardList: bookmarkedCardList, book: book } });
              }}
            >
              북마크
            </MenuItem>
          </SubMenu>

          <SubMenu
            // className="MenuItem"
            title="테스트"
            icon={<img src={iconTest} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} />}
          >
            <MenuItem
              className="MenuItem"
              onClick={() => {
                history.history.push({ pathname: '/quiz', state: { quizList: entireQuizList, book: book } });
              }}
            >
              전체
            </MenuItem>
            <MenuItem
              className="MenuItem"
              onClick={() => {
                history.history.push({ pathname: '/quiz', state: { quizList: bookmarkedQuizList, book: book } });
              }}
            >
              북마크
            </MenuItem>
          </SubMenu>
          <MenuItem
            className="MenuItem"
            onClick={() => {
              history.history.push({ pathname: '/game', state: { cardList: entireCardList, book: book } });
            }}
            icon={<img src={iconGame} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} />}
          >
            게임
          </MenuItem>
          <MenuItem
            id="MobileRestrictions"
            className="MenuItem testpaper-btn"
            onClick={() => {
              history.history.push({ pathname: '/test-paper', state: { cardList: entireCardList, book: book, case: 'case1' } });
            }}
            icon={<img src={iconQuiz} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} />}
          >
            시험지
          </MenuItem>
          {book.write_flag == 1 ? (
            <MenuItem
              className="MenuItem"
              onClick={() => {
                history.history.push({ pathname: '/set-modify', state: { cardList: entireCardList, book: book } });
              }}
              icon={<img src={iconSetting} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} />}
            >
              세트 수정
            </MenuItem>
          ) : (
            // <MenuItem style={{ display: 'none' }} />
            <MenuItem
              className="MenuItem"
              onClick={(e) => {
                axios.delete(SERVER.BASE_URL + SERVER.ROUTES.unscrap, { data: { book_id: book.id } }).then((res) => {
                  history.history.goBack(1);
                });
                e.stopPropagation();
              }}
              icon={<img src={iconSetting} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} />}
            >
              스크랩 해제
            </MenuItem>
          )}
        </Menu>
        {/* <Menu iconShape="circle">
          <SubMenu
            // suffix={<span className="badge yellow">3</span>}
            title={intl.formatMessage({ id: 'withSuffix' })}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
          </SubMenu>
          <SubMenu prefix={<span className="badge gray">3</span>} title={intl.formatMessage({ id: 'withPrefix' })} icon={<FaHeart />}>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
          </SubMenu>
        </Menu> */}
      </SidebarContent>

      {/* <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a href="https://github.com/azouaoui-med/react-pro-sidebar" target="_blank" className="sidebar-btn" rel="noopener noreferrer">
            <FaGithub />
            <span> {intl.formatMessage({ id: 'viewSource' })}</span>
          </a>
        </div>
      </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Aside;
