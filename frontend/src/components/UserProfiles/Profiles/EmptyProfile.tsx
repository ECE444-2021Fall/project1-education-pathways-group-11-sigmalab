import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import tw from 'twin.macro';
import * as yup from 'yup';
import { API } from '../../../config/routes';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createProfile } from '../../../store/userSlice';
import { Card } from '../../shared';
import { Button } from '../../shared';

interface IFormInputs {
  profileName: string;
}

const schema = yup
  .object({
    profileName: yup.string().strict().trim().min(4).max(20).defined(),
  })
  .defined();

function EmptyProfile(): JSX.Element {
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });
  const username = useAppSelector((state) => state.user.username);
  const queryClient = useQueryClient();
  const createProfileCb = useCallback(() => {
    const profileName = watch('profileName');
    dispatch(createProfile(profileName));
  }, []);
  const createProfileMutation = useMutation(
    (name: string) => {
      return axios.post(API.createProfile, {
        username,
        name: name,
      });
    },
    {
      onSuccess: () => {
        createProfileCb();
        queryClient.invalidateQueries('profiles');
      },
    }
  );
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector((state) => state.user.isEditing);
  const submitHandler = handleSubmit((data) => {
    try {
      createProfileMutation.mutate(data.profileName);
    } catch (error) {
      setError('profileName', { message: 'Profile already exists' });
      return;
    }
    setShowForm(false);
  });
  return (
    <Card
      tw='w-full h-56 bg-transparent border-2 border-dashed
			border-gray-300 shadow-none cursor-pointer
			grid grid-cols-1 place-items-center relative
      '
      css={[
        showForm
          ? undefined
          : tw`hover:(shadow-lg brightness-75) active:(brightness-50)`,
      ]}
      onClick={() => setShowForm(true)}
    >
      {!showForm || isEditing ? (
        <span tw='text-6xl select-none text-gray-300'>+</span>
      ) : (
        <form
          onSubmit={submitHandler}
          tw='flex justify-center gap-8 w-full h-full items-center'
        >
          <div>
            <input
              tw='text-2xl py-2 px-4 z-20 outline-none border-b-2 border-blue-uoft text-black
            bg-transparent'
              css={[errors.profileName ? tw`border-red-400` : undefined]}
              autoFocus
              type='text'
              {...register('profileName')}
            />
            {errors.profileName && (
              <p tw='text-base text-red-400'>{errors.profileName.message}</p>
            )}
          </div>
          <Button
            type='button'
            onClick={(e) => {
              setShowForm(false);
              e.stopPropagation();
            }}
          >
            Cancel
          </Button>
        </form>
      )}
    </Card>
  );
}

export default EmptyProfile;
