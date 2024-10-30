import axios from 'axios';
import HOST from "../../services.config";
import MovieModel from "@/models/MovieModel";

class MoviesService {
    constructor(limit) {
        self.url = HOST + 'api/movies';
        self.limit = limit;
    }
    getAllMovies(offset){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(self.url + "?limit=" + self.limit + "&offset=" + offset);
                // We cast the data with our own MovieModel class
                resolve(res.data.results.map((movie) => new MovieModel(movie)))
            }catch (err){
                reject(err)
            }
        });
    }

    getMovie(id){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(self.url + "/" + id);
                // We cast the data with our own MovieModel class
                resolve(new MovieModel(res.data))
            }catch (err){
                reject(err)
            }
        });
    }

    patchMovieAttributes(id, name,value){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.patch(self.url + "/" + id +'/', {
                    [name]: value
                });
                // We cast the data with our own MovieModel class
                resolve(new MovieModel(res.data))
            }catch (err){
               
                reject(err)
            }
        });
    }

}

export default MoviesService