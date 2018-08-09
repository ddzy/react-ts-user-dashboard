import axios from 'axios';
import { Dispatch } from '../../node_modules/redux';


const initialState = {
  isAuth: false,        // 权限认证
  adminname: '',         // 账号
  adminid: '',          
  msg: '',
  redirectTo: '',
};


// Action-Types
const AUTH_SUCCESS = 'AUTH_SUCCESS' as string;        // 登录 or 注册成功
const AUTH_FAILD = 'AUTH_FAILD' as string;
const REDIRECT_TO = 'REDIRECT_TO';




// Action Creator
function authSuccess(data?: object): { type: string, payload: object | undefined } {
  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
}

function authFaild(data?: string): { type: string, payload: string | undefined } {
  return {
    type: AUTH_FAILD,
    payload: data,
  };
}

function redirectTo(data: string): { type: string, payload: string | '' } {
  return {
    type: REDIRECT_TO,
    payload: data,
  };
}






// Reducer
export function admin(state=initialState, action: {type: string, payload: any}): object {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        adminname: action.payload.adminname,
        adminid: action.payload._id,
      };
    case AUTH_FAILD:
      return {
        ...state,
        isAuth: false,
        msg: action.payload,
      };
    case REDIRECT_TO:
      return {
        ...state,
        isAuth: false,
        redirectTo: action.payload,
      };
    default:
      return state;
  }
}




// Effects

/**
 * 处理登录
 * @param data 表单数据
 */
export function reduxHandleLogin(data: { adminname: string, adminpwd: string }) {
  return (dispatch: Dispatch<any>) => {
    axios.post('/login', data)
      .then((res) => {
        if(res.status === 200 && res.data.code === 0) {
          // 存储 token
          localStorage.setItem('token', res.data.token);

          dispatch(authSuccess(res.data.data));
        }else {
          dispatch(authFaild(res.data.msg));
        }
      });
  };
}

/**
 * 处理注册表单
 * @param data 表单数据
 */
export function reduxHandleRegister(data: { adminname: string, adminpwd: string }) {
  return (dispatch: Dispatch<any>) => {
    axios.post('/register', data)
      .then((res) => {
        if(res.status === 200 && res.data.code === 0) {
          const { adminname, adminid, token } = res.data;
          // 存储token
          localStorage.setItem('admin', token);
          dispatch(authSuccess({ adminname, adminid }));
        }else {
          dispatch(authFaild(res.data.msg));
        }
      });
  };
}


export function reduxHandleTestAuth() {
  return (dispatch: Dispatch<any>) => {
    axios({
      method: 'GET',
      url: '/test',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      dispatch(redirectTo(''));
    }).catch((res) => {
      dispatch(redirectTo('/login'));
    });
  };
}

