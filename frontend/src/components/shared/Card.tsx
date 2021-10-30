import React from 'react';
import tw from 'twin.macro';

function Card({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'article'>): JSX.Element {
  return (
    <article tw='rounded-3xl shadow-lg bg-white px-10 py-6' {...props}>
      {children}
    </article>
  );
}

export default Card;
