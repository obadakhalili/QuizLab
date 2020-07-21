<template>
  <form @submit.prevent="login" class="mt-5 mb-3 mx-auto">
    <h3>Log In</h3>
    <b-form-group>
      <label>Email</label>
      <b-input
        v-model="email"
        type="email"
        placeholder="Enter your email"
      ></b-input>
    </b-form-group>
    <b-form-group>
      <label>Password</label>
      <b-input
        v-model="password"
        type="password"
        placeholder="Enter your password"
      ></b-input>
    </b-form-group>
    <b-button type="submit" variant="success">
      Log in
    </b-button>
    <b-link to="/signup" class="float-right">Sign up</b-link>
  </form>
</template>

<script>
import API from "@/api";

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        await API("/users/login", "post", {
          email: this.email,
          password: this.password
        });
        this.$router.push("/quizzes");
      } catch ({ response: { data: message } }) {
        this.$store.dispatch("updateAlerts", {
          message,
          color: "danger"
        });
      }
    }
  }
};
</script>
