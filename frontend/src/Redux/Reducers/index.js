import { combineReducers } from "redux";
import Users from "./usersReducer";

const rootReducer = combineReducers({
  Users,
});

export default rootReducer;
