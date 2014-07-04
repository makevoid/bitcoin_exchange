# some extraceted from jzed: https://github.com/zedshaw/jzed

boot = (cb) ->
  document.addEventListener "DOMContentLoaded", cb

q = (name, in_children) ->
  if in_children then in_children.querySelector name else document.querySelector name

all = (name, in_children) ->
  if in_children then in_children.querySelectorAll name else document.querySelectorAll name

toggle = (node, className) ->
  node.classList.toggle className

evt_on = (node, eventName, eventHandler) ->
  node.addEventListener eventName, eventHandler

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
    toggled = q ".#{tog.dataset.toggle}"
    evt_on tog, "click", ->
      toggle toggled, "hidden"
      true
    true

bind_tabbed = ->
  tabs = all ".tabbed > nav a, .tabbed > nav button"
  sections = all ".tabbed section"
  for tab, idx in tabs
    tab.dataset.idx = idx
    tab.addEventListener "click", (evt) ->
      for tabb in tabs
        tabb.classList.remove "current"
      target = evt.target
      target.classList.add "current"
      for section in sections
        section.classList.add "hidden"
      idx = target.dataset.idx
      toggle sections[idx], "hidden"

bind_overlay_dismiss = ->
  over = q ".overlay"
  over_cont = q ".overlay-content"
  over_click = false
  over_cont.addEventListener "click", (evt) ->
    over_click = true
  over.addEventListener "click", (evt) ->
    unless over_click
      hide = toggle over, "hidden"
    over_click = false

  
  

boot main