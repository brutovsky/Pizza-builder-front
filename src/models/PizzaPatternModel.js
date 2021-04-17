export default class PizzaPatternModel {
    constructor(uuid, name, confirmed, userEntityUUID, ingredients, photo) {
        this.uuid = uuid;
        this.name = name;
        this.confirmed = confirmed;
        this.userEntityUUID = userEntityUUID;
        this.ingredients = ingredients;
        this.photo = photo;
    }
}
