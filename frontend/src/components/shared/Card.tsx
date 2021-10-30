import React from 'react';
import tw from 'twin.macro';

function Card({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'article'>): JSX.Element {
  return (
    <article tw='rounded-3xl shadow-lg bg-white' {...props}>
      {children}
    </article>
  );
}

export default Card;
