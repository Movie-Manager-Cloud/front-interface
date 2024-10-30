import Vue from 'vue'
import Vuex from 'vuex'
import MoviesService from "@/services/MovieService";
import hash from 'object-hash';
import { _ } from 'core-js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    all_movies: [], // List of MovieModel objects
    errors_api_handler: [], // List of ApiErrorHanler objects
  },
  getters: {
    getMovie: (state) => (id) => {
      return state.all_movies.find(movie => movie.id === id)
    },

    get_all_movies: (state) => {
      return state.all_movies;
    },

    getBadRequestErrors: (state) => (attribute) => {
      /*
      Get a list of the errors object for a specific attribute. 
      
      The function will try to find in every ApiErrorHanler object those who are BadRequest type (Api400Handler), 
      and then will try to find the error message for the specific attribute.

      Return a list of Api400Handler objects if find any, otherwise return an empty list.

      */
      const find_errors = state.errors_api_handler.filter(error => error.isBadRequest()).filter(error => error.hasErrorForAttribute(attribute));
      if (find_errors.length > 0)
        return find_errors;

      return [];
    },
  },
  mutations: {
    setMovies(state, movies) {
      state.all_movies = movies
    },

    updateMovie(state, movie) {
      const existsAtIndex = state.all_movies.findIndex(m => m.id === movie.id)
      if (existsAtIndex !== -1) {
        state.all_movies[existsAtIndex] = movie
      } else {
        state.all_movies.push(movie)
      }
    },

    getMovie(state, id) {
      return state.all_movies.find(item => item.id === id)
    },

    addError(state, error) {
      /*
        Add in the state an ApiErrorHanler object, if it doesn't already exists.
        If the error already exists, we update the error object.

      */
      if (state.errors_api_handler.length === 0) {
        state.errors_api_handler.push(error)
        return
      }
      let find = false;
      Object.entries(state.errors_api_handler).forEach(([key, value]) => {
        if (value.equalsTo(error)) {
          console.log("Equals")
          find = true;
        }
      });

      if (!find) {
        state.errors_api_handler.push(error)
      }
    },
    removeError(state, error) {
      console.log(error)
      /*
        Remove in the state an ApiErrorHanler object, if it exists.
      */
      if (state.errors_api_handler.length === 0) {
        return
      }
      Object.entries(state.errors_api_handler).forEach(([key, value]) => {
        if (value.equalsTo(error)) {
          console.log(error)
          state.errors_api_handler.splice(key, 1);
        }
      });
    }
  },
  actions: {
    updateListMovie({ commit }, movie_list) {
      movie_list.forEach(movie => {
        commit('updateMovie', movie)
      })
    },
    updateMovie({ commit }, movie) {
      commit('updateMovie', movie)
    },
    showError({ commit }, apiErrorHandlerObject) {
      commit('addError', apiErrorHandlerObject)
    },
    unshowError({ commit }, apiErrorHandlerObject) {
      console.log("Unshow error")
      commit('removeError', apiErrorHandlerObject)
    },
  },

  modules: {
  },

})
