function DomElement(selector, bg, height, width, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;

};

DomElement.prototype.createElements = function () {

    let div;
    let p;
    if (this.selector.charAt(0) === '.') {
        div = document.createElement('div');
        div.className = this.selector.slice(1);
        div.style.cssText = `height: ${this.height};
    background: ${this.bg};
    width: ${this.width};
    font-size: ${this.fontSize};
  `;
        div.innerHTML = "<strong>Div!</strong>";
        document.body.prepend(div);
    } else if (this.selector.charAt(0) === '#') {
        p = document.createElement('p');
        p.id = this.selector.slice(1);
        p.style.cssText = `height: ${this.height};
    background: ${this.bg};
    width: ${this.width};
    font-size: ${this.fontSize};
  `;
        p.innerHTML = "<strong>Параграф!</strong>";
        document.body.prepend(p);
    }
};

let domElementDiv = new DomElement('.block', 'green', '50px', '400px', '18px');
let domElementId = new DomElement('#best', 'red', '50px', '400px', '18px');

domElementDiv.createElements();
domElementId.createElements();