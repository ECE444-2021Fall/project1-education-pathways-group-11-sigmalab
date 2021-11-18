import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import tw from 'twin.macro';
import { API } from '../config/routes';
import { useAppDispatch, useAppSelector } from '../hooks';
import { populateStore, UserState } from '../store/userSlice';

function DataLoader(): JSX.Element {
  const dispatch = useAppDispatch();
  const [username, password] = useAppSelector((state) => [
    state.user.username,
    state.user.password,
  ]);
  useQuery(
    'profiles',
    (): Promise<
      Omit<UserState, 'profileTemp' | 'currentProfile' | 'isEditing'>
    > => {
      return axios
        .post(API.validateLogin, { username, password })
        .then((res) => res.data);
    },
    {
      enabled: username?.length !== 0 && password?.length !== 0,
      refetchOnMount: false,
      onSuccess: (data) => dispatch(populateStore(data)),
    }
  );

  return <React.Fragment />;
}

export default DataLoader;
