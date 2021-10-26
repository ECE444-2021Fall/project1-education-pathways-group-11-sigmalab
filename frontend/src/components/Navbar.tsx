import React from 'react';
import tw, { TwStyle } from 'twin.macro';
import { AiFillBook, AiFillHome, AiFillProfile } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import ROUTES from '../config/routes';

interface NavbarProps {
  width?: TwStyle;
}

const StyledLink = tw(NavLink)`my-2 h-12`;
const iconStyles = tw`h-8 w-full text-gray-200`;

function Navbar({ width: navbarWidth }: NavbarProps): JSX.Element {
  return (
    <div
      css={[
        tw`flex flex-col justify-start items-center h-screen bg-blue-800 pt-14`,
        navbarWidth,
      ]}>
      <StyledLink to={ROUTES.home}>
        <AiFillHome css={iconStyles} />
      </StyledLink>
      <StyledLink to={ROUTES.courses}>
        <AiFillBook css={iconStyles} />
      </StyledLink>
      <StyledLink to={ROUTES.profiles}>
        <AiFillProfile css={iconStyles} />
      </StyledLink>
    </div>
  );
}

export default Navbar;
