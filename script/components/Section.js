export class Section {
    constructor({
        items,
        renderer
    }, cardsContainer) {
        this.items = items;
        this._renderer = renderer;
        this._container = document.querySelector(cardsContainer);
    }
    renderItems() {
        this.items.forEach(item => {
            this._renderer(item); // вызываем renderer, передав item
        });
    }
    addItem(item) {
        this._container.append(item);
    }
    addNewItem(item) {
        this._container.prepend(item);
    }

}