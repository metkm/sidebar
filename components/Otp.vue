<script setup lang="ts">
const props = defineProps<{
  count: number
}>();

const inputElements = ref<HTMLInputElement[]>([]);
const currentIndex = ref(0);

const modelValue = defineModel<string>();

const valuesArray = ref<string[]>(
  Array(props.count).fill(undefined)
);

const changeFocus = (index: number) => {
  const element = inputElements.value?.[index];
  element?.focus();
}

const onInput = (index: number) => {
  currentIndex.value = Math.max(0, Math.min(props.count - 1, index));

  const value = valuesArray.value[currentIndex.value];
  console.log(value, currentIndex.value);
  
  if (!value) {
    changeFocus(currentIndex.value - 1);
  } else {
    changeFocus(currentIndex.value + 1);
  }

  modelValue.value = valuesArray.value.join("");
}
</script>

<template>
  <div class="flex gap-2">
    <p>{{ currentIndex }} {{ valuesArray }}</p>
    <input 
      ref="inputElements"
      v-for="(i, index) in count"
      :key="i"
      v-model="valuesArray[index]"
      class="w-10 h-10 rounded-lg"
      @input="onInput(index)"
      maxlength="1"
    />
  </div>
</template>
