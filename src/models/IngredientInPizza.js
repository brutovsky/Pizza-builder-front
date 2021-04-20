export default class IngredientInPizza {
    constructor(uuid, groupUuid, name, price, spicy, vegetarian, vegan, photoUrl, howMany) {
        this.uuid = uuid;
        this.groupUuid = uuid;
        this.name = name;
        this.price = price;
        this.spicy = spicy === null ? false : spicy;
        this.vegetarian = vegetarian === null ? false : vegetarian;
        this.vegan = vegan === null ? false : vegan;
        this.photoUrl = photoUrl;
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
