import React from 'react';

function ProfilesIcon(
  props: React.ComponentPropsWithoutRef<'svg'>
): JSX.Element {
  return (
    <svg viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M1.5 5H0V22.5C0 23.875 1.125 25 2.5 25H20V23.5H1.5V5ZM22.5 0H7.5C6.125 0 5 1.125 5 2.5V17.5C5 18.875 6.125 20 7.5 20H22.5C23.875 20 25 18.875 25 17.5V2.5C25 1.125 23.875 0 22.5 0ZM23.5 18.5H6.5V1.5H23.5V18.5ZM10 8.75H20V10.5H10V8.75ZM10 12.5H15V14.5H10V12.5ZM10 5H20V7H10V5Z' />
    </svg>
  );
}

export default ProfilesIcon;
