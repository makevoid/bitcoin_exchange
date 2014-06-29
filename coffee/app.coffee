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


bind_togglables = ->
  togs = all "[data-toggle]"
  for tog in togs
    toggled = q ".#{tog.dataset.toggle}"
    evt_on tog, "click", ->
      console.log "toggle"
      toggle toggled, "hidden"

boot main