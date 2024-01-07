<script setup lang="ts">
import { UButton } from "#components";

interface Route {
  label: string;
  icon: string;
  to?: string;
  click?: () => void;
  children?: Route[];
}

defineProps<{
  items: Route[];
}>();

const isOpen = defineModel<boolean>({ default: false });

const [DefineItems, ReuseItems] = createReusableTemplate<{
  items: Route[];
  accordionOpen?: boolean;
}>();
const [DefineItem, ReuseItem] = createReusableTemplate<{
  item: Route;
  open?: boolean;
}>();

const ui = computed(() => ({
  item: {
    padding: `pb-0 ${isOpen.value && "pl-4"}`,
  },
}));
</script>

<template>
  <DefineItem v-slot="{ item, open }">
    <UButton
      :leadingIcon="item.icon"
      :to="item.to"
      square
      variant="ghost"
      size="xl"
      class="w-full transition-all"
      activeClass="bg-primary-900 text-white"
      :class="[isOpen || open ? 'container-open' : 'container-closed']"
    >
      <template #default>
        <div class="min-w-0 overflow-hidden transition-all">
          <p class="text-left truncate px-4">
            {{ item.label }}
          </p>
        </div>
      </template>

      <template v-if="item.children && isOpen" #trailing>
        <UIcon
          name="i-mdi-chevron-down"
          class="ml-auto transition-transform text-lg"
          :class="{ 'rotate-90': false }"
        />
      </template>
    </UButton>
  </DefineItem>

  <DefineItems v-slot="{ items, accordionOpen }">
    <ul class="space-y-1.5">
      <li v-for="item in items" :key="item.label">
        <UAccordion v-if="item.children" :items="[{}]" :ui="ui">
          <template #default>
            <ReuseItem :item="item" :open="accordionOpen" />
          </template>

          <template #item>
            <ReuseItems
              v-if="item.children"
              :items="item.children"
              :accordionOpen="accordionOpen"
            />
          </template>
        </UAccordion>
        <ReuseItem v-else :item="item" :open="accordionOpen" />
      </li>
    </ul>
  </DefineItems>

  <nav class="flex flex-col justify-around h-full bg-neutral-950 p-4">
    <!-- :class="{ 'min-w-56': isOpen }" -->
    <UAccordion class="md:hidden" :items="[{}]">
      <template #default>
        <div class="flex w-full">
          <UButton variant="ghost" icon="i-mdi-menu" class="ml-auto" />
        </div>
      </template>

      <template #item="{ open }">
        <ReuseItems :items="items" :accordionOpen="open" />
      </template>
    </UAccordion>
    <ReuseItems class="hidden md:block" :items="items" />

    <UButton @click="isOpen = !isOpen" class="hidden md:flex justify-center">
      <UIcon
        name="i-mdi-chevron-right"
        class="transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </UButton>
  </nav>
</template>

<style scoped>
.container-open {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  gap: 0;
}

.container-closed {
  display: grid;
  grid-template-columns: max-content 0fr max-content;
  gap: 0;
}
</style>
