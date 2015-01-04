# some extraceted from jzed: https://github.com/zedshaw/jzed

boot = (cb) ->
  document.addEventListener "DOMContentLoaded", cb

q = (name, in_children) ->
  if in_children then in_children.querySelector name else document.querySelector name

all = (name, in_children) ->
  if in_children then in_children.querySelectorAll name else document.querySelectorAll name

# not used but cool
filter = (nodes, fn) ->
  Array.prototype.filter.call nodes, fn


## jzed end

toggle_all = (nodes, className) ->
  for node in nodes
    toggle node, className

toggle = (node, className) ->
  node.classList.toggle className

is_form = (element) ->
  element.tagName == "FORM"


# evt_on = (node, eventName, eventHandler) ->
#   node.addEventListener eventName, eventHandler

http = (settings) ->
  req = new XMLHttpRequest()
  req.withCredentials = settings.credentials

  req.onreadystatechange = ->
    if req.readyState == 4
      if req.status == 200
        settings.good req
      else
        settings.error req

  req.open settings.method, settings.url, true
  req.send null

# style = ->
#   each arguments, (val) ->
#     if val[0].length != null
#       each val[0], (element) ->
#         element.className = val[1]
#     else
#       val[0].className = val[1]

# each = (arr, cb) ->
#   if !arr
#     return
#   else if (Array.prototype.forEach && arr.forEach == Array.prototype.forEach)
#     arr.forEach cb
#   else
#     for i in [0..arr.length]
#       cb(arr[i], i, arr)


#####

main = ->
  bind_togglables()
  #bind_tabs()
  bind_tabbed()
  bind_overlay_dismiss()
  show_hash_section()
  hash_change_return_url()
  bind_user_details_position()
  bind_limit_order_calc()

  form = q "form.buy_form"
  limit_order_calc_form form
  form = q "form.sell_form"
  limit_order_calc_form form
  # q('.col4.offset-left3 button').click()


limit_order_calc = (evt) ->
  form = evt.target.parentNode.parentNode
  limit_order_calc_form form

limit_order_calc_form = (form) ->
  if form && is_form form
    amount = q "input[name='order[amount]']", form
    price  = q "input[name='order[price]']", form
    total  = q "span.eur_total", form
    amount = amount.value
    price  = price.value
    value = amount * price
    if value == parseFloat(value)
      total.innerHTML = "€#{value.toFixed 2}"
    else
      total.innerHTML = "€"



bind_limit_order_calc = ->
  elems = all ".limit_order.limit input[name='order[amount]'], .limit_order.limit input[name='order[price]']"
  for elem in elems
    elem.addEventListener "keyup", limit_order_calc

hash_change_return_url = ->
  window.addEventListener "hashchange", ->
    hash = location.hash[1..-1]
    url_field = q ".return_url"
    url_field.value = location

show_hash_section = ->
  if location.hash != ""
    hash = location.hash[1..-1]
    sections = all ".tabbed section"
    for section in sections
      found = section if section.classList[0] == hash
    return unless found
    for section in sections
      section.classList.add "hidden"
    found.classList.remove "hidden"


# bind_tabs = ->
#   tabs = all ".tab > h1 a"
#   elements = []
#   inside = []
#   for tab in tabs
#     # evt_on tab, "click", (evt) ->
#     tab.addEventListener "click", (evt) ->
#       # parent = evt.target.parentNode.parentNode
#       # inside = parent.querySelector ".inside"
#       console.log evt.target.dataset
#       #toggle inside, "hidden"
#
#     true
#
#   # for tab in tabs


bind_togglables = ->
  togs = all "[data-toggle]"
  for tog in togs
    tog.addEventListener "click", (evt) ->
      target = evt.target
      target = target.parentNode unless target.nodeName == "BUTTON" || target.nodeName == "A"
      toggled = all ".#{target.dataset.toggle}"
      toggle_all toggled, "hidden"
      true
    true

bind_tabbed = ->
  tabs = all ".tabbed > nav button"
  sections = all ".tabbed section"
  for tab, idx in tabs
    tab.dataset.idx = idx
    tab.addEventListener "click", (evt) ->
      for tabb in tabs
        tabb.classList.remove "current"
      target = evt.target
      # TODO: use jsh
      target = evt.target.parentNode unless target.tagName == "BUTTON"
      target = evt.target.parentNode.parentNode unless target.tagName == "BUTTON"
      idx = target.dataset.idx
      section_name = sections[idx].classList[0]
      location.hash = section_name
      target.classList.add "current"
      for section in sections
        section.classList.add "hidden"
      toggle sections[idx], "hidden"
    , false

bind_overlay_dismiss = ->
  over = q ".overlay_section"
  over_cont = q ".overlay-content"
  over_click = false
  return unless over_cont
  over_cont.addEventListener "click", (evt) ->
    over_click = true
  over.addEventListener "click", (evt) ->
    unless over_click
      toggle over, "hidden"
    over_click = false

bind_user_details_position = ->
  return

  usr_det_btn = q "[data-toggle=user_details]"
  user_details = q "section.user_details"

  max = 980

  usr_det_btn.addEventListener "click", (evt) ->
    ud = q(".user_details").offsetWidth
    width = window.screen.availWidth
    width = (width - max)/2 - ud
    console.log ud, width
    user_details.style.right = "#{width}px"


boot main