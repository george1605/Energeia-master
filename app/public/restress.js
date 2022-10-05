var Restress = Object.create(null);
var name = 'World';
Restress.Component = class {
  constructor() {
    this.jsx = '<h1>Hello, {{name}}!</h1>';
    this.element = document.createElement("DIV");
    this.props = {};
  }
  format() {
    return this.jsx.replace(/{{((.*?)+)}}/g, function(match, index) {
      return String(eval(index));
    });
  }
  apply(props) {
    var keys = Object.keys(props);
    for (var i = 0; i < keys.length; i++) {
      this.element.setAttribute(keys[i], props[keys[i]]);
    }
  }
  style(styles) {
    this.element.setAttribute("style", styles);
  }
  set props(n) {
    this.apply(n);
  }
};

Restress.show = function(root, comp) {
  comp.element.innerHTML = comp.format();
  document.querySelector(root).appendChild(comp.element);
}

Restress.render = function(func) {
  var comp = new Restress.Component();
  comp.jsx = func();
  Restress.show("#root", comp);
  return comp;
}

Restress.use = function(lib, func) {
  switch (lib) {
    case "jQuery":
      const jqueryScript = document.createElement('script')
      jqueryScript.src = 'https://code.jquery.com/jquery-3.4.1.min.js'
      jqueryScript.onload = func;
      document.head.append(jqueryScript)
      return jqueryScript;
    case "vue":
      const vue = document.createElement("script")
      vue.src = "https://unpkg.com/vue@3"
      vue.onload = func;
      document.head.append(vue);
      return vue;
    case "react":
      const react1 = document.createElement("script");
      const react2 = document.createElement("script");
      react1.src = "https://unpkg.com/react@18/umd/react.development.js";
      react2.src = "https://unpkg.com/react-dom@18/umd/react-dom.development.js";
      react2.onload = func;
      document.head.append(react1);
      document.head.append(react2);
  }
}

Restress.babel = function(code) {
  const scr = document.createElement("script");
  scr.setAttribute("type", "text/babel");
  scr.textContent = code;
  document.body.append(scr);
}

Restress.loadBabel = function(func) {
  const script = document.createElement("script");
  script.src = "https://unpkg.com/@babel/standalone@7.18.13/babel.min.js";
  script.onload = func;
  document.head.append(script);
}

Restress.unuse = function(script) {
  script.remove();
}

Restress.findClass = function(string, name) {
  var i = string.indexOf("." + name); 
  var classn = "";
  for (var j = i; string[j] != "}"; j++)
    classn += string[j];
  return classn;
}

// the... lazy loading
Restress.genPoints = {};

Restress.smartLoad = function(page, func) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", page, true);
  xhr.onreadystatechange = () => {
    func(xhr);
  }
  xhr.send();
}

Restress.backToTop = function() {
    while(document.body.scrollTop != 0 || window.scrollX != 0)
    {
        window.scrollBy(-20, 0);
    }
}

Restress.isInViewport = function(elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

Restress.setScrollPoint = function(elem, f) {
  Restress.genPoints[elem.getBoundingClientRect().top] = f;
}

Restress.initScroll = function() {
  window.onscroll = function () {
    var keys = Object.keys(Restress.genPoints);
    for (var i = 0; i < keys.length; i++)
      if (i > window.scrollY) {
        Restress.genPoints[i]();
        Restress.genPoints[i] = () => {};
      }
  }
}

function toggleMenu() {
  document.querySelector("#navbarNav").classList.toggle("div-menu");
}