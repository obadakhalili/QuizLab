<template>
  <div>
    <UpdateAvatarForm class="mb-5" />
    <DeleteAvatarForm class="mb-5" />
    <UpdateAccountInfoForm class="mb-5" />
    <DeleteAccountForm class="mb-5" />
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
