<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="6">
        <v-card class="elevation-5">
          <v-toolbar dark color="primary" class="elevation-1">
              <v-toolbar-title>
                  LOGIN
              </v-toolbar-title>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card class="elevation-1">
              <v-card-text>
              <v-text-field label="ID" v-model="loginId"></v-text-field>
              <v-text-field label="PWD" v-model="loginPwd"></v-text-field>
              </v-card-text>
              <v-card-actions>
                  <v-btn @click="toLogin">login</v-btn>
              </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { $login } from "@/api/auth"
export default {
    data() {
        return {
        
            loginId: null,
            loginPwd: null,
            
        }
    },
    methods: {
        async toLogin() {
            let loginInfo = {
                loginId : this.loginId,
                loginPwd : this.loginPwd,
            }
            try {
                await $login(loginInfo);
            } catch(error) {
            console.log("login ", error);
            }
            
        }
    }

};
</script>

<style lang="scss" scoped></style>
