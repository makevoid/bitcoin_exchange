var all, bind_togglables, boot, evt_on, http, main, q, toggle;

boot = function(cb) {
  return document.addEventListener("DOMContentLoaded", cb);
};

q = function(name, in_children) {
  if (in_children) {
    return in_children.querySelector(name);
  } else {
    return document.querySelector(name);
  }
};

all = function(name, in_children) {
  if (in_children) {
    return in_children.querySelectorAll(name);
  } else {
    return document.querySelectorAll(name);
  }
};

toggle = function(node, className) {
  return node.classList.toggle(className);
};

evt_on = function(node, eventName, eventHandler) {
  return node.addEventListener(eventName, eventHandler);
};

http = function(settings) {
  var req;
  req = new XMLHttpRequest();
  req.withCredentials = settings.credentials;
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 200) {
        return settings.good(req);
      } else {
        return settings.error(req);
      }
    }
  };
  req.open(settings.method, settings.url, true);
  return req.send(null);
};

main = function() {
  return bind_togglables();
};

bind_togglables = function() {
  var tog, toggled, togs, _i, _len, _results;
  togs = all("[data-toggle]");
  _results = [];
  for (_i = 0, _len = togs.length; _i < _len; _i++) {
    tog = togs[_i];
    toggled = q("." + tog.dataset.toggle);
    _results.push(evt_on(tog, "click", function() {
      return toggle(toggled, "hidden");
    }));
  }
  return _results;
};

boot(main);
