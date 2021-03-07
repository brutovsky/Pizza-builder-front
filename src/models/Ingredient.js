import IngredientInPizza from "./IngredientInPizza";

export default class Ingredient {
    constructor(name, group, description, url) {
        this.name = name;
        this.group = group;
        this.description = description;
        this.url = url;
    }
    ingredient(howMany){
        return new IngredientInPizza(this.name,howMany,this.url);
    }
}
