import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { editSchedule, saveSchedule, cancelEdit } from '../store/userSlice';

export interface IEditProps {
  editHandler: () => void;
  saveHandler: () => void;
  cancelHandler: () => void;
  isEditing: boolean;
}

export function useScheduleEditProps() {
  const dispatch = useAppDispatch();
  const [isEditing, currentProfile] = useAppSelector((state) => [
    state.user.isEditing,
    state.user.currentProfile,
  ]);
  console.log(isEditing);
  const editHandler = useCallback(() => {
    dispatch(editSchedule());
  }, [dispatch]);

  const saveHandler = useCallback(() => {
    dispatch(saveSchedule());
  }, [dispatch]);

  const cancelHandler = useCallback(() => {
    dispatch(cancelEdit());
  }, [dispatch]);

  return {
    isEditing,
    editProps: { editHandler, saveHandler, cancelHandler, isEditing },
  };
}
