import { Link } from 'react-router-dom';
import tw from 'twin.macro';

const StyledLink = tw(
  Link
)`hover:(underline text-blue-400) text-blue-400 visited:text-purple-800`;

export default StyledLink;
