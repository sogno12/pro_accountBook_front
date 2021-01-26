<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="6" md="4">
        <v-card class="elevation-5">
          <v-toolbar dark color="primary" class="elevation-1">
            <v-toolbar-title>
              REGISTER
            </v-toolbar-title>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card class="elevation-1">
            <v-card-text>
              <ValidationObserver ref="registerFormObserver">
                <v-form ref="registerForm" autocomplete="off" lazy-validation>
                  <up-text-field
                    label="ID"
                    v-model="form.loginId"
                    :rules="rules.loginId"
                  ></up-text-field>
                  <up-text-field
                    label="User Name"
                    v-model="form.userName"
                    :rules="rules.userName"
                  ></up-text-field>
                  <up-text-field
                    label="New PWD"
                    v-model="form.loginPwd"
                    :rules="rules.loginPwd"
                    vid="chekPwd"
                  ></up-text-field>
                  <up-text-field
                    label="Check PWD"
                    v-model="form.checkPwd"
                    :rules="rules.checkPwd"
                  ></up-text-field>
                  <up-text-field
                    label="EMAIL"
                    v-model="form.email"
                    :rules="rules.email"
                  ></up-text-field>
                </v-form>
              </ValidationObserver>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :to="UP_PAGE.LOGIN" text
                >Back To Login</v-btn
              >
              <v-btn color="primary" @click="register">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UpTextField from "@/components/base/UpTextField.vue";
import { ValidationObserver } from "vee-validate";
import { $singUp } from "@/api/auth";
export default {
  components: { UpTextField, ValidationObserver },
  data() {
    return {
      form: {
        loginId: null,
        loginPwd: null,
        userName: null,
        checkPwd: null,
        email: null,
      },
      rules: {
        loginId: {
          required: true,
        },
        userName: {
          required: true,
        },
        loginPwd: {
          required: true,
          confirmed: "chekPwd",
        },
        checkPwd: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
    };
  },
  methods: {
    async register() {
      const invalid = await this.$refs.registerFormObserver.validate();
      if (invalid) {
        let registerInfo = {
          loginId: this.form.loginId,
          userName: this.form.userName,
          loginPwd: this.form.loginPwd,
          email: this.form.email,
        };

        console.log("re", registerInfo);

        try {
          await $singUp(registerInfo);
        } catch (error) {
          console.log("registerInfo ", error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
