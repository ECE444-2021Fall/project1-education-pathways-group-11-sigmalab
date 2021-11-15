import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { getProfileIndex } from '../lib/storeHelpers';

export interface ICourse {
  id: number;
  name: string;
}

export interface ISession {
  name: 'fall' | 'winter' | 'summer' | 'unassigned';
  courses: ICourse[];
}

export interface IYear {
  year: number;
  sessions: ISession[];
}

export type TSchedule = IYear[];

export interface IProfile {
  name: string;
  // courses: { id: number; name: string }[];
  schedule: TSchedule;
  numOfSemesters: 4;
  isDefault: boolean;
  isEditing: boolean;
}

export interface UserState {
  username?: string;
  defaultProfile?: string;
  profiles: IProfile[];
}

const initialState: UserState = {
  username: undefined,
  defaultProfile: undefined,
  profiles: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUser: (
      state,
      action: PayloadAction<{
        username: string;
        profiles: IProfile[];
        defaultProfile?: string;
      }>
    ) => {
      state.username = action.payload.username;
      state.profiles = cloneDeep(action.payload.profiles);
      state.defaultProfile = action.payload.defaultProfile;
    },
    updateProfiles: (state, action: PayloadAction<IProfile[]>) => {
      state.profiles = cloneDeep(action.payload);
    },
    updateProfile: (state, action: PayloadAction<IProfile>) => {
      const profileIndex = getProfileIndex(action.payload.name, state.profiles);
      state.profiles[profileIndex] = cloneDeep(action.payload);
    },
    addCourse: (state, action: PayloadAction<ICourse>) => {
      return;
    },
  },
});

export const { updateProfiles, updateProfile, logUser, addCourse } =
  userSlice.actions;
export default userSlice.reducer;
