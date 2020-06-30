'use strict';
document.addEventListener('DOMContentLoaded', () => {
    
    const DomElement = function () {
        this.selector;
        this.height;
        this.width;
        this.bg;
        this.fontSize;
        this.text;
    }
    
    DomElement.prototype.create = function (selector, height, width, bg, fontSize, text) {
    
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.text = text;
    
        if (this.selector[0] == '.')
        {
            let elem = document.createElement('div');
            elem.className = this.selector.substring(1, this.selector.length);
            elem.style.cssText = `height: ${this.height}; width: ${this.width}; background: ${this.bg}; fontSize: ${this.fontSize}; display: flex; justify-content: center; align-items: center;`;
            elem.textContent = `${this.text}`;
            document.body.append(elem);
        }
        else if (this.selector[0] == '#')
        {
            let elem = document.createElement('p');
            elem.id = this.selector.substring(1, this.selector.substring);
            elem.style.cssText = `height: ${height}; width: ${this.width}; background: ${this.bg}; fontSize: ${this.fontSize}; display: flex; justify-content: center; align-items: center;`;
            elem.textContent = `${this.text}`;
            document.body.append(elem);
        }
    }
    
    
    let object = new DomElement();
    
    object.create('.class', '100px', '100px', 'red', '20px', 'Hello World!');
    object.create('#class', '100px', '100px', 'green', '20px', 'Hello World!');    

})