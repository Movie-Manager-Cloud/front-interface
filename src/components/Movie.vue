import Vue from 'vue';
<template>

  <div>

    <div v-for="item in items">
      <v-list-item item.listItemPosition>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>

            <div class="d-flex">
              <v-text-field
                  v-model="movie[item.localProp]"
                  append-icon="mdi-validate"
                  label=""
                  single-line
                  :disabled=item.disabled
              >
              </v-text-field>
              <v-btn v-if="!item.disabled" dark small color="green"
                     @click="emitMovieDetailsUpdate(item.apiProp,movie[item.localProp])">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </div>


          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </div>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Acteurs</v-list-item-title>
        <v-list-item-subtitle>
          <v-text-field
              v-model="movie.getAllFullNameActors()"
              label=""
              single-line
              disabled
          >
          </v-text-field>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>


  </div>


</template>

<script>
export default {
  name: "Movie",
  props: ['movie'],
  data: () => ({
    items: [
      {
        title: 'Title',
        icon: 'mdi-view-dashboard',
        localProp: 'title',
        apiProp: 'title',
        listItemPosition: 'one-line',
        disabled: true
      },
      {
        title: 'Description',
        icon: 'mdi-view-dashboard',
        localProp: 'description',
        apiProp: 'description',
        listItemPosition: 'two-line'
      },
      {
        title: 'Average Grade',
        icon: 'mdi-view-dashboard',
        localProp: 'averageGrade',
        listItemPosition: 'three-line',
        disabled: true
      },
    ],
  }),
  created() {
  },
  methods: {
    emitMovieDetailsUpdate: function (name, value) {
      this.$emit('movie-details-update', {'name': name, 'value': value});
    }
  },


}
</script>

<style scoped>

</style>