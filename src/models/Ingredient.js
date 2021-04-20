import IngredientInPizza from "./IngredientInPizza";

export default class Ingredient {
    constructor(uuid, groupUuid, name, price, spicy, vegetarian, vegan, photoUrl) {
        this.uuid = uuid;
        this.groupUuid = uuid;
        this.name = name;
        this.price = price;
        this.spicy = spicy;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
        this.photoUrl = photoUrl;
    }
    ingredient(howMany){
        return new IngredientInPizza(this.uuid, this.groupUuid, this.name, this.price, this.spicy, this.vegetarian, this.vegan, this.photoUrl,howMany);
    }
}
