var all, bind_overlay_dismiss, bind_tabbed, bind_tabs, bind_togglables, boot, hash_change_return_url, http, main, q, show_hash_section, toggle;

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
  bind_togglables();
  bind_tabbed();
  bind_overlay_dismiss();
  show_hash_section();
  return hash_change_return_url();
};

hash_change_return_url = function() {
  return window.addEventListener("hashchange", function() {
    var hash, url_field;
    hash = location.hash.slice(1);
    url_field = q(".return_url");
    return url_field.value = location;
  });
};

show_hash_section = function() {
  var found, hash, section, sections, _i, _j, _len, _len1;
  if (location.hash !== "") {
    hash = location.hash.slice(1);
    sections = all(".tabbed section");
    for (_i = 0, _len = sections.length; _i < _len; _i++) {
      section = sections[_i];
      if (section.classList[0] === hash) {
        found = section;
      }
    }
    if (!found) {
      return;
    }
    for (_j = 0, _len1 = sections.length; _j < _len1; _j++) {
      section = sections[_j];
      section.classList.add("hidden");
    }
    return found.classList.remove("hidden");
  }
};

bind_tabs = function() {
  var elements, inside, tab, tabs, _i, _len, _results;
  tabs = all(".tab > h1 a");
  elements = [];
  inside = [];
  _results = [];
  for (_i = 0, _len = tabs.length; _i < _len; _i++) {
    tab = tabs[_i];
    tab.addEventListener("click", function(evt) {
      return console.log(evt.target.dataset);
    });
    _results.push(true);
  }
  return _results;
};

bind_togglables = function() {
  var tog, togs, _i, _len, _results;
  togs = all("[data-toggle]");
  _results = [];
  for (_i = 0, _len = togs.length; _i < _len; _i++) {
    tog = togs[_i];
    tog.addEventListener("click", function(evt) {
      var toggled;
      toggled = q("." + evt.target.dataset.toggle);
      toggle(toggled, "hidden");
      return true;
    });
    _results.push(true);
  }
  return _results;
};

bind_tabbed = function() {
  var idx, sections, tab, tabs, _i, _len, _results;
  tabs = all(".tabbed > nav button");
  sections = all(".tabbed section");
  _results = [];
  for (idx = _i = 0, _len = tabs.length; _i < _len; idx = ++_i) {
    tab = tabs[idx];
    tab.dataset.idx = idx;
    _results.push(tab.addEventListener("click", function(evt) {
      var section, section_name, tabb, target, _j, _k, _len1, _len2;
      for (_j = 0, _len1 = tabs.length; _j < _len1; _j++) {
        tabb = tabs[_j];
        tabb.classList.remove("current");
      }
      target = evt.target;
      if (target.tagName !== "BUTTON") {
        target = evt.target.parentNode;
      }
      if (target.tagName !== "BUTTON") {
        target = evt.target.parentNode.parentNode;
      }
      idx = target.dataset.idx;
      section_name = sections[idx].classList[0];
      location.hash = section_name;
      target.classList.add("current");
      for (_k = 0, _len2 = sections.length; _k < _len2; _k++) {
        section = sections[_k];
        section.classList.add("hidden");
      }
      return toggle(sections[idx], "hidden");
    }, false));
  }
  return _results;
};

bind_overlay_dismiss = function() {
  var over, over_click, over_cont;
  over = q(".overlay_section");
  over_cont = q(".overlay-content");
  over_click = false;
  if (!over_cont) {
    return;
  }
  over_cont.addEventListener("click", function(evt) {
    return over_click = true;
  });
  return over.addEventListener("click", function(evt) {
    if (!over_click) {
      toggle(over, "hidden");
    }
    return over_click = false;
  });
};

boot(main);
