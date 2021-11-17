import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep, isEqual, map, pull, pullAllWith, remove } from 'lodash';
import schedule from '../datafillers/schedules';
import { getIndexfromName } from '../lib/storeHelpers';

export interface ICourse {
  id: number;
  name: string;
}

export type TSessionName = 'fall' | 'winter' | 'summer' | 'unassigned';

export interface ISession {
  name: TSessionName;
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
}

export interface UserState {
  username?: string;
  isEditing: boolean;
  currentProfile: string;
  profiles: IProfile[];
}

const initialState: UserState = {
  username: undefined,
  isEditing: true,
  currentProfile: 'main',
  profiles: [
    {
      name: 'main',
      numOfSemesters: 4,
      isDefault: true,
      schedule: schedule,
    },
  ],
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
    },
    updateProfiles: (state, action: PayloadAction<IProfile[]>) => {
      state.profiles = cloneDeep(action.payload);
    },
    updateProfile: (state, action: PayloadAction<IProfile>) => {
      const profileIndex = getIndexfromName(
        action.payload.name,
        state.profiles
      );
      state.profiles[profileIndex] = cloneDeep(action.payload);
    },
    addCourse: (state, action: PayloadAction<ICourse>) => {
      return;
    },
    selectProfile: (state, action: PayloadAction<string>) => {
      state.currentProfile = action.payload;
    },
    editSchedule: (state) => {
      state.isEditing = true;
    },
    cancelEdit: (state) => {
      state.isEditing = false;
    },
    saveSchedule: (state) => {
      state.isEditing = false;
    },
    moveCourse: (
      state,
      action: PayloadAction<{
        profileName: string;
        year: number;
        sessionName: TSessionName;
        course: ICourse;
        targetYear: number;
        targetSessionName: TSessionName;
      }>
    ) => {
      // extract params
      const {
        profileName,
        year,
        sessionName,
        course,
        targetSessionName,
        targetYear,
      } = action.payload;

      const profileIndex = getIndexfromName(profileName, state.profiles);
      const schedule = state.profiles[profileIndex].schedule;

      const yearIndex = schedule.findIndex((s) => s.year === year);
      const sessionIndex = getIndexfromName(
        sessionName,
        state.profiles[profileIndex].schedule[yearIndex].sessions
      );
      const targetYearIndex = schedule.findIndex((s) => s.year === targetYear);
      const targetSessionIndex = getIndexfromName(
        targetSessionName,
        state.profiles[profileIndex].schedule[targetYearIndex].sessions
      );

      // remove course from source
      const courses =
        state.profiles[profileIndex].schedule[yearIndex].sessions[sessionIndex]
          .courses;
      pullAllWith(courses, [course], isEqual);

      //add course in target
      state.profiles[profileIndex].schedule[targetYearIndex].sessions[
        targetSessionIndex
      ].courses.push(course);
    },
  },
});

export const {
  moveCourse,
  editSchedule,
  saveSchedule,
  cancelEdit,
  selectProfile,
  updateProfiles,
  updateProfile,
  logUser,
  addCourse,
} = userSlice.actions;
export default userSlice.reducer;
