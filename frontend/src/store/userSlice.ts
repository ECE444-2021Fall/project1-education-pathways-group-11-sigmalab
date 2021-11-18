import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep, find, isEqual, orderBy, pullAllWith, pullAt } from 'lodash';
import {
  emptyYearConstructor,
  getIndexfromName,
  isYearEmpty,
} from '../lib/storeHelpers';

export interface ICourse {
  id: number;
  name: string;
  views: number;
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
  courses: ICourse[];
  schedule: TSchedule;
  numCourses: number;
  numSemesters: number;
  isDefault: boolean;
}

export interface UserState {
  username: string;
  password: string;
  profiles: IProfile[];
  isEditing: boolean;
  currentProfile: string;
  profileTemp: IProfile[];
}

const initialState: UserState = {
  username: '',
  password: '',
  profiles: [],
  isEditing: false,
  currentProfile: '',
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
        password: string;
      }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    populateStore: (
      state,
      action: PayloadAction<
        Omit<UserState, 'profileTemp' | 'currentProfile' | 'isEditing'>
      >
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      const profiles = cloneDeep(action.payload.profiles);
      profiles.forEach((profile) => {
        profile.schedule.push(
          emptyYearConstructor(
            profile.schedule.length === 1
              ? 2021
              : profile.schedule[profile.schedule.length - 1].year
          )
        );
        if (profile.isDefault) state.currentProfile = profile.name;
      });
      state.profiles = profiles;
      // const profiles = cloneDeep(action.payload.profiles);
      // for (let i = 0; i < profiles.length; i++) {
      //   if (profiles[i].schedule.length === 0) {
      //     profiles[i].schedule.push({
      //       year: -1,
      //       sessions: [{ name: 'unassigned', courses: [] }],
      //     });
      //     profiles[i].schedule.push(emptyYearConstructor(2021));
      //     profiles[i].schedule.push(emptyYearConstructor(2022));
      //     break;
      //   }
      //   const years = profiles[i].schedule.sort(
      //     (prevYear, currYear) => prevYear.year - currYear.year
      //   );
      //   const fullYears: IYear[] = [];
      //   for (let j = 0; j < years.length; j++) {
      //     if (years[j].year < 1) continue;
      //     const sessions = ['fall', 'winter', 'summer'].map(
      //       (sessionName): ISession => {
      //         const sesh = find(
      //           years[j].sessions,
      //           (s) => s.name === sessionName
      //         );
      //         if (typeof sesh != 'undefined') {
      //           return sesh;
      //         } else {
      //           return {
      //             name: sessionName as TSessionName,
      //             courses: [],
      //           };
      //         }
      //       }
      //     );
      //     fullYears.push({ year: years[j].year, sessions: sessions });
      //   }
      //   const unassignedExists = find(fullYears, (y) => y.year === -1);
      //   if (typeof unassignedExists == 'undefined')
      //     fullYears.unshift({
      //       year: -1,
      //       sessions: [{ name: 'unassigned', courses: [] }],
      //     });
      //   profiles[i].schedule = cloneDeep(fullYears);
      //   const newYear = {
      //     year: fullYears[fullYears.length - 1].year,
      //     sessions: ['fall', 'winter', 'summer'].map(
      //       (sessionName): ISession => ({
      //         name: sessionName as TSessionName,
      //         courses: [],
      //       })
      //     ),
      //   };
      //   profiles[i].schedule.push(newYear);
      //   if (profiles[i].isDefault) state.currentProfile = profiles[i].name;
      // }
      // state.profiles = cloneDeep(profiles);
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
      // const sessions = ['fall', 'winter', 'summer'].map(
      //   (sessionName): ISession => ({
      //     name: sessionName as TSessionName,
      //     courses: [],
      //   })
      // );
      // const newProfile: IProfile = {
      //   name: action.payload.toLowerCase(),
      //   numCourses: 0,
      //   numSemesters: 0,
      //   courses: [],
      //   isDefault: false,
      //   schedule: [
      //     { year: 2021, sessions: cloneDeep(sessions) },
      //     { year: 2022, sessions: cloneDeep(sessions) },
      //     {
      //       year: -1,
      //       sessions: [{ name: 'unassigned', courses: [] }],
      //     },
      //   ],
      // };
      // state.profiles.push(newProfile);
      // state.currentProfile = newProfile.name;
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
  populateStore,
} = userSlice.actions;
export default userSlice.reducer;
