import React, { useState } from 'react';
import './../login.css';
import * as styling from './../login_styling';
import { useHistory } from 'react-router-dom';

function SignUp(): JSX.Element {
  return <SignUpPage title='SIGMA EDUCATE' createButtonText='CREATE ACCOUNT' />;
}

export default SignUp;

function SignUpPage(props: { title: string; createButtonText: string }) {
  const { title, createButtonText } = props;

  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { push } = useHistory();

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    {
      if (
        username === null ||
        username.match(/^ *$/) !== null ||
        username.indexOf(' ') >= 0
      ) {
        alert(`Invalid Username`);
      } else if (
        password === null ||
        password.match(/^ *$/) !== null ||
        password.indexOf(' ') >= 0
      ) {
        alert(`Invalid Password`);
      } else if (password != confirmPassword) {
        alert('Passwords do not match');
      } else {
        alert(
          `SIGNING UP AND LOGGING IN WITH Name ${username} and Password ${password}`
        );
        push('/profiles');
      }
    }
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
                  size={50}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
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
                  size={50}
                  placeholder='Confirm Password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />{' '}
              </styling.Username>
            </styling.OverlapGroup>
            <styling.LoginBtn>
              {
                <input
                  type='submit'
                  className='block'
                  value={createButtonText}
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
