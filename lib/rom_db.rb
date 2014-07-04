DB = ROM::Environment.setup(memory: 'memory://test') do
  schema do
    base_relation :withdrawals_btc do
      repository :memory

      attribute :id,      Integer
      attribute :amount,  Float

      attribute :user_id, Integer
      # belongs_to :user

      key :id
    end
    
    base_relation :withdrawals_fiat do
      repository :memory

      attribute :id,        Integer
      attribute :amount,    Float
      attribute :executed,  Integer

      attribute :user_id,   Integer
      # belongs_to :user

      key :id
    end
  end

  mapping do
    relation :withdrawals_btc do
      map :id, :amount, :user_id
      model WithdrawalBtc
    end
    
    relation :withdrawals_fiat do
      map :id, :amount, :user_id, :executed
      model WithdrawalFiat
    end
  end
end