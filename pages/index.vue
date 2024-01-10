<script setup lang="ts">
import { object, lazy, string, type InferType, type ObjectSchema, Schema, StringSchema, type ISchema } from "yup";
import { UserServices } from "~/services/UserServices";

// const { data: user, execute: getUser, status, isLoading } = await UserServices.getUser({
//   immediate: false
// });

const { data: newUser, execute: updateUser, isLoading: updateUserLoading } = await UserServices.updateUser({
  immediate: false,
  body: {
    name: 'deneme'
  }
})

const getDynamicSchema = <T extends Schema>(keyValue: T) => {
  const lazySchema = lazy((value) => {
    let newResult = Object.keys(value).reduce((acc, key) => {
      acc[key] = keyValue;
      return acc
    }, {} as Record<string, T>);

    return object(newResult)
  })

  return lazySchema
}

const result = getDynamicSchema(string().required());
type Result = InferType<typeof result>;
  
const validated = result.validateSync({ title: 'Title' });
console.log(validated)
</script>

<template>
  <div>
    <p>home page</p>
    <p>{{ newUser }}</p>
    <UButton @click="updateUser" :loading="updateUserLoading">Fetch</UButton>
  </div>
</template>
