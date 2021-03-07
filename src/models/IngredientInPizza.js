export default class IngredientInPizza {
    constructor(name, howMany, url) {
        this.name = name;
        this.url = url;
        this.howMany = howMany;
    }

    isAny() {
        return this.howMany > 0;
    }

    minus() {
        this.howMany -= 1;
    }

    plus() {
        this.howMany += 1;
    }
}
