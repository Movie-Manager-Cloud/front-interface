<template>
  <v-app id="inspire">


    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Movie Manager
          </v-list-item-title>
          <v-list-item-subtitle>
            Choose an action
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <notificationGroup group="success">
        <div class="alert-box">
          <notification v-slot="{ notifications }">
            <div
              v-for="notification in notifications" :key="notification.id" >
              <v-alert type="success" :icon="notification.icon">{{ notification.text }}</v-alert>
            </div>
          </notification>
        </div>
      </notificationGroup>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'All Reviews', icon: 'mdi-view-dashboard', to: "/" },
      { title: 'About', icon: 'mdi-help-box', to: "/about" },
    ],
  }),
}
</script>

<style scoped>
.alert-box {
  margin: 20px;
  z-index: 999;
  position: absolute;
  top:0;
  right:0;

}
.v-alert {
  z-index : 999;
}
</style>