<template>
    <div class="about">
      <PatientForm type="edit"/>
    </div>
  </template>
  
  <script>
  
  import PatientForm from '@/components/PatientForm.vue'
  
  export default {
    name: 'EditView',
    components: {
      PatientForm
    }
  }
  </script>