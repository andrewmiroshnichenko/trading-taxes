import React from 'react';

const valuesMap = ['tradeDate', 'settleDate', 'currency', 'activityType', null, 'symbol', null, 'quantity', 'price', 'amount']
const validActivityTypes = new Set(['SELL', 'BUY', 'DIV', 'DIVNRA']);

export const FileInput =  () => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files && event.target.files[0]);
    const file = event.target.files && event.target.files[0];

    if (file) {
    const blob = new Blob([file], { type: 'text/csv'})
    const text = await blob.text();
      console.log(text.split('\n').map(value => value.replace(/\"/g, '').split(',').reduce((acc, item, index) => {
        const key = valuesMap[index];
        if (key !== null) {
          
acc[key] = item
        }

        return acc;
      }, {} as any)).filter((v, index) => index !== 0 && validActivityTypes.has(v.activityType)));
}
  }
  return <input type="file" onChange={onChange}/>
}