import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../config/routes';
import { useAppSelector } from '../hooks';
import { IProfile } from '../store/userSlice';

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

// export function useCreateProfile() {
//   const dispatch = useDispatch()
//   const queryClient = useQueryClient();
//   const username = useAppSelector((state) => state.user.username);
//   const createMutation = useMutation(
//     (name: string) => {
//       return axios.post(API.createProfile, {
//         username,
//         name: name,
//       });
//     },
//     {
//       onSuccess: () => {
//         dispatch(createProfile())
//         queryClient.invalidateQueries('profiles');
//       },
//     }
//   );
//   return createMutation;
// }
