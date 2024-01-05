<script setup lang="tsx">
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

const isClosed = defineModel<boolean>();

const [DefineItems, ReuseItems] = createReusableTemplate<{ items: Route[] }>();
const [DefineItem, ReuseItem] = createReusableTemplate<{ item: Route, open?: boolean }>();

const ui = /*ui*/ {
  item: {
    "padding": "pb-1.5 pl-4"
  }
}
</script>

<template>
  <DefineItem v-slot="{ item, open }">
    <UButton
      :leadingIcon="item.icon"
      :label="!isClosed ? item.label : ''"
      :to="item.to"
      square
      variant="ghost"
      size="lg"
      class="w-full"
    >
      <template 
        v-if="item.children"
        #trailing
      >
        <UIcon 
          name="i-mdi-chevron-down"
          class="ml-auto transition-transform"
          :class="{ 'rotate-90': open }"
        />
      </template>
    </UButton>
  </DefineItem>

  <DefineItems v-slot="{ items }">
    <ul>
      <li 
        v-for="item in items" 
        :key="item.label"
      >
        <UAccordion 
          v-if="item.children" 
          :items="[{}]" 
          :ui="ui"
        >
          <template #default="{ open }">
            <ReuseItem 
              :item="item" 
              :open="open"
            />
          </template>

          <template #item>
            <ReuseItems 
              v-if="item.children" 
              :items="item.children"
            />
          </template>
        </UAccordion>
        <ReuseItem 
          v-else 
          :item="item"
        />
      </li>
    </ul>
  </DefineItems>

  <nav class="flex flex-col justify-center h-full bg-neutral-950 p-4">
    <ReuseItems :items="items" />
  </nav>
</template>
