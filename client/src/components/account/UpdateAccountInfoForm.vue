<template>
  <form @submit.prevent="updateAccount" class="mx-auto">
    <h3>Account Info</h3>
    <b-form-group>
      <label>Name</label>
      <b-input
        v-model="userFirstname"
        class="mb-2"
        placeholder="First name"
      ></b-input>
      <b-input v-model="userLastname" placeholder="Last name"></b-input>
    </b-form-group>
    <b-form-group>
      <label>Email</label>
      <b-input
        v-model="userEmail"
        type="email"
        placeholder="Enter a new email"
      ></b-input>
    </b-form-group>
    <b-form-group>
      <label>Password</label>
      <b-input
        v-model="passwordInput"
        type="password"
        placeholder="Enter a new password"
      ></b-input>
    </b-form-group>
    <b-button type="submit" variant="success">Update</b-button>
  </form>
</template>

<script>
import API from "@/api";

export default {
  name: "UpdateAccountInfoForm",
  data() {
    return {
      firstnameInput: this.$store.getters.userField("firstname") ?? "",
      lastnameInput: this.$store.getters.userField("lastname") ?? "",
      emailInput: this.$store.getters.userField("email") ?? "",
      passwordInput: ""
    };
  },
  computed: {
    userFirstname: {
      get() {
        return this.$store.getters.userField("firstname");
      },
      set(value) {
        this.firstnameInput = value;
      }
    },
    userLastname: {
      get() {
        return this.$store.getters.userField("lastname");
      },
      set(value) {
        this.lastnameInput = value;
      }
    },
    userEmail: {
      get() {
        return this.$store.getters.userField("email");
      },
      set(value) {
        this.emailInput = value;
      }
    }
  },
  watch: {
    userFirstname(newValue) {
      this.firstnameInput = newValue;
    },
    userLastname(newValue) {
      this.lastnameInput = newValue;
    },
    userEmail(newValue) {
      this.emailInput = newValue;
    }
  },
  methods: {
    async updateAccount() {
      try {
        const {
          data: { userIsModified, user }
        } = await API("/user", "patch", {
          name: `${this.firstnameInput} ${this.lastnameInput}`,
          email: this.emailInput,
          password: this.passwordInput || undefined
        });
        if (userIsModified) {
          this.$store.dispatch("updateUserInfo", user);
          this.$store.dispatch("updateAlerts", {
            message: "Updates were taken",
            color: "success"
          });
        } else {
          this.$store.dispatch("updateAlerts", {
            message: "No updates made",
            color: "info"
          });
        }
      } catch (e) {
        this.$store.dispatch(
          "updateAlerts",
          e.response.data.errors.map(e => {
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
