import React, { useState } from 'react';
import tw, { TwStyle } from 'twin.macro';
import styled, { css } from 'styled-components';
import './../login.css';
import { LogoIcon } from '../components/Icons';
const iconStyles = tw`fill-current h-5 w-full`;
import {Link} from "react-router-dom";

function SignUp(): JSX.Element {
  return (
    <LoginPage
      title='SIGMA EDUCATE'
      username='USERNAME'
      password='PASSWORD'
      sigmaLogo1Props={loginPageData.sigmaLogo1Props}
      loginBtnProps={loginPageData.loginBtnProps}
      loginBtnProps2={loginPageData.loginBtnProps2}
    />
  );
}

export default SignUp;

function LoginPage(props: {
  title: any;
  username: any;
  password: any;
  sigmaLogo1Props: any;
  loginBtnProps: any;
  loginBtnProps2: any;
}) {
  const { title, sigmaLogo1Props, loginBtnProps, loginBtnProps2 } = props;

  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        alert(`SIGNING UP WITH Name ${username} and Password ${password}`);
      }
    }
  };

  return (
    <div className='container-center-horizontal'>
      <div className='login-pagescreen'>
        <DashboardLogin>
          <FlexRow>
            <SigmaLogo1 src={'SigmaLogo.png'} />
            <Title>{title}</Title>
          </FlexRow>
          <Form>
            <form onSubmit={handleSubmit}>
              <OverlapGroup>
                <User src='UserLogo.png' />
                <Username>
                  {' '}
                  <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={(e) => setName(e.target.value)}
                  />{' '}
                </Username>
              </OverlapGroup>
              <OverlapGroup1>
                <User src='LockLogo.png' />
                <Password>
                  {' '}
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                  />{' '}
                </Password>
              </OverlapGroup1>
              <OverlapGroup1>
                <User src='LockLogo.png' />
                <Password>
                  {' '}
                  <input
                    type='password'
                    name='password'
                    placeholder='Confirm Password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />{' '}
                </Password>
              </OverlapGroup1>
              <LoginBtn>
                {
                  <input
                    type='submit'
                    className='block'
                    value='CREATE ACCOUNT'
                  />
                }
              </LoginBtn>
            </form>
          </Form>
        </DashboardLogin>
      </div>
    </div>
  );
}

export const MontserratLightWhite14px = css`
  color: var(--white);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-s);
  font-weight: 300;
  font-style: normal;
`;

export const MontserratSemiBoldNewCar16px = css`
  color: var(--new-car);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-m);
  font-weight: 600;
  font-style: normal;
`;

export const MontserratBoldWhite45px = css`
  color: var(--white);
  font-family: var(--font-family-montserrat);
  font-size: var(--font-size-l);
  font-weight: 700;
  font-style: normal;
`;

export const Border1pxWhite = css`
  border: 1px solid var(--white);
`;
const sigmaLogo1Data = {
  src: 'sigma-logo-1.png',
};

const loginBtnData = {
  children: 'LOGIN',
};

const loginBtn2Data = {
  children: 'SIGN UP',
};

const loginPageData = {
  sigmaLogo1Props: sigmaLogo1Data,
  loginBtnProps: loginBtnData,
  loginBtnProps2: loginBtn2Data,
};

const DashboardLogin = styled.div`
  width: 1280px;
  height: 980px;
  position: relative;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  padding: 127px 330px;
  align-items: center;
  background-color: var(--new-car);
`;

const FlexRow = styled.div`
  height: 97px;
  position: relative;
  align-self: flex-end;
  margin-top: 77px;
  display: flex;
  align-items: flex-start;
  min-width: 518px;
`;

const Title = styled.h1`
  ${MontserratBoldWhite45px}
  width: 431px;
  min-height: 60px;
  align-self: flex-end;
  margin-left: 4px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
`;

const Form = styled.div`
  width: 300px;
  position: relative;
  margin-top: 29px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 198px;
`;

const OverlapGroup = styled.div`
  ${Border1pxWhite}
  height: 45px;
  display: flex;
  padding: 12px 11px;
  align-items: flex-start;
  min-width: 300px;
  border-radius: 4px;
`;

const OverlapGroup2 = styled.div`
  ${Border1pxWhite}
  height: 45px;
  margin-top: 20px;
  display: flex;
  padding: 12px 11px;
  align-items: flex-start;
  min-width: 300px;
  border-radius: 4px;
`;

const User = styled.img`
  width: 20px;
  height: 20px;
`;

const Username = styled.div`
  ${MontserratLightWhite14px}
  min-height: 20px;
  margin-left: 19px;
  min-width: 84px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
`;

const OverlapGroup1 = styled.div`
  ${Border1pxWhite}
  height: 45px;
  margin-top: 20px;
  display: flex;
  padding: 12px 11px;
  align-items: flex-start;
  min-width: 300px;
  border-radius: 4px;
`;

const Password = styled.div`
  ${MontserratLightWhite14px}
  min-height: 20px;
  margin-left: 19px;
  min-width: 85px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
`;

function SigmaLogo1(props: { src: any }) {
  const { src } = props;

  return <SigmaLogo11 style={{ backgroundImage: `url(${src})` }}></SigmaLogo11>;
}

const SigmaLogo11 = styled.div`
  width: 83px;
  height: 140px;
  background-size: cover;
  background-position: 50% 50%;
`;

function LoginBtn(props: { children: any }) {
  const { children } = props;

  return (
    <LoginBtn1>
      <Logindiv>{children}</Logindiv>
    </LoginBtn1>
  );
}

const LoginBtn1 = styled.div`
  height: 45px;
  margin-top: 43px;
  display: flex;
  padding: 12px 123px;
  align-items: flex-end;
  min-width: 300px;
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: 0px 4px 4px #0000004c;
`;

const Logindiv = styled.div`
  ${MontserratSemiBoldNewCar16px}
  min-height: 20px;
  min-width: 54px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
`;

function LoginBtn2(props: { children: any }) {
  const { children } = props;

  return (
    <LoginBtndiv>
      <SIGNUP>{children}</SIGNUP>
    </LoginBtndiv>
  );
}

const LoginBtndiv = styled.div`
  height: 45px;
  margin-top: 20px;
  display: flex;
  padding: 12px 115px;
  align-items: flex-end;
  min-width: 300px;
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: 0px 4px 4px #0000004c;
`;

const SIGNUP = styled.div`
  ${MontserratSemiBoldNewCar16px}
  min-height: 20px;
  min-width: 70px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
`;

const CreateAccount = styled.div`
  ${MontserratSemiBoldNewCar16px}
  min-height: 20px;
  min-width: 120px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
`;

const signUpPageData = {
  sigmaLogo1Props: sigmaLogo1Data,
};
