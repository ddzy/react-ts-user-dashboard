import { combineReducers } from 'redux';
import { admin } from './redux/admin.redux';
import { user } from './redux/user.redux';



const reducer = combineReducers({
  admin,
  user
});


export default reducer;