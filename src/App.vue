<template>
  <v-app>
    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  },

  data() {
    return {

    }
  },
  methods: {
    toLogin() {
      alert("login");
    },
  toRegister() {
    alert("regi");
  }
  }
};
</script>
