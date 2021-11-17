import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep, find, isEqual, orderBy, pullAllWith, pullAt } from 'lodash';
import schedule from '../datafillers/schedules';
import {
  emptyYearConstructor,
  getIndexfromName,
  isYearEmpty,
} from '../lib/storeHelpers';

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
  courses: { id: number; name: string }[];
  schedule: TSchedule;
  num_courses: number;
  num_semesters: number;
}

export interface UserState {
  username: string;
  isEditing: boolean;
  currentProfile: string;
  profiles: IProfile[];
  profileTemp: IProfile[];
}

const initialState: UserState = {
  username: '',
  isEditing: false,
  currentProfile: '',
  profiles: [],
  profileTemp: [],
};

export const userSlice = createSlice({
  name: 'adel1234',
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
      state.profileTemp = cloneDeep(state.profiles);
    },
    cancelEdit: (state) => {
      state.isEditing = false;
      state.profiles = cloneDeep(state.profileTemp);
    },
    saveSchedule: (state) => {
      state.isEditing = false;
    },
    createProfile: (state, action: PayloadAction<string>) => {
      const exists = find(state.profiles, {
        name: action.payload.toLowerCase(),
      });
      if (exists) throw 'Profile already exists';
      const sessions = ['fall', 'winter', 'summer'].map(
        (sessionName): ISession => ({
          name: sessionName as TSessionName,
          courses: [],
        })
      );
      const newProfile: IProfile = {
        name: action.payload.toLowerCase(),
        num_courses: 0,
        num_semesters: 0,
        courses: [],
        schedule: [
          { year: 2021, sessions: cloneDeep(sessions) },
          { year: 2022, sessions: cloneDeep(sessions) },
          {
            year: -1,
            sessions: [{ name: 'unassigned', courses: [] }],
          },
        ],
      };
      state.profiles.push(newProfile);
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

      const years = state.profiles[profileIndex].schedule.sort(
        (prevYear, currYear) => prevYear.year - currYear.year
      );
      let previ = 0;
      let prevVal = false;
      for (let i = years.length - 1, val = false; i >= 0; i--) {
        val = isYearEmpty(orderBy(years, ['year'], ['asc'])[i].sessions);
        if (!val) {
          if (i === years.length - 1)
            years.push(emptyYearConstructor(years[i].year + 1));
          break;
        }
        if (val && prevVal) {
          pullAt(years, previ);
        }
        prevVal = val;
        previ = i;
      }
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
  createProfile,
  logUser,
  addCourse,
} = userSlice.actions;
export default userSlice.reducer;
