<template>
  <div class="home">
    <PatientsList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PatientsList from '@/components/PatientsList.vue'

export default {
  name: 'HomeView',
  components: {
    PatientsList
  }
}
</script>
