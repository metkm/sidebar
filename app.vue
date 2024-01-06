<script setup lang="ts">
const items = [
  {
    label: 'To Settings',
    icon: 'i-mdi-account-circle-outline',
    children: [
      {
        label: 'User',
        icon: 'i-mdi-brain'
      }
    ]
  },
  {
    label: 'Some Actions',
    icon: 'i-mdi-turkey',
    to: '/settings',
    click: () => {
      console.log('some action')
    }
  }
]

const isClosed = ref(false);
</script>

<template>
  <div class="flex h-screen">
    <Sidebar v-model="isClosed" :items="items" />
    
    <main class="grow p-4">
      <p>main content</p>

      <UButton @click="isClosed = !isClosed">Toggle</UButton>

      <NuxtPage />
    </main>
  </div>
</template>
