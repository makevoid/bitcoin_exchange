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

  def to_ds
    "%.8f" % self
  end

  alias :to_ss :to_ds
  alias :to_8s :to_ds

  def to_dz
    "%.8g" % ("%.8f" % self)
  end

  def to_2s
    "%.2f" % self
  end
end
