<template>
  <b-row>
    <b-col cols="sm-6">
      <UpdateAvatarForm class="mt-5" />
    </b-col>
    <b-col cols="sm-6">
      <UpdateAccountInfoForm class="mt-5" />
    </b-col>
    <div class="w-100 mt-5"></div>
    <b-col cols="sm-6">
      <DeleteAvatarForm class="mb-5" />
    </b-col>
    <b-col cols="sm-6">
      <DeleteAccountForm class="mb-5" />
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
