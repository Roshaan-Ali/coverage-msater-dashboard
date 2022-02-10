import { combineReducers } from "redux";
import { FrontCoverReducer } from "./FrontCoverReducer";
import { MetricsReducer } from "./MetricsReducer";
import { UserReducer } from "./UserReducer";
import { CoverageReducer } from "./CoverageReducer";
import { CoverBooksReducer } from "./CoverBooksReducer";
import { DefaultBgImgReducer } from "./DefaultBgImgReducer";
import { SubscriptionReducer } from "./SubscriptionReducer";
import { ForgetAuthReducer } from "./ForgetAuthReducer";
import { InvitedUserReducer } from "./InvitedUserReducer";
import { FoldersReducer } from "./FoldersReducer";
import { TeamMembersReducer } from "./TeamMembersReducer";

const rootReducer = combineReducers({
  UserReducer,
  FrontCoverReducer,
  MetricsReducer,
  CoverageReducer,
  CoverBooksReducer,
  DefaultBgImgReducer,
  SubscriptionReducer,
  ForgetAuthReducer,
  InvitedUserReducer,
  FoldersReducer,
  TeamMembersReducer
});

export default rootReducer;
