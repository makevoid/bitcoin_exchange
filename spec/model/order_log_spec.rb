
# unit_test logs

log = "
  
  
  LOG
  ---
  LOG_NAME: Transaction Example Log
  
  
  BALANCE   
  ---
  user_id   | BTC     | EUR
  1         | 0       | 500.0
  2         | 1.0     | 0
  
  
  TRANSACTION
  ---
  BUYER:  1, Mario Rossi
  SELLER: 2, Luigi
  
  
  ORDERS
  ---
  BUYER   1 BTC @ 500 EUR
  SELLER  1 BTC @ 500 EUR
  
  
  BALANCE [TX START]
  ---
            | BTC     | EUR 
  BUYER     | 0       | 500.0
  SELLER    | 1.0     | 0
  EXCHANGE  | 0       | 0
  
  
  BALANCE [TX END]
  ---
            | BTC     | EUR 
  BUYER     | 0.99    | 0
  SELLER    | 0       | 495.0
  EXCHANGE  | 0.01    | 5
  
"

log2 = "

Balance
0.99BTC €0
0BTC    €495.0
0.01BTC €5      [exchange]
"