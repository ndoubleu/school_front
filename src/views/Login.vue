<template>
<div class="flex justify-center align-middle h-full">
    <form @submit.prevent="submit" class="flex flex-col">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <input v-model="data.username" type="text" class="form-control" placeholder="Email" required>

      <input v-model="data.password" type="password" class="form-control" placeholder="Password" required>

      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Sign in</button>
    </form>
</div>
</template>

<script lang="ts">
import {reactive, defineComponent} from 'vue';
import {useRouter} from "vue-router";
import { useStore } from "vuex";

export default defineComponent(
  {
    name: "Login",
    setup() {
      const data = reactive({
        username: '',
        password: ''
      });
      const router = useRouter();
      const store = useStore();
      const submit = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          if (response.ok) {
            const content = await response.json();
            store.dispatch('setAuth', {
              authenticated: true,
              user: content.user,
              token: content.access
            });
            await router.push('/');
          } else {
            console.error('Authentication failed');
          }
        } catch (error) {
          console.error('Error occurred while logging in:', error);
        }
      }

      return {
        data,
        submit
      }
    }
  }
)
</script>