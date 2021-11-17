import React from 'react';
import tw, { TwStyle } from 'twin.macro';
import { NavLink } from 'react-router-dom';
import ROUTES from '../config/routes';
import { SearchIcon, LogoIcon, ProfilesIcon } from './Icons';
import Cookies from 'universal-cookie';
import { MdOutlineHelpOutline, MdOutlineLogout } from 'react-icons/md';
const cookies = new Cookies();

interface NavbarProps {
  width?: TwStyle;
}

const StyledLink = tw(
  NavLink
)`my-2 h-12 flex justify-center items-center w-full text-gray-light`;
const iconStyles = tw`fill-current h-5 w-full`;
const activeLinkStyles = tw`bg-gray-light text-blue-uoft`;

function Navbar({ width: navbarWidth }: NavbarProps): JSX.Element {
  return (
    <div
      css={[
        tw`position[sticky] top-0 items-center bg-blue-uoft pt-12`,
        navbarWidth,
      ]}
    >
      <StyledLink
        to={ROUTES.home}
        tw='flex justify-center items-center mb-10 w-full text-gray-light'
      >
        <LogoIcon css={[iconStyles, tw`h-7`]} />
      </StyledLink>
      <StyledLink to={ROUTES.search} activeStyle={activeLinkStyles}>
        <SearchIcon css={iconStyles} />
      </StyledLink>
      <StyledLink to={ROUTES.profiles} activeStyle={activeLinkStyles}>
        <ProfilesIcon css={iconStyles} />
      </StyledLink>
      <StyledLink activeStyle={activeLinkStyles} to={ROUTES.help}>
        <MdOutlineHelpOutline tw='fill-current h-5 w-full' />
      </StyledLink>
      <StyledLink
        to={ROUTES.login}
        activeStyle={activeLinkStyles}
        onClick={() => {
          cookies.remove('username');
          cookies.remove('password');
        }}
      >
        <MdOutlineLogout tw='fill-current h-5 w-full' />
      </StyledLink>
    </div>
  );
}

export default Navbar;
