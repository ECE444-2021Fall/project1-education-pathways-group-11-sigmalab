import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { add, cloneDeep } from 'lodash';
import { getProfileIndex } from '../lib/storeHelpers';

export interface ICourse {
  id: number;
  name: string;
}

export interface ISession {
  name: 'fall' | 'winter' | 'summer' | 'unassigned';
  courses: ICourse[];
}

export interface ISchedule {
  year: number;
  sessions: ISession[];
}

export interface IProfile {
  name: string;
  // courses: { id: number; name: string }[];
  schedule: ISchedule;
  numOfSemesters: 4;
  isDefault: boolean;
  isEditing: boolean;
}

export interface UserState {
  username: string | null;
  defaultProfile: string | null;
  profiles: IProfile[];
}

const initialState: UserState = {
  username: null,
  defaultProfile: null,
  profiles: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
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
