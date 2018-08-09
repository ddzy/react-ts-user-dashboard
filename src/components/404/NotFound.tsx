import * as React from 'react';

import './NotFound.less';
import notfound from './images/notfound.jpg';
import Header from '../header/Header';



const NotFound: React.SFC = (): JSX.Element => {
  return (
    <div className="notfound">
      <Header />
      <div className="notfound-main-box">
        <div className="notfound-content">
          <img src={notfound} alt="找不到页面"/>
        </div>
      </div>
    </div>
  );
};


export default NotFound;