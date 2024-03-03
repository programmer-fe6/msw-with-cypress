<script setup lang="ts">
import type { TableColumn } from 'node_modules/tsv2-library/dist/components/v2/DataTable/DataTable.vue'
import { TSDataTable } from 'tsv2-library'
import { onMounted, ref } from 'vue'

onMounted(async () => {
  await fetchUsers()
})

const fetchUsers = async () => {
  try {
    const usersRes = await fetch('https://dummy.com/users')
    const usersJson = await usersRes.json()

    users.value = usersJson.users.length > 0 ? usersJson.users : undefined
  } catch {
    users.value = undefined
  }
}

const users = ref()
const totalRecords = ref<number>(0)

const columns: TableColumn[] = [
  {
    field: 'name',
    header: 'Name'
  },
  {
    field: 'username',
    header: 'Username'
  },
  {
    field: 'phoneNumber',
    header: 'Phone Number'
  },
  {
    field: 'country',
    header: 'Country'
  },
]
</script>
<template>
  <main>
    <TSDataTable
      :data="users"
      :columns="columns"
      :rows="totalRecords"
      :fetch-function="fetchUsers"
    />
  </main>
</template>
