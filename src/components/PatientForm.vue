<template>
  <div class="container">
    <form class="row g-3" enctype="multipart/form-data">
      <div v-if="previewImage" class="col-md-4">
        <img class="container" :src="previewImage" alt="Foto do usuário" />
      </div>

      <div v-if="type == 'create'" class="col-md-4">
        <label for="Photo" class="form-label">Foto</label>
        <input type="file" class="form-control" id="Photo" name="Photo" @change="uploadImage" required>
      </div>
      <div class="col-md-4">
        <label for="Name" class="form-label">Nome Completo</label>
        <input type="text" class="form-control" id="Name" name="Name" @change="handleChange" :value="formPatient.Name"
          required>
      </div>
      <div class="col-md-4">
        <label for="motherName" class="form-label">Nome da mãe</label>
        <input type="text" class="form-control" id="motherName" name="motherName" @change="handleChange"
          :value="formPatient.motherName" required>
      </div>
      <div class="col-md-4">
        <label for="BirthDay" class="form-label">Data de Nascimento</label>
        <div class="input-group has-validation">
          <input type="date" class="form-control" name="BirthDay" id="BirthDay" @change="handleChange"
            :value="formPatient.BirthDay" required>
        </div>
      </div>
      <div class="col-md-6">
        <label for="CPF" class="form-label">CPF</label>
        <input type="text" class="form-control" id="CPF" name="CPF" @change="handleChange" :value="formPatient.CPF"
          required>
        <div v-if="isCPFValid == false && formPatient.CPF" class="alert alert-warning">
          CPF inválido
        </div>
      </div>
      <div class="col-md-6">
        <label for="CNS" class="form-label">CNS</label>
        <input type="text" class="form-control" id="CNS" name="CNS" @change="handleChange" :value="formPatient.CNS"
          required>
        <div v-if="isCNSValid == false && formPatient.CNS" class="alert alert-warning">
          CNS inválido
        </div>
      </div>

      <div class="col-md-3">
        <label for="CEP" class="form-label">CEP</label>
        <input type="text" class="form-control" id="CEP" name="CEP" @change="handleChangeAddress" :value="formAddress.CEP"
          required>
        <div v-if="isCEPValid == false && formAddress.CEP" class="alert alert-warning">
          CEP inválido
        </div>
      </div>
      <div v-if="isCEPValid" class="row">
        <div class="col-md-3">
          <label for="Address" class="form-label">Rua</label>
          <input type="text" class="form-control" id="Address" name="Address" @change="handleChangeAddress"
            :value="formAddress.Address" disabled>
        </div>
        <div class="col-md-6">
          <label for="Neighborhood" class="form-label">Bairro</label>
          <input type="text" class="form-control" id="Neighborhood" name="Neighborhood" @change="handleChangeAddress"
            :value="formAddress.Neighborhood" disabled>
        </div>
        <div class="col-md-3">
          <label for="City" class="form-label">Cidade</label>
          <input type="text" class="form-control" id="City" name="City" @change="handleChangeAddress"
            :value="formAddress.City" disabled>
        </div>
        <div class="col-md-3">
          <label for="State" class="form-label">Estado</label>
          <input type="text" class="form-control" id="State" name="State" @change="handleChangeAddress"
            :value="formAddress.State" disabled>
        </div>

        <div class="col-md-3">
          <label for="Number" class="form-label">Numero</label>
          <input type="text" class="form-control" id="Number" name="Number" @change="handleChangeAddress"
            :value="formAddress.Number">
        </div>
        <div class="col-md-3">
          <label for="Complement" class="form-label">Complemento</label>
          <input type="text" class="form-control" id="Complement" name="Complement" @change="handleChangeAddress"
            :value="formAddress.Complement">
        </div>
      </div>

      <div class="col-12">
        <button v-if="isCEPValid && isCPFValid && isCNSValid" class="btn btn-success" type="button"
          @click="onSubmit">Cadastrar</button>
        <button v-else class="btn btn-primary" type="button" @click="openAddress">Proximo</button>
      </div>
    </form>
  </div>
</template>
  
<script>
import axios from 'axios'

export default {
  name: 'PatientInfo',

  data() {
    return {
      info: [],
      formPatient: [],
      formAddress: [],
      isCEPValid: false,
      isCPFValid: false,
      isCNSValid: false,
      addressInformation: {},
      photo: null,
      previewImage: null,
    };
  },
  props: {
    type: String
  },
  methods: {
    uploadImage(e) {
      const image = e.target.files[0];
      this.photo = image;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.previewImage = e.target.result;
        this.formPatient.Photo = e.target.result;
      };
    },

    handleChange(event) {
      const { name, value } = event.target;
      let form = this.formPatient;

      form[name] = value;

      if (name == "CPF")
        this.validateCPF(value);
      
      if (name == "CNS")
        this.validateCNS(value);

      this.formPatient = form;
    },

    handleChangeAddress(event) {
      const { name, value } = event.target;
      let formAddress = this.formAddress;
      formAddress[name] = value;
      if (name == "CEP")
        this.validateCEP(value);
      this.formAddress = formAddress;
    },

    openAddress() {
      this.validateCEP(this.formAddress.CEP);
    },

    async onSubmit(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.append("Name", this.formPatient.Name);
      formData.append("motherName", this.formPatient.motherName);
      formData.append("BirthDay", this.formPatient.BirthDay);
      formData.append("CPF", this.formPatient.CPF);
      formData.append("CNS", this.formPatient.CNS);
      if (this.type == "edit") {
        formData.append("patient_id", this.$route.params.id);
      } else {
        formData.append("Photo", this.photo, this.photo.name);
      }
      this.validateCPF(this.formPatient.CPF);
      this.validateCNS(this.formPatient.CNS);
      await this.validateCEP(this.formAddress.CEP);
      let patient_id;
      if (this.type == 'edit') {
        axios.put(`http://localhost:8000/api/patient/${this.$route.params.id}`, this.formPatient);
        axios.put(`http://localhost:8000/api/address/${this.$route.params.id}`, this.formAddress);
      } else {
        patient_id = await axios.post('http://localhost:8000/api/patient', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

        this.formAddress.patient_id = patient_id.data;

        let params = Object.assign({}, this.formAddress);

        await axios.post('http://localhost:8000/api/address', params, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'Token',
            "Access-Control-Allow-Origin": "*",
          }
        });
      }
    },

    async validateCEP(cep) {
      await axios.get(`http://localhost:8000/api/cep/${cep}`)
        .then((response) => {
          if (response.data.cep !== undefined) {
            this.addressInformation = response.data;
            this.isCEPValid = true;
            return response.data;
          }

        })
        .then((data) => {
          if (data) {
            this.formAddress.Address = data.logradouro;
            this.formAddress.City = data.localidade;
            this.formAddress.State = data.uf;
            this.formAddress.Neighborhood = data.bairro;
          }
        })
    },

    validateCNS(cns) {
      cns = cns.toString().replace(/\s/g, '').replace(/-/g, '');
      const vetcns = cns.split('');
      let isValid = false;
      if (cns.match(/[1-2]\d{10}00[0-1]/) || cns.match(/[7-9]\d{14}/)) {
        isValid = vetcns.reduce((soma, valor, indice) =>
          soma + parseInt(valor) * (15 - indice), 0) % 11 === 0
        this.isCNSValid = isValid;
        return isValid;
      }
      this.isCNSValid = isValid;
      return isValid;
    },

    validateCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g, '');
      if (cpf == '') return false;

      if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;

      var add = 0;
      for (var i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
      var rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(9)))
        return false;

      add = 0;
      for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(10)))
        return false;

      this.isCPFValid = true;
    },
  },
  mounted() {
    if (this.type == "edit") {
      axios.get(`http://localhost:8000/api/patient/${this.$route.params.id}`)
        .then((response) => {
          if (response.data.Name) {
            this.formPatient = response.data;
            this.validateCPF(this.formPatient.CPF);
            this.validateCNS(this.formPatient.CNS);
          }
      })
      axios.get(`http://localhost:8000/api/address/${this.$route.params.id}`).then((response) => {
        if (response.data.length > 0) {
            this.formAddress = response.data[0];
            this.validateCEP(this.formAddress.CEP);
          }
      })
    }
  },

}
</script>