<template>
    <div class="container">
      <h1>{{info.Name}}</h1>
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{info.Name}}</h5>
                    <p class="card-text">{{info.CPF}}</p>
                    <p class="card-text">{{info.CNS}}</p>
                    <p class="card-text"><small class="text-muted">Last updated {{info.updated_at}}</small></p>
                </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PatientInfo',

    data() {
        return {
        info: []
        };
    },

    mounted() {
        fetch(`http://localhost:8000/api/patient/${this.$route.params.id}`)
        .then( response => response.json())
        .then((data) => {
        this.info = data;
        })
    },

  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  