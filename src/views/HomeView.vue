<template>
<div>
  <v-card
      v-if="movies.length"
    class="mx-auto"
    max-width="400"
    tile
     v-for="movie in movies"
  >
    <v-list-item link :to="{'name' : 'movie', 'params' : {id : movie.id}}">
      <v-list-item-content>
        <v-list-item-title>{{movie.getTitle()}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

  </v-card>
  <v-pagination
      v-model="page"
      :length="6"
    ></v-pagination>
</div>

</template>
import axios from 'axios';
<script>

  import MoviesService from "@/services/MovieService";
  import Movie from "@/components/Movie";

  export default {
    name: 'Home',
    data: () => ({
      movies: [],
      limit: 5,
      movieService: null,
      page: 1,
    }),
    components: {
      Movie
    },
    mounted() {
      this.movieService = new MoviesService(this.limit)
      this.getMovies()


    },
    methods: {
      getOffSet : function (){
        return (this.page - 1) * this.limit;
      },
      getMovies: function (){
        this.movieService.getAllMovies(this.getOffSet()).then((movies) => {
          this.movies = movies;
          console.log(this.movies)
          this.updateMoviesInStore()
        });
      },
      updateMoviesInStore: function () {
        this.$store.dispatch('updateListMovie', this.movies);
      }
    },
    watch :{
      page : function (){
        this.getMovies()
        console.log("store", this.$store.state.all_movies)

      }
    }

  }
</script>
