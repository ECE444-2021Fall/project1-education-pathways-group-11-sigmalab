import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { editSchedule, saveSchedule, cancelEdit } from '../store/userSlice';

export function useScheduleEditProps() {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.user.isEditing);
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
