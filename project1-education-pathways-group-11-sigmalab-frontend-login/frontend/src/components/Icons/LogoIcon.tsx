import React from 'react';

function LogoIcon(props: React.ComponentPropsWithoutRef<'svg'>): JSX.Element {
  return (
    <svg viewBox='0 0 23 31' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M16.707 15.7358L9.3584 25.9399H22.502V31H0.812988V27.8296L10.0303 15.5679L0.812988 3.6001V0.429688H21.998V5.53174H9.46338L16.707 15.4209V15.7358Z' />
    </svg>
  );
}

export default LogoIcon;
