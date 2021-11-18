import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { API } from '../config/routes';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  editSchedule,
  saveSchedule,
  cancelEdit,
  IProfile,
  TSessionName,
} from '../store/userSlice';

export interface IEditProps {
  editHandler: () => void;
  saveHandler: () => void;
  cancelHandler: () => void;
  isEditing: boolean;
}

export function useScheduleEditProps() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const [isEditing, profiles, currentProfile, username] = useAppSelector(
    (state) => [
      state.user.isEditing,
      state.user.profiles,
      state.user.currentProfile,
      state.user.username,
    ]
  );
  const saveMutation = useMutation(
    ({ profile, username }: { profile: IProfile; username: string }) => {
      const courses: { id: number; session: TSessionName; year: number }[] = [];
      profile.schedule.forEach((year) => {
        year.sessions.forEach((session) => {
          session.courses.forEach((course) => {
            courses.push({
              id: course.id,
              session: session.name,
              year: year.year,
            });
          });
        });
      });
      return axios.put(API.updateProfile, {
        username,
        name: profile.name,
        courses,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('currentProfile');
        dispatch(saveSchedule());
      },
    }
  );
  const editHandler = () => {
    dispatch(editSchedule());
  };

  const saveHandler = () => {
    const profile = profiles.find((profile) => profile.name === currentProfile);
    if (!profile) {
      cancelHandler();
      return { isError: true, isLoading: false };
    }
    saveMutation.mutate({ profile, username });
    return { isError: saveMutation.isError, isLoading: saveMutation.isLoading };
  };

  const cancelHandler = () => {
    dispatch(cancelEdit());
  };

  return {
    isEditing,
    editProps: { editHandler, saveHandler, cancelHandler, isEditing },
  };
}
