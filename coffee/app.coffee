# some extraceted from jzed: https://github.com/zedshaw/jzed

boot = (cb) ->
  document.addEventListener "DOMContentLoaded", cb

q = (name, in_children) ->
  if in_children then in_children.querySelector name else document.querySelector name

all = (name, in_children) ->
  if in_children then in_children.querySelectorAll name else document.querySelectorAll name

toggle = (node, className) ->
  node.classList.toggle className

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


bind_tabs = ->
  tabs = all ".tab > h1 a"
  elements = []
  inside = []
  for tab in tabs
    # evt_on tab, "click", (evt) ->
    tab.addEventListener "click", (evt) ->
      # parent = evt.target.parentNode.parentNode
      # inside = parent.querySelector ".inside"
      console.log evt.target.dataset
      #toggle inside, "hidden"

    true

  # for tab in tabs


bind_togglables = ->
  togs = all "[data-toggle]"
  for tog in togs
    tog.addEventListener "click", (evt) ->
      # console.log evt.target
      toggled = q ".#{evt.target.dataset.toggle}"
      # setTimeout ->
      #         toggle toggled, "hidden"
      #       , 0
      toggle toggled, "hidden"
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


boot main