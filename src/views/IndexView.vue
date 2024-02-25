<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(async () => {
  try {
    const res = await fetch('http://dummy.com/api');
    const usersRes = await fetch('http://dummy.com/users');

    const json = await res.json();
    const usersJson = await usersRes.json();

    data.value = json.message;
    users.value = usersJson.users.length > 0 ? usersJson.users : undefined;
  } catch {
    data.value = 'Error!';
  }
})

const data = ref();
const users = ref();
</script>
<template>
  <main>
    <table v-if="users" id="users">
      <th>
        <td>ID</td>
        <td>Username</td>
        <td>Name</td>
        <td>Country</td>
        <td>Phone Number</td>
      </th>
      <tr :key="user.id" v-for="user in users">
        <td data-cy="id">{{ user.id }}</td>
        <td data-cy="username">{{ user.username }}</td>
        <td data-cy="name">{{ user.name }}</td>
        <td data-cy="country">{{ user.country }}</td>
        <td data-cy="phoneNumber">{{ user.phoneNumber }}</td>
      </tr>
    </table>
    <div id="data">{{ data }}</div>
  </main>
</template>
