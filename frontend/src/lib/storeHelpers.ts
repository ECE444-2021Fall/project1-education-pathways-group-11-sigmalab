import { IProfile, TSessionName, ISession, IYear } from '../store/userSlice';

// getProfileIndex returns the index of a profile if
// found in list of profiles
function getIndexfromName(
  name: string,
  list: Required<{ name: string }>[]
): number {
  const index = list.findIndex((entry) => entry.name === name);
  return index;
}

function isYearEmpty(sessions: ISession[]): boolean {
  return (
    sessions.reduce(
      (numCourses, session) => numCourses + session.courses.length,
      0
    ) <= 0
  );
}

function emptyYearConstructor(year: number): IYear {
  const sessions = ['fall', 'winter', 'summer'].map(
    (sessionName): ISession => ({
      name: sessionName as TSessionName,
      courses: [],
    })
  );
  return { year, sessions };
}

export { getIndexfromName, isYearEmpty, emptyYearConstructor };
