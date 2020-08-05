<template>
  <b-row>
    <b-col md="6">
      <UpdateAvatarForm />
      <DeleteAvatarForm class="my-5" />
      <DeleteAccountForm class="mb-5" />
    </b-col>
    <b-col md="6">
      <UpdateAccountInfoForm class="mb-5" />
    </b-col>
  </b-row>
</template>

<script>
import UpdateAvatarForm from "@/components/Account/UpdateAvatarForm";
import DeleteAvatarForm from "@/components/Account/DeleteAvatarForm";
import UpdateAccountInfoForm from "@/components/Account/UpdateAccountInfoForm";
import DeleteAccountForm from "@/components/Account/DeleteAccountForm";

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
