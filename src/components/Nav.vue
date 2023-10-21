<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
          <li class="nav-item">
            <a href="#" class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import router from '@/router';
import {computed} from 'vue';
import {useStore} from "vuex";

export default {
  name: "Nav",
  setup() {
    const store = useStore();

    const auth = computed(() => store.state.authenticated)

    const logout = async () => {
      store.dispatch('logout');
      router.push('/login');
    }

    return {
      auth,
      logout
    }
  }
}
</script>
