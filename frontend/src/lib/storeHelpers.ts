import { IProfile } from '../store/userSlice';

// getProfileIndex returns the index of a profile if
// found in list of profiles
function getIndexfromName(
  name: string,
  list: Required<{ name: string }>[]
): number {
  const index = list.findIndex((entry) => entry.name === name);
  return index;
}

export { getIndexfromName };
