<template>
  <div>
    <form @submit.prevent="updateAvatar" class="mt-5 mx-auto">
      <h3>Update Avatar</h3>
      <b-form-file v-model="avatar" class="mt-2 mb-2"></b-form-file>
      <b-button type="submit" variant="secondary">
        <b-spinner v-if="avatarIsUpdating" label="Spinning" small></b-spinner>
        <span v-if="!avatarIsUpdating">Upload</span>
      </b-button>
      <small class="float-right">
        1.5 mb maximum, and .png, .jpg or .jpeg only
      </small>
    </form>
    <hr />
    <form @submit.prevent="deleteAvatar" class="mx-auto">
      <h3>Delete Your Avatar</h3>
      <b-button type="submit" variant="danger">Delete</b-button>
    </form>
    <hr />
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
        <b-input v-model="userEmail" placeholder="Enter a new email"></b-input>
      </b-form-group>
      <b-form-group>
        <label>Password</label>
        <b-input
          v-model="passwordInput"
          type="password"
          placeholder="Enter a new password"
        ></b-input>
      </b-form-group>
      <b-button type="submit" variant="success">Edit</b-button>
    </form>
    <hr />
    <form @submit.prevent="deleteAccount" class="mx-auto mb-3">
      <h3>Delete Your Account</h3>
      <b-button type="submit" variant="danger">Delete</b-button>
    </form>
  </div>
</template>

<script>
import API from "@/api";
import { startLogoutProcess } from "@/helpers";

export default {
  name: "Account",
  data() {
    return {
      avatar: null,
      avatarIsUpdating: false,
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
    async updateAvatar({ submitter }) {
      this.avatarIsUpdating = true;
      submitter.disabled = true;
      const formData = new FormData();
      formData.set("avatar", this.avatar);
      try {
        await API("/user/avatar", "post", formData);
        this.$store.dispatch("updateAlerts", {
          message: "Photo uploaded successfully",
          color: "success"
        });
      } catch (e) {
        this.$store.dispatch("updateAlerts", {
          message: e.response.data,
          color: "danger"
        });
      } finally {
        this.avatarIsUpdating = false;
        submitter.disabled = false;
      }
    },
    async deleteAvatar() {
      try {
        const { data: message } = await API("/user/avatar", "delete");
        this.$store.dispatch("updateAlerts", {
          message,
          color: "success"
        });
      } catch (e) {
        this.$store.dispatch("updateAlerts", {
          message: e.response.data,
          color: "danger"
        });
      }
    },
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
            message: "Updates were talen",
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
    },
    async deleteAccount() {
      try {
        await API("/user", "delete");
        startLogoutProcess();
      } catch (e) {
        this.$store.dispatch("updateAlerts", {
          message: e.response.data,
          color: "danger"
        });
      }
    }
  }
};
</script>
