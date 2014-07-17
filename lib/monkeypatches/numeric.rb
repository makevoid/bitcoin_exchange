class Numeric
  # def f_btc
  #
  # end

  def f_eur
    "%.2f" % self
  end
end


class NotSafeTypeError < TypeError
  def message
    "float is not a safe type, it's better to disable it, sorry, use BigDecimal (to_d)"
  end
end


# class String
#   for safety consider to use a refinement on the models thatlocks String -> Float type conversion
#
#   def to_f
#     raise NotSafeTypeError
#   end
# end

class BigDecimal
  # TODO: recheck, is %g ok?

  # NOTE: use in the models, before all redis assignments: R[] =
  def to_ds
    "%.8f" % self
  end

  alias :to_ss :to_ds
  alias :to_8s :to_ds

  # NOTE: use it in only the views (sub is cpu time consuming, not suited for a fast backend)!
  def to_dz
    ("%.8f" % self).sub(/0+$/, '')
  end

  # NOTE: use this to convert price to redis sorted set's index
  def to_zid
    to_dz
  end

  def to_2s
    "%.2f" % self
  end
end
