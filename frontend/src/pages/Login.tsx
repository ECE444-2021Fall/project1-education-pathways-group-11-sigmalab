import React, { useState } from 'react';
import './../login.css';
import * as styling from './../login_styling';
import { useHistory } from 'react-router-dom';

function Login(): JSX.Element {
  return (
    <LoginPage
      title='SIGMA EDUCATE'
      loginButtonText='LOGIN'
      signUpButtonText='SIGNUP'
    />
  );
}

export default Login;

function LoginPage(props: {
  title: string;
  loginButtonText: string;
  signUpButtonText: string;
}) {
  const { title, loginButtonText, signUpButtonText } = props;

  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useHistory();
  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    {
      if (username == 'test' && password == 'test') {
        alert(`LOGGING IN WITH Name ${username} and Password ${password}`);
        push('/profiles');
      } else alert(`Invalid Username or Password`);
    }
    // alert(`Submitting Name ${username} and Password ${password}`);
  };
  const handleSignupClick = () => {
    push('/signup');
  };

  return (
    <div className='container-center-horizontal'>
      <styling.Background>
        <styling.FlexRow>
          <SigmaLogo src={'SigmaLogo.png'} />
          <styling.Title>{title}</styling.Title>
        </styling.FlexRow>
        <styling.Form>
          <form onSubmit={handleSubmit}>
            <styling.OverlapGroup>
              <styling.InputLogo src='UserLogo.png' />
              <styling.Username>
                {' '}
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  size={50}
                  onChange={(e) => setName(e.target.value)}
                />{' '}
              </styling.Username>
            </styling.OverlapGroup>
            <styling.OverlapGroup>
              <styling.InputLogo src='LockLogo.png' />
              <styling.Username>
                {' '}
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  size={50}
                  onChange={(e) => setPassword(e.target.value)}
                />{' '}
              </styling.Username>
            </styling.OverlapGroup>
            <styling.LoginBtn>
              {
                <input
                  type='submit'
                  className='block'
                  value={loginButtonText}
                />
              }
            </styling.LoginBtn>

            <styling.LoginBtn>
              {
                <input
                  type='button'
                  className='block'
                  value={signUpButtonText}
                  onClick={handleSignupClick}
                />
              }
            </styling.LoginBtn>
          </form>
        </styling.Form>
      </styling.Background>
    </div>
  );
}

function SigmaLogo(props: { src: string }) {
  const { src } = props;

  return (
    <styling.SigmaLogo11
      style={{ backgroundImage: `url(${src})` }}
    ></styling.SigmaLogo11>
  );
}
