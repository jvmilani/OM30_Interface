<template>
    <div class="home">
        <PatientInfo/>
    </div>
  </template>
  
  <script>
  import PatientInfo from '@/components/PatientInfo.vue'
  
  export default {
    name: 'PatientView',
    components: {
        PatientInfo
    }
  }
  </script>