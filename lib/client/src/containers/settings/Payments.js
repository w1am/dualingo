import React, { useState } from 'react';
import { Styles } from '../../styles';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import Mcb from '../../assets/pays/mcb.png';
import Sbm from '../../assets/pays/sbm.png';

const { Common, Settings } = Styles;
const { Pays } = Settings;

const payments = [
  { key: 'mcb', icon: Mcb, label: 'MCB' },
  { key: 'sbm', icon: Sbm, label: 'SBM' }
]

const Payments = ({ selectedPayments, setSelectedPayments }) => {
  const updateSelected = (key, account, value) => {
    let obj = Object.assign({}, selectedPayments);
    obj[key] = { status: value ? value : selectedPayments[key].status == true ? false: true, account };
    setSelectedPayments(obj);
  }

  return (
    <Pays.Container>
      {
        payments.map((payment, index) => (
          <Pays.Layout key={index} checked={(selectedPayments[payment.key] !== undefined && selectedPayments[payment.key].status) ? true : false} key={payment.key}>
            <div onClick={() => updateSelected(payment.key, null)}>
              <Common.Icons.Default
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: 1,
                  padding: 5,
                  color: (selectedPayments[payment.key] !== undefined && selectedPayments[payment.key].status) ? '#64ce27' : '#DDDDDD',
                  transition: '0.1s linear'
                }}
                icon={faCheckCircle}
              />
              <Common.Containers.Image>
                <Pays.Icon src={payment.icon} />
              </Common.Containers.Image>
            </div>
            {
              (selectedPayments[payment.key] !== undefined && selectedPayments[payment.key].status) && (
                <Common.Form.Input
                  onChange={(e) => updateSelected(payment.key, e.target.value, true)}
                  onBlur={e => {
                    updateSelected(payment.key, e.target.value, true)
                  }}
                  style={{ maxWidth: '100%' }}
                  value={selectedPayments[payment.key].account}
                  placeholder="A/C"
                />
              )
            }
          </Pays.Layout>
        ))
      }
    </Pays.Container>
  )
}

export default Payments;
