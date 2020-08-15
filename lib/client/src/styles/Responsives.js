import styled from 'styled-components';

const TOP_NAV_RES_MENU_LAYOUT = styled.div`
  display: none;
  padding: 20px 20px;
  @media (max-width: 890px) {
    display: flex;
    flex-direction: row-reverse;
  }
`
const COMMON_RES_FORM_WRAPPER = styled.div`
  padding-bottom: 13px;
  margin-bottom: 5px;
  margin-right: 15px;
`
const STORE_PAGE_SIDEBAR_CONTAINER = styled.div`
  padding: 10px;
  border-bottom: 1px solid #DDDDDD;
  background: white;
  display: none;
  @media (max-width: 890px) {
    display: flex;
    justify-content: space-between;
  }
`

export const Responsives = {
  TOP_NAV_RES_MENU_LAYOUT,
  COMMON_RES_FORM_WRAPPER,
  STORE_PAGE_SIDEBAR_CONTAINER
}
