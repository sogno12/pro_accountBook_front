<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="6" md="4">
        <v-card class="elevation-5">
          <v-toolbar dark color="primary" class="elevation-1">
            <v-toolbar-title>
              LOGIN
            </v-toolbar-title>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card class="elevation-1">
            <v-card-text>
              <ValidationObserver ref="loginFormObserver">
                <v-form ref="loginForm" autocomplete="off" lazy-validation>
                  <up-text-field
                    label="ID"
                    v-model="loginId"
                    :rules="rules.loginId"
                  ></up-text-field>
                  <up-text-field
                    label="PWD"
                    v-model="loginPwd"
                    type="password"
                    :rules="rules.loginPwd"
                    @keyup.enter="login"
                  ></up-text-field>
                </v-form>
              </ValidationObserver>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :to="UP_PAGE.REGISTER" text
                >To SignUp</v-btn
              >
              <v-btn color="primary" @click="login">Login</v-btn>
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
import { $login } from "@/api/auth";
export default {
  components: { ValidationObserver, UpTextField },
  data() {
    return {
      loginId: null,
      loginPwd: null,
      rules: {
        loginId: {
          required: true,
        },
        loginPwd: {
          required: true,
        },
      },
    };
  },
  methods: {
    init() {
      this.loginId = null;
      this.loginPwd = null;
    },
    async login() {
      const invalid = await this.$refs.loginFormObserver.validate();
      if (invalid) {
        let loginInfo = {
          loginId: this.loginId,
          loginPwd: this.CryptoJS.SHA256(this.loginPwd).toString(this.CryptoJS.enc.Hex),
        };

        try {
          const { data } = await $login(loginInfo);

          // 인증 성공 시, 토큰값 저장
          this.authInfo = data.result;
          console.log("store"+ (this.$store));
          this.$store.dispatch("auth/setAuthorization", this.authInfo);

          // 메인페이지로 이동
            alert("home");
            this.$router.push(this.UP_PAGE.HOME).catch(()=>{});

        } catch (error) {
          this.init();
          alert("로그인 실패");
          console.log("login ", error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
