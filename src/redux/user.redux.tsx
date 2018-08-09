import axios from 'axios';
import { Dispatch } from '../../node_modules/redux';



// Initial State
const initialState = {
  userlist: [],         // 用户列表
  total: 0,             // 数据总数
};




// Action-Types
const enum User_Control {
  ADD_USER,
  REMOVE_USER,
  LOAD_DATA,
};






// Action-Creators
function addUser(data: object): { type: User_Control, payload: any } {
  return {
    type: User_Control.ADD_USER,
    payload: data,
  };
}

function loadData(data?: any): { type: User_Control, payload: any } {
  return {
    type: User_Control.LOAD_DATA,
    payload: data,
  };
}

function removeUser(id: string): { type: User_Control, payload: string } {
  return {
    type: User_Control.REMOVE_USER,
    payload: id,
  };
}





// Reducer
export function user(state = initialState, action: { type: User_Control, payload: any }): any {
  switch(action.type) {
    case User_Control.ADD_USER:
      return {
        ...state,
        userlist: [...state.userlist, { ...action.payload }],
      };
    case User_Control.REMOVE_USER:
      return {
        ...state,
        userlist: state.userlist.filter((val) => val['_id'] !== action.payload),
      };
    case User_Control.LOAD_DATA:
      return {
        ...state,
        userlist: action.payload.result,
        total: action.payload.total,
      };
    default:
      return state;
  }
}




// Effects

/**
 * 进入 /user 初始化列表数据
 * 
 */
export function reduxHandleInitUserList(pagination: { page: number, pageSize: number }) {
  return (dispatch: Dispatch) => {
    axios({
      method: 'POST',
      url: '/user/userlist',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        dispatch(loadData(res.data.data));
      });
  };
}


/**
 * 处理添加新 user
 * @param data user信息
 */
export function reduxHandleAddUser(data: any) {
  return (dispatch: Dispatch) => {
    axios({
      method: 'POST',
      url: '/user/add',
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        dispatch(addUser(res.data.data));
      })
  };
}

/**
 * 处理删除 user
 */
export function reduxHandleRemoveUser(id: string) {
  return (dispatch: Dispatch) => {
    axios({
      method: 'POST',
      url: '/user/remove',
      data: { id },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      res.status === 200 
        && res.data.code === 0
        && dispatch(removeUser(res.data.data._id));
    });
  };
}


