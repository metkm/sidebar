<script setup lang="ts">
import { UserServices } from "~/services/UserServices";

const { data: user, execute: getUser, status, isLoading } = await UserServices.getUser({
  immediate: false
});

const { data: newUser, execute: updateUser, isLoading: updateUserLoading } = await UserServices.updateUser({
  immediate: false,
  body: {
    name: 'deneme'
  }
})

// const { data: user, execute: getUser, status } = await useAsyncData(() => UserServices.getUser(), {
//   immediate: false
// })
</script>

<template>
  <div>
    <p>home page</p>
    <p>{{ newUser }}</p>
    <UButton @click="updateUser" :loading="updateUserLoading">Fetch</UButton>
  </div>
</template>
