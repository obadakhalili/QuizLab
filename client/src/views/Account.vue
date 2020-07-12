<template>
  <div>
    <UpdateAvatarForm />
    <hr />
    <DeleteAvatarForm />
    <hr />
    <UpdateAccountInfoForm />
    <hr />
    <DeleteAccountForm />
  </div>
</template>

<script>
import UpdateAvatarForm from "@/components/Account/UpdateAvatarForm.vue";
import DeleteAvatarForm from "@/components/Account/DeleteAvatarForm.vue";
import UpdateAccountInfoForm from "@/components/Account/UpdateAccountInfoForm.vue";
import DeleteAccountForm from "@/components/Account/DeleteAccountForm.vue";

export default {
  name: "Account",
  components: {
    UpdateAvatarForm,
    DeleteAvatarForm,
    UpdateAccountInfoForm,
    DeleteAccountForm
  }
};
</script>
