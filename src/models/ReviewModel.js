import MovieModel from "@/models/MovieModel";


class ReviewModel{
    constructor(review_struct) {
        if (review_struct == null) {
            return;
        }
        this.id = review_struct.id;
        this.movie = new MovieModel(review_struct.movie);
        this.grade = review_struct.grade;
    }
}

export default ReviewModel;