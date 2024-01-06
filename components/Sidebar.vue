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

const isClosed = defineModel<boolean>({ default: false });

const [DefineItems, ReuseItems] = createReusableTemplate<{ items: Route[] }>();
const [DefineItem, ReuseItem] = createReusableTemplate<{ item: Route, open?: boolean }>();

const ui = computed(() => ({
  item: {
    padding: `pb-0 ${!isClosed.value && 'pl-4'}`
  }
}))
</script>

<template>
  <DefineItem v-slot="{ item, open }">
    <UButton
      :leadingIcon="item.icon"
      :label="!isClosed ? item.label : ''"
      :to="item.to"
      square
      variant="ghost"
      size="xl"
      class="w-full"
      activeClass="bg-primary-900 text-white"
    >
      <template 
        v-if="item.children && !isClosed"
        #trailing
      >
        <UIcon 
          name="i-mdi-chevron-down"
          class="ml-auto transition-transform text-lg"
          :class="{ 'rotate-90': open }"
        />
      </template>
    </UButton>
  </DefineItem>

  <DefineItems v-slot="{ items }">
    <ul class="space-y-1.5">
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

  <nav
    class="flex flex-col justify-around h-full bg-neutral-950 p-4"
    :class="{ 'min-w-56': !isClosed }"
  >
    <UAccordion class="md:hidden" :items="[{}]">
      <template #default="{ open }">
        <div class="flex w-full">
          <UButton
            @click="isClosed = open"
            variant="ghost" 
            icon="i-mdi-menu"
            class="ml-auto"
          />
        </div>
      </template>
        
      <template #item>
        <ReuseItems :items="items" />
      </template>
    </UAccordion>
    <ReuseItems class="hidden md:block" :items="items" />

    <UButton 
      @click="isClosed = !isClosed" 
      icon="i-mdi-chevron-right"
      class="hidden md:flex justify-center"
    />
  </nav>
</template>
