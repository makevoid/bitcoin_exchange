### REDIS DB

notes: orders == open orders ( closed_orders are closed orders :] )


users:id:orders  [SET]- (user's orders) 

users:id:orders_btc
users:id:orders_eur

orders:id [HASH]- (orders infos - fields: user_id, type, amount, price, time, time_close)

orders_closed:id [HASH]- (closed orders infos - fields: user_id, type, amount, price, time, time_close)

---

users:id:balance_eur 
users:id:balance_btc

orderbook:last
orderbook:bid
orderbook:ask




### todo 

implement manual mode: every deposit / withdrawal over X parameter must pass manual human verification

