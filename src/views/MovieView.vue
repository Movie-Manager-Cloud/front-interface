<template>
  <div>
    <v-card class="ma-auto" max-width="400" tile>
      <v-card-actions>
        <v-btn v-if="prevRoute" :to="prevRoute.path">
          <v-icon>mdi-arrow-left</v-icon>
          <v-spacer></v-spacer>

        </v-btn>
      </v-card-actions>
      <Movie v-if="movie" :movie=movie @movie-details-update="updateMovieDetails">

      </Movie>

    </v-card>
    <br />
    <v-card class="ma-auto" max-width="400" tile>

      <v-card-title> Ajouter une note </v-card-title>
      <AddReview @review-submitted="addAReview"></AddReview>

    </v-card>
  </div>
</template>

<script>
import Movie from "@/components/Movie";
import MovieService from "@/services/MovieService";
import AddReview from "@/components/AddReview";
import ReviewService from "@/services/ReviewService";

export default {
  name: "MovieView",
  components: { Movie, AddReview },
  data: () => ({
    movieId: null,
    movie: null,
    prevRoute: null,
    movie_service: new MovieService(),
    notifications: [],
  }),
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    });
  },
  async created() {
    this.movieId = this.$route.params.id;
    this.movie = this.$store.getters.getMovie(this.movieId)

    if (this.movie == null) {
      //If the movie have not been found in the store, we get it from the API
      this.getMovie(this.movieId)
    }

  },
  methods: {

    updateMovieDetails: function (payload) {
      this.movie_service.patchMovieAttributes(this.movie.id, payload.name, payload.value).then((movie) => {
        this.movie = movie
        this.$notify(
          {
            group: "success",
            text: "The attribute " + payload.name + " have been updated.",
            icon: "mdi-content-save",
          },
          4000
        );
        //Update the movie in the store
        this.$store.dispatch('updateMovie', movie)
      }).catch((err) => {
        console.log(err)
      });

    },
    addAReview: function (grade) {
      let review_service = new ReviewService();
      review_service.postGradeForMovie(this.movie.id, grade).then((review) => {
        this.getMovie(this.movieId)
        this.$notify(
          {
            group: "success",
            text: "You have rated the movie with a " + grade + " !",
            icon: "mdi-check",
          },
          4000
        );
      }).catch((custom_errors) => {
        // custom_errors : ApiErrorHandler[]
        custom_errors.forEach((custom_error) => {
          // We're going to dispatch the error (that is an ApiErrorHandler object) to the store, that will be used by the component in charge of displaying the error
          this.$store.dispatch('showError', custom_error)
        })

        console.log(this.$store.state.errors_api_handler)

      });
    },
    getMovie: function (id) {
      let movie_service = new MovieService();
      movie_service.getMovie(id).then((movie) => {
        this.movie = movie;
        this.updateMovieInStore(this.movie)
      }).catch((err) => {
        console.log(err)
      });
    },
    updateMovieInStore: function (movie) {
      this.$store.dispatch('updateMovie', movie);
    }

  }
}
</script>

<style scoped>

</style>