import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { API } from '../config/routes';
import { useAppSelector } from '../hooks';
import { createProfile, IProfile } from '../store/userSlice';

export function useGetProfile(name: string, isCurrent = false) {
  const username = useAppSelector((state) => state.user.username);
  return useQuery(
    isCurrent ? 'currentProfile' : 'profile',
    (): Promise<IProfile> =>
      axios
        .get(API.getProfile, {
          params: {
            username,
            name,
          },
        })
        .then((res) => res.data)
  );
}

export function useCreateProfile(name: string) {
  const queryClient = useQueryClient();
  const username = useAppSelector((state) => state.user.username);
  const createMutation = useMutation(
    () => {
      return axios.post(API.createProfile, {
        username,
        name: name,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profiles');
        // dispatch(createProfile());
      },
    }
  );
  return createMutation;
}
