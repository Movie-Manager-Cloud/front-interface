import ActorModel from "@/models/ActorModel";

class MovieModel{
    constructor(movie_struct) {
        if (movie_struct == null) {
            return;
        }
        this.id = movie_struct.id;
        this.title = movie_struct.title;
        this.description = movie_struct.description;
        this.actors = movie_struct.actors.map(actor => new ActorModel(actor));
        this.averageGrade = movie_struct.average_grade;
    }
    getActors(){
        return this.actors;
    }
    getTitle(){
        return this.title;
    }
    getAverageGrade(){
        return this.averageGrade;
    }
    getAllFullNameActors(){
        let finale_string= ""
        this.actors.forEach(actor => {
            finale_string += actor.getFullName() + ", "
        });
        return finale_string;
    }
}

export default MovieModel;
