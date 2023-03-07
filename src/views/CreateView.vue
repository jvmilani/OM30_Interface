<template>
  <div class="about">
    <PatientForm type="create"/>
  </div>
</template>

<script>

import PatientForm from '@/components/PatientForm.vue'

export default {
  name: 'CreateView',
  components: {
    PatientForm
  }
}
</script>