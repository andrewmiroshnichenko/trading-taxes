### Logic to calculate P&L for every type of transaction

Every type of transaction (trade, fee, dividend) is behorehand filtered out of incoming data array.
Than different logic is applied to the different transactions.

#### Trades 

1. Trades are sorted from newest to latest.
2. Map with keys equal to symbols is created. Value is an array, filled with prices of particular deal of given symbol. For example:
   BUY 2 T stocks for 10$ will result in [10, 10]
   SELL 4 T stocks for 20$ will result in [-20 -20 -20 -20]
   If operation of the same sign happens - new values are just pushed to the end of the array. No "deal profit" property is written (**because indeed no profit is created after operation of the same sign**).
   As a result - *in a given moment only numbers of same sign can exist in the array*.
3. If operation of the opposite sign is performed, next logic is involved (given array length is *N* and opposite operation has *M* shares);
   - if *N* > *M*, then *M* items is `shift`ed from the array. Deal profit is a sum of *M* pairs (shifted item + single transaction share). For example,
   let's assume that T has array of [20, 15, 20, 25] and transaction is SELL of **2** shares at 18. Then deal profit will be `(20 + -18) + (15 + -18) = -1`. Remained part of the array is [20, 25];
    - if *M* > *N*, then all *N* items is removed from the array. Deal profit is a sum of shifted items and single transaction shares. Remained *M* - *N* items will be added as a base for new array. For example, let's assume that T has array of [20, 15] and transaction is SELL of **4** shares at 20. Then deal profit will be `(20 + -20) + (15 + -20) = -5`. Remained new array is [-20 -20];
4. Deal profit is written for every appropriate deal and then exported as a separate property.


#### Dividends

Only sum is calculated, no additional logic is applied. Taxes aren't withdrawn by default. Number in a sheet is what was issued by a dividend issuer.

#### Fees

Fees are calculated sparingly. This includes
- Exante: trading fee
- Exante: interests (when I borrow money to play long)
- Exante: overnight fee (when I borrow money to play short)