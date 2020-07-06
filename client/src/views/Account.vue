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
          v-model="firstname"
          class="mb-2"
          placeholder="First name"
        ></b-input>
        <b-input v-model="lastname" placeholder="Last name"></b-input>
      </b-form-group>
      <b-form-group>
        <label>Email</label>
        <b-input v-model="email" placeholder="Enter a new email"></b-input>
      </b-form-group>
      <b-form-group>
        <label>Password</label>
        <b-input
          v-model="password"
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

export default {
  name: "Account",
  async created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.firstname = user?.firstname;
    this.lastname = user?.lastname;
    this.email = user?.email;
  },
  data() {
    return {
      avatar: null,
      avatarIsUpdating: false,
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async updateAvatar() {
      this.avatarIsUpdating = true;
      const formData = new FormData();
      formData.set("avatar", this.avatar);
      try {
        await API("/user/avatar", "post", formData);
        this.$store.dispatch("updateAlerts", {
          message: "Photo uploaded successfully",
          color: "success"
        });
      } catch ({ response: { data: message } }) {
        this.$store.dispatch("updateAlerts", {
          message,
          color: "danger"
        });
      } finally {
        this.avatarIsUpdating = false;
      }
    },
    async deleteAvatar() {
      try {
        const { data: message } = await API("/user/avatar", "delete");
        this.$store.dispatch("updateAlerts", {
          message,
          color: "success"
        });
      } catch ({ response: { data: message } }) {
        this.store.$dispatch("updateAlerts", {
          message,
          color: "danger"
        });
      }
    },
    async updateAccount() {
      // ...
      try {
        const { data: message } = await API("/user", "patch", {
          name: `${this.firstname} ${this.lastname}`,
          email: this.email,
          password: this.password || undefined
        });
        this.$store.dispatch("updateAlerts", {
          message,
          color: "info"
        });
      } catch ({
        response: {
          data: { errors }
        }
      }) {
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
    },
    async deleteAccount() {
      try {
        await API("/user", "delete");
        await API("/user/logout", "get");
        localStorage.removeItem("user");
        this.$router.push("/login");
      } catch {
        this.$store.dispatch("updateAlerts", {
          message: "Internal Server Error",
          color: "danger"
        });
      }
    }
  }
};
</script>
