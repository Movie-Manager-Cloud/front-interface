import Vue from 'vue';
<template>

  <div>

    <v-text-field v-model="grade" label="Rating" type="number" min="1" max="5" required>
    </v-text-field>

    <div v-for="error in $store.getters.getBadRequestErrors('grade')">
      <v-alert type="error" border="left" elevation="10" color="red" dismissible>
        {{ error.getErrorMessage() }}
        <!--  Close slot for custom close behavior -->
        <template v-slot:close="{ toogle }">
          <v-btn icon small @click="$store.dispatch('unshowError', error)">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </template>
      </v-alert>
    </div>
    <v-btn color="success" class="mt-5" @click="emitReview">Ajouter la note </v-btn>


  </div>



</template>

<script>

export default {
  name: "AddReview",
  props: [],
  data: () => ({
    grade: null
  }),
  methods: {
    emitReview() {
      this.$emit('review-submitted', this.grade)
      //Unshow the error for the grade field
      this.$store.getters.getBadRequestErrors('grade').forEach(error => {
        this.$store.dispatch('unshowError', error)
      })
    },
  }

}
</script>

<style scoped>

</style>