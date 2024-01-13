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

watch(valuesArray.value, () => {
  modelValue.value = valuesArray.value.join("");
})

const changeFocus = (index: number) => {
  inputElements.value[index]?.focus();
}

const onKeydown = (event: KeyboardEvent, index: number) => {
  switch (event.code) {
    case "Backspace":
      currentIndex.value = Math.max(0, Math.min(valuesArray.value.length, index - 1));
      changeFocus(currentIndex.value);
      break;
    default:
      currentIndex.value = Math.max(0, Math.min(valuesArray.value.length, index + 1));
      changeFocus(currentIndex.value);
      break;
  }
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
      @keyup="onKeydown($event, index)"
      maxlength="1"
    />
  </div>
</template>
