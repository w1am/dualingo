import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

const FADE_IN = styled.div`
  animation: 1s ${fadeInAnimation}
`

const FADE = styled.div`
  animation: 0.4s ${fadeInAnimation}
`

export const Animations = {
  FADE_IN,
  FADE
}
