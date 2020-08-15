import React, { useState, useEffect, useRef } from 'react';
import { Styles } from '../styles';
import styled from 'styled-components';
import { faChevronRight, faChevronLeft, faChevronDown, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dates as Calendar } from '../shared/date';
const { Common, DatePick } = Styles;
const { Container, Month, Day } = DatePick;

const Button = styled.button`
  display: inline-block;
  padding: 11px;
  border-radius: 4px;
  box-sizing: border-box;
  background: white;
  margin: 0px;
  border: 1px solid #DDDDDD;
  color: #2d2d2d;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`

const Icon = styled(FontAwesomeIcon)`
  color: #333333;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    color: black;
  }
`

const DatePicker = ({ format, setFormat }) => {
  const getToday = () => new Date().getDate(); 
  const getYear = () => new Date().getFullYear(); 
  const getMonth = () => new Date().getMonth();

  const daysInMonth = (month, year) => new Date(year, month, 0).getDate(); 

  const updateCurrMonth = (type) => {
    const current = Calendar.indexOf(currMonth);
    let newCal = 0;
    if (type == 'inc' && (current < 11)) {
      newCal = current + 1;
    }
    if (type == 'dec' && current > 0) {
      newCal = current - 1;
    }
    if (newCal !== null) {
      setCurrMonth(Calendar[newCal]);
    }
  }

  const getYears = (startYear) => {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;
    while ( startYear <= currentYear ) {
      years.push(startYear++);
    };
    return years;
  }

  const [ currMonth, setCurrMonth ] = useState(Calendar[getMonth()]);
  const [ currYear, setCurrYear ] = useState(getYear());
  const [ currDay, setCurrDay ] = useState(getToday());
  const [ isOpen, setIsOpen ] = useState(false);

  const outsideClick = useRef();

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, []);

  const handleClickOutside = event => {
    if (outsideClick.current && !outsideClick.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const onSubmit = () => {
    let updated = `${currMonth.month} ${currDay} ${currYear}`;
    setFormat(updated);
    if (updated.split(' ').length == 3) {
      setIsOpen(false);
    }
  }

  return (
    <div ref={outsideClick} style={{ position: 'relative', margin: 'auto 0', marginLeft: 10 }}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <Icon icon={faCalendarAlt} />
      </Button>

      <Container className={isOpen ? 'fadeIn' : 'fadeOut'}>
        <Month.Layout>
          <Icon style={{ cursor: 'pointer' }} icon={faChevronLeft} onClick={() => updateCurrMonth('dec')} />
          {currMonth.month}
          <Icon style={{ cursor: 'pointer' }} icon={faChevronRight} onClick={() => updateCurrMonth('inc')} />
        </Month.Layout>
        <div style={{ padding: 5, paddingBottom: 0, paddingTop: 2 }}>
          <select onChange={e => setCurrYear(e.target.value)} style={{ width: '100%', padding: 5 }}>
            {
              getYears(2020).map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))
            }
          </select>
        </div>

        <Day.Layout>
          {
            [...Array(daysInMonth(currMonth.id, currYear))].map((day, index) => (
              <Day.Header
                key={index}
                today={`${currMonth.month} ${getToday()} ${getYear()}`}
                onClick={() => setCurrDay(index + 1)}
                current={index + 1}
                selected={currDay}
              >{ index + 1 < 10 ? `0${index + 1}` : index + 1 }</Day.Header>
            ))
          }
        </Day.Layout>

        <Common.Elements.Divider style={{ margin: 0, padding: 0 }} />

        <p style={{ textAlign: 'right', margin: 0, padding: 10 }}>
          <Common.Buttons.Default onClick={() => onSubmit()} style={{ width: '100%' }}>Set</Common.Buttons.Default>
        </p>
      </Container>
    </div>
  )
}

export default DatePicker;
