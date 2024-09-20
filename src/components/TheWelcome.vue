<script setup>
import { reactive, onMounted, getCurrentInstance, ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

import MyModal from './MyModal.vue'

const isModalOpened = ref(false)
const agents = ref([])
const instance = getCurrentInstance()
const router = useRouter()

const openModal = () => {
  isModalOpened.value = true
}

const closeModal = () => {
  isModalOpened.value = false
}

function onSubmit(values) {
  console.log('test')
  console.log(JSON.stringify(values, null, 2))

  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('surname', data.surname)
  formData.append('email', data.email)
  formData.append('phone', data.phone)
  formData.append('avatar', data.avatar)

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }

  instance.appContext.app
    .axios({
      method: 'post',
      url: 'https://api.real-estate-manager.redberryinternship.ge/api/agents',
      data: formData,
      headers: { Authorization: `Bearer 9d0d90d2-e455-4c79-b702-7db764c3a6db` }
    })
    .then((response) => {
      console.log('this,', response)
    })
}

const data = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  avatar: null
})

const schema = yup.object({
  name: yup.string().required('აირჩეთ გარიგების ტიპი!'),
  surname: yup.string().typeError('მხოლოდ რიცხვები!').required('აირჩეთ გარიგების ტიპი!'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.number().typeError('მხოლოდ რიცხვები!').required('მიუთითეთ ფართობი!')
})

function handleFileUpload(e) {
  data.avatar = e.target.files[0]
}

function redirectToItemDescription(id) {
  router.push({ name: 'item-description', params: { id } })
}

onMounted(async () => {
  instance.appContext.app
    .axios({
      method: 'get',
      url: 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 9d0d90d2-e455-4c79-b702-7db764c3a6db'
      }
    })
    .then((response) => {
      agents.value = response.data
      console.log(response)
    })
})
</script>

<template>
  <content>
    <div class="container-fluid">
      <div class="row mb-3">
        <div class="col-8">1</div>
        <div class="col-4">
          <div class="row justify-content-end">
            <div class="col-auto">
              <a href="/create-new-item">
                <button type="button" class="btn btn-danger btn-custom" style="margin-right: 10px">
                  ლისტინგის დამატება
                </button>
              </a>

              <button
                @click="openModal"
                type="button"
                class="btn btn-outline-danger btn-outline-custom"
                style="border-color: #f93b1d"
              >
                აგენტის დამატება
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div
          class="col-sm-3 mb-3 mb-sm-0"
          v-for="item in agents"
          :key="item.id"
          @click="redirectToItemDescription(item.id)"
        >
          <div class="card mb-4">
            <img :src="item.image" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ item.price }}</h5>
              <p class="card-text">
                <img src="../assets/icons/location-marker.png" /> {{ item.address }}
              </p>

              <div class="container g-0">
                <div class="row g-0">
                  <div class="col">
                    <div>
                      <img src="../assets/icons/bed.png" />
                      <span>{{ item.bedrooms }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <img src="../assets/icons/area.png" />
                    <span>{{ item.area }} </span>
                  </div>
                  <div class="col">
                    <img src="../assets/icons/index.png" />
                    <span>{{ item.zip_code }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </content>

  <MyModal :isOpen="isModalOpened" @modal-close="closeModal" name="first-modal">
    <template #header>აგენტის დამატება</template>

    <template #content>
      <Form id="form" @submit="onSubmit" :validation-schema="schema">
        <div class="mt-3 row g-3">
          <div>
            <label class="form-label"><h5>ბინის დეტალები</h5></label>
          </div>

          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">სახელი</label>
            <Field v-model="data.name" name="name" v-slot="{ field }">
              <input type="input" class="form-control" v-bind="field" />
            </Field>
            <ErrorMessage name="name" />
          </div>

          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">გვარი</label>
            <Field v-model="data.surname" name="surname" v-slot="{ field }">
              <input type="input" class="form-control" v-bind="field" />
            </Field>
            <ErrorMessage name="surname" />
          </div>

          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">ელ ფოსტა</label>
            <Field v-model="data.email" name="email" v-slot="{ field }">
              <input type="input" class="form-control" v-bind="field" />
            </Field>
            <ErrorMessage name="email" />
          </div>

          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">ტელეფონის ნომერი</label>
            <Field v-model="data.phone" name="phone" v-slot="{ field }">
              <input type="input" class="form-control" v-bind="field" />
            </Field>
            <ErrorMessage name="phone" />
          </div>
        </div>

        <div class="mt-3 row g-3">
          <div>
            <label class="form-label"><h5>ატვირთეთ ფოტო *</h5></label>
          </div>
          <input
            class="form-control"
            type="file"
            @change="handleFileUpload($event)"
            id="formFile"
          />
        </div>

        <div class="d-flex flex-row-reverse bd-highlight mb-3 mt-3">
          <div class="p-2 bd-highlight">
            <button type="submit" for="form" class="btn btn-danger">ლისტინგის დამატება</button>
          </div>
          <div class="p-2 bd-highlight">
            <button type="submit" for="form" class="btn btn-outline-danger">გაუქმება</button>
          </div>
        </div>
      </Form>
    </template>
  </MyModal>
</template>

<style>
button.btn-custom {
  border: 2px solid #f93b1d;
  background-color: #f93b1d; /* Your custom background color */
  color: white; /* Text color */
}

button.btn-custom:hover {
  background-color: #df3014; /* Darker shade for hover */
  border-color: #df3014; /* Darker border color on hover */
}

button.btn-outline-custom {
  color: #f93b1d;
  border-color: #f93b1d;
  transition:
    background-color 0.3s,
    color 0.3s;
}

button.btn-outline-custom:hover {
  background-color: #df3014;
  color: white;
}
</style>
