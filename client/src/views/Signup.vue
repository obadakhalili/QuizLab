<template>
  <form @submit.prevent="signup">
    <b-form-group>
      <h3>Sign up</h3>
      <label>Name</label>
      <b-input
        v-model="firstname"
        class="mb-2"
        placeholder="Firstname"
      ></b-input>
      <b-input v-model="lastname" placeholder="Lastname"></b-input>
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
        await API.signup({
          name: `${this.firstname} ${this.lastname}`,
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("updateAlerts", {
          message: `${this.firstname}, Welcome to Quizlab! You will be redirected in a second`,
          color: "success"
        });
        setTimeout(() => {
          this.$store.dispatch("updateAlerts", []);
          this.$router.push("/dashboard");
        }, 1000);
      } catch (errors) {
        this.$store.dispatch(
          "updateAlerts",
          errors.map(e => {
            return {
              message: e,
              color: "danger"
            };
          })
        );
      }
    }
  }
};
</script>
