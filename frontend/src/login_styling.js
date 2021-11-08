import styled, { css } from 'styled-components';
import './login.css';

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

export const Background = styled.div`
  width: 1840px;
  height: 950px;
  position: relative;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  padding: 127px 330px;
  align-items: center;
  background-color: var(--new-car);
`;

export const FlexRow = styled.div`
  height: 97px;
  position: relative;
  align-self: flex-middle;
  margin-top: 77px;
  display: flex;
  align-items: flex-start;
  min-width: 518px;
`;

export const Title = styled.h1`
  ${MontserratBoldWhite45px}
  width: 431px;
  min-height: 60px;
  align-self: flex-end;
  margin-left: 4px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
`;

export const Form = styled.div`
  width: 300px;
  position: relative;
  margin-top: 29px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 198px;
`;

export const OverlapGroup = styled.div`
  ${Border1pxWhite}
  height: 45px;
  display: flex;
  margin-bottom: 20px;
  padding: 12px 11px;
  align-items: flex-start;
  min-width: 300px;
  border-radius: 4px;
`;

export const InputLogo = styled.img`
  width: 20px;
  height: 20px;
`;

export const Username = styled.div`
  ${MontserratLightWhite14px}
  min-height: 20px;
  margin-left: 19px;
  min-width: 84px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
`;

export const LoginBtn = styled.div`
  ${MontserratSemiBoldNewCar16px}
  height: 45px;
  margin-top: 20px;
  display: flex;
  padding: 12px 0px;
  align-items: flex-end;
  min-width: 300px;
  background-color: var(--white);
  border-radius: 4px;
  box-shadow: 0px 4px 4px #0000004c;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
`;

export const SigmaLogo11 = styled.div`
  width: 83px;
  height: 140px;
  background-size: cover;
  background-position: 50% 50%;
`;
