<template>
  <form @submit.prevent="signup" class="mt-5 mb-3 mx-auto">
    <h3>Sign Up</h3>
    <b-form-group>
      <label>Name</label>
      <b-input
        v-model="firstname"
        class="mb-2"
        placeholder="First name"
      ></b-input>
      <b-input v-model="lastname" placeholder="Last name"></b-input>
      <small>
        Firstname and Lastname together shouldn't be more than 35 characters
        long
      </small>
    </b-form-group>
    <b-form-group>
      <label>Email</label>
      <b-input
        v-model="email"
        type="email"
        placeholder="Enter an email"
      ></b-input>
    </b-form-group>
    <b-form-group>
      <label>Password</label>
      <b-input
        v-model="password"
        type="password"
        placeholder="Enter a password"
      ></b-input>
      <small>At least 7 characters long</small>
    </b-form-group>
    <b-button type="submit" variant="primary">
      Sign up
    </b-button>
    <b-link to="/login" class="float-right">Log in</b-link>
  </form>
</template>

<script>
import API from "@/api";

export default {
  name: "Signup",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async signup() {
      try {
        await API("/user", "post", {
          name: `${this.firstname} ${this.lastname}`,
          email: this.email,
          password: this.password
        });
        this.$router.push("/login");
        this.$store.dispatch("updateAlerts", {
          message: `${this.firstname}, Welcome to Quizlab! Please login`,
          color: "info"
        });
      } catch (e) {
        this.$store.dispatch(
          "updateAlerts",
          e.response.data.map(message => {
            return {
              message,
              color: "danger"
            };
          })
        );
      }
    }
  }
};
</script>
