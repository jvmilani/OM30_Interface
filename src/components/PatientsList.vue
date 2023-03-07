<template>
  <div class="container">

    <div class="container row py-4 mb-3">
      <div class="col-md-8">
        <input type="text" class="form-control md-3" id="search" name="search" @change="handleSearch" :value="search"
          placeholder="Filtrar por nome:">
      </div>
      <div class="col-md-4">
        <button class="btn btn-primary" @click="getPatients(search)">Pesquisar</button>
      </div>
    </div>

    <div v-for="patient in patients" :key="patient.id">
      <div class="row">
        <div class="col-6 py-2">
          <router-link :to="{ name: 'Patient', params: { id: patient.id } }">
            {{ patient.Name }}
          </router-link>
        </div>

        <div class="col-3 py-2">
          <router-link :to="{ name: 'edit', params: { id: patient.id } }">
            Edit
          </router-link>
        </div>

        <div class="col-3 py-2">
          <button type="button" class="btn btn-danger" @click="onDelete(patient.id)">X</button>
        </div>
        <hr>

      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li v-for="page in pages" :key="page.label" class="page-item"><input type="button" class="page-link" @click="changePage" :value="page.label"></li>
      </ul>
    </nav>
  </div>
</template>
<script>

import axios from "axios";

export default {
  name: 'PatientsList', 
  data() {
    return {
      page: 1,
      patients: [],
      pages: [],
      patientData: {},
      search: null
    };
  },

  mounted() {
    axios.get(`http://localhost:8000/api/patient?page=${this.page}`)
      .then((response) => {
        this.patients = response.data.data;
        this.pages = response.data.links;
      })
  },
  methods: {
    getPatients(search = null) {
      let url = '';
      if (search == null || search == '')
        url = `http://localhost:8000/api/patient?page=${this.page}`
      else
        url = `http://localhost:8000/api/patient/search/${search}`
      axios.get(url)
        .then((response) => {
          this.patients = response.data.data;
        })
    },
    changePage(event){
      this.page = event.target.value;
      this.getPatients();
    },
    onDelete(id) {
      axios.delete(`http://localhost:8000/api/patient/${id}`)
        .then(() => this.getPatients());
    },
    async handleSearch(event) {
      this.search = event.target.value;
    }
  },
  props: {
    msg: String
  }
}
</script>

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

input, a {
  color: #42b983;
}
</style>
