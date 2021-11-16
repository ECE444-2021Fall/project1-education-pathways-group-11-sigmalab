import React from 'react';
import tw from 'twin.macro';
import { Button } from '../../shared';

interface EditControlsProps {
  isEditing: boolean;
  editHandler: () => void;
  saveHandler: () => void;
  cancelHandler: () => void;
}

function EditControls({
  isEditing,
  editHandler,
  saveHandler,
  cancelHandler,
}: EditControlsProps): JSX.Element {
  const onClickHandler = isEditing ? saveHandler : editHandler;
  return (
    <div>
      {isEditing && (
        <Button onClick={cancelHandler} variant='light' tw='w-16'>
          Cancel
        </Button>
      )}
      <Button onClick={onClickHandler} tw='ml-2 w-16'>
        {isEditing ? 'Save' : 'Edit'}
      </Button>
    </div>
  );
}

export default EditControls;
