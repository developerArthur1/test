'use strict';
document.addEventListener('DOMContentLoaded', () => {

    const DomElement = function () {
        this.selector;
        this.height;
        this.width;
        this.bg;
        this.fontSize;
        this.text;
        this.elem;
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
            this.elem = document.createElement('div');
            this.elem.className = this.selector.substring(1, this.selector.length);
            this.elem.style.cssText = `height: ${this.height}; width: ${this.width}; background: ${this.bg}; fontSize: ${this.fontSize}; display: flex; justify-content: center; align-items: center; position: absolute;`;
            this.elem.textContent = `${this.text}`;
            document.body.append(this.elem);
        }
        else if (this.selector[0] == '#')
        {
            this.elem = document.createElement('p');
            this.elem.id = this.selector.substring(1, this.selector.substring);
            this.elem.style.cssText = `height: ${height}; width: ${this.width}; background: ${this.bg}; fontSize: ${this.fontSize}; display: flex; justify-content: center; align-items: center;`;
            this.elem.textContent = `${this.text}`;
            document.body.append(this.elem);
        }
    }
    
    DomElement.prototype.eventListeners = function () {
        let top = 0,
            left = 0;
    
        document.addEventListener('keydown', (event) => {
            if (event.keyCode == 38)
            {
                top -= 10;
                this.elem.style.top = top + 'px'; // вверх
            }
            else if (event.keyCode == 40)
            {
                top += 10;
                this.elem.style.top =  top + 'px'; // вниз
            }
            else if (event.keyCode == 37)
            {
                left -= 10;
                this.elem.style.left = left + 'px'; // влево
            }
            else if (event.keyCode == 39)
            {
                left += 10;
                this.elem.style.left = left + 'px'; // вправо
            }
        })
    }
    
    let object = new DomElement();
    object.create('.class', '100px', '100px', 'red', '20px', 'Hello World!');
    object.eventListeners();
})
