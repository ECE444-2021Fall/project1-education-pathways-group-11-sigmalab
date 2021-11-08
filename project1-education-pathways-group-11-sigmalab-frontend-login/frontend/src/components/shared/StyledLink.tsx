import { Link } from 'react-router-dom';
import tw from 'twin.macro';

const StyledLink = tw(
  Link
)`hover:(underline text-blue-400) visited:text-blue-400`;

export default StyledLink;
