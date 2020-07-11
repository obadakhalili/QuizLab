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
import UpdateAvatarForm from "@/components/account/UpdateAvatarForm.vue";
import DeleteAvatarForm from "@/components/account/DeleteAvatarForm.vue";
import UpdateAccountInfoForm from "@/components/account/UpdateAccountInfoForm.vue";
import DeleteAccountForm from "@/components/account/DeleteAccountForm.vue";

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
