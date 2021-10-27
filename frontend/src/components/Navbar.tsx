import React from 'react';
import tw, { TwStyle } from 'twin.macro';
import { NavLink } from 'react-router-dom';
import ROUTES from '../config/routes';
import { SearchIcon, LogoIcon, ProfilesIcon } from './Icons';

interface NavbarProps {
  width?: TwStyle;
}

const StyledLink = tw(NavLink)`my-2 h-12`;
const iconStyles = tw`fill-current h-5 w-full text-gray-200`;

function Navbar({ width: navbarWidth }: NavbarProps): JSX.Element {
  return (
    <div
      css={[
        tw`flex flex-col justify-start items-center h-screen bg-blue-800 pt-12`,
        navbarWidth,
      ]}
    >
      <StyledLink to={ROUTES.home} tw='mb-10'>
        <LogoIcon css={[iconStyles, tw`h-7`]} />
      </StyledLink>
      <StyledLink to={ROUTES.courses}>
        <SearchIcon css={iconStyles} />
      </StyledLink>
      <StyledLink to={ROUTES.profiles}>
        <ProfilesIcon css={iconStyles} />
      </StyledLink>
    </div>
  );
}

export default Navbar;
