import { IProfile } from '../store/userSlice';

// getProfileIndex returns the index of a profile if
// found in list of profiles
function getProfileIndex(profileName: string, profiles: IProfile[]): number {
  const index = profiles.findIndex((profile) => profile.name === profileName);
  return index;
}

export { getProfileIndex };
