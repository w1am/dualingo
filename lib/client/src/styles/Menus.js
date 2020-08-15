import styled from 'styled-components';
import { Palette } from './Palette';

const TOP_NAV_MENU = styled.p`
  margin: auto 0;
  color: ${Palette.Menu};
`

const FOOTER_MENU = styled.div`
  flex: 1 21%;
  margin: 2%;
  display: flex;
  flex-direction: column;
  @media (max-width: 660px) {
    flex: 1 29.33%;
  };
  @media (max-width: 492px) {
    flex: 1 46%;
  };
  @media (max-width: 480px) {
    flex: 1 96%;
  };
`

export const Menus = {
  TOP_NAV_MENU,
  FOOTER_MENU
}
