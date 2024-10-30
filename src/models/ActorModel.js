class ActorModel {
    constructor(actor_struct) {
        if (actor_struct == null) {
            return;
        }
        this.id = actor_struct.id
        this.first_name = actor_struct.first_name
        this.last_name = actor_struct.last_name
    }

    getFullName() {
        return this.first_name + " " + this.last_name
    }
}

export default ActorModel