<template>
  <div class="container">
    <h4 class="mt-5 text-center">ლისტინგის დამატება</h4>

    <Form id="form" @submit="onSubmit" :validation-schema="schema">
      <div>
        <div>
          <label class="form-label"><h5>გარიგების ტიპი</h5></label>
        </div>

        <div class="form-check form-check-inline">
          <Field v-model="data.is_rental" id="inlineRadio1" name="is_rental" v-slot="{ field }">
            <input type="radio" class="form-check-input" v-bind="field" :value="0" />
          </Field>

          <label class="form-check-label" for="inlineRadio1">იყიდება</label>
        </div>

        <div class="form-check form-check-inline">
          <Field v-model="data.is_rental" id="inlineRadio2" name="is_rental" v-slot="{ field }">
            <input type="radio" class="form-check-input" v-bind="field" :value="1" />
          </Field>
          <label class="form-check-label" for="inlineRadio2">ქირავდება</label>
        </div>

        <ErrorMessage name="is_rental" />
      </div>

      <div class="mt-3 row g-3">
        <div>
          <label class="form-label"><h5>მდებარეობა</h5></label>
        </div>

        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">მისამართი</label>

          <Field v-model="data.address" name="address" v-slot="{ field }">
            <input type="input" class="form-control" v-bind="field" />
          </Field>

          <ErrorMessage name="address" />
        </div>

        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">საფოსტო ინდექსი</label>
          <Field v-model="data.zip_code" name="zip_code" v-slot="{ field }">
            <input type="input" class="form-control" v-bind="field" />
          </Field>
          <ErrorMessage name="zip_code" />
        </div>

        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">რეგიონი</label>

          <Field class="form-select" v-model="data.region_id" name="region_id" as="select">
            <option value="" disabled>რეგიონი</option>
            <option v-for="country in countries" :key="country.id" :value="country.id">
              {{ country.name }}
            </option>
          </Field>
          <ErrorMessage name="region_id" />
        </div>

        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">ქალაქი</label>

          <Field class="form-select" v-model="data.city_id" name="city_id" as="select">
            <option value="" disabled>ქალაქი</option>
            <option v-for="country in cityes" :key="country.id" :value="country.id">
              {{ country.name }}
            </option>
          </Field>

          <ErrorMessage name="city" />
        </div>
      </div>

      <div class="mt-3 row g-3">
        <div>
          <label class="form-label"><h5>ბინის დეტალები</h5></label>
        </div>

        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">ფასი</label>
          <Field v-model="data.price" name="price" v-slot="{ field }">
            <input type="input" class="form-control" v-bind="field" />
          </Field>
          <ErrorMessage name="price" />
        </div>

        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">ფართობი</label>
          <Field v-model="data.area" name="area" v-slot="{ field }">
            <input type="input" class="form-control" v-bind="field" />
          </Field>
          <ErrorMessage name="area" />
        </div>

        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">საძინებლის რაოდენობა</label>
          <Field v-model="data.bedrooms" name="bedrooms" v-slot="{ field }">
            <input type="input" class="form-control" v-bind="field" />
          </Field>
          <ErrorMessage name="bedrooms" />
        </div>

        <label for="inputEmail4" class="form-label">აღწერა</label>

        <Field v-model="data.description" name="description" v-slot="{ field }">
          <textarea type="input" class="form-control" v-bind="field"></textarea>
        </Field>
        <ErrorMessage name="description" />
      </div>

      <div class="mt-3 row g-3">
        <div>
          <label class="form-label"><h5>ატვირთეთ ფოტო *</h5></label>
        </div>
        <input class="form-control" type="file" @change="handleFileUpload($event)" id="formFile" />
      </div>

      <div class="mt-5 row g-3">
        <div>
          <label class="form-label"><h5>აგენტი</h5></label>
        </div>

        <Field class="form-select" v-model="data.agent_id" name="agent_id" as="select">
          <option value="" disabled>აგენტი</option>
          <option v-for="country in agents" :key="country.id" :value="country.id">
            {{ country.name }}
          </option>
        </Field>
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
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, getCurrentInstance, ref, watch } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const cityes = ref([])
const countries = ref([])
const agents = ref([])

const data = reactive({
  address: '',
  image: null,
  region_id: null,
  description: '',
  city_id: null,
  zip_code: '',
  price: null,
  area: null,
  bedrooms: null,
  is_rental: null,
  agent_id: null
})

const schema = yup.object({
  is_rental: yup.string().required('აირჩეთ გარიგების ტიპი!'),
  address: yup.string().required('აირჩეთ გარიგების ტიპი!').min(2, 'მინიმუმ 2 სიმბოლო!'),
  zip_code: yup.number().typeError('მხოლოდ რიცხვები!').required('აირჩეთ გარიგების ტიპი!'),
  //region_id: yup.string().required('აირჩეთ რეგიონი!'),
  //city_id: yup.string().required('აირჩეთ ქალაქი!'),
  price: yup.number().typeError('მხოლოდ რიცხვები!').required('მიუთითეთ ფასი!'),
  area: yup.number().typeError('მხოლოდ რიცხვები!').required('მიუთითეთ ფართობი!'),
  bedrooms: yup.number().typeError('მხოლოდ რიცხვები!').required('მიუთითეთ საძინებლის რაოდენობა!'),
  description: yup.string().min(5, 'მინიმუმ 5 სიმბოლო!')
})

const instance = getCurrentInstance()

function onSubmit(values) {
  console.log('test')
  console.log(JSON.stringify(values, null, 2))

  const formData = new FormData()
  formData.append('address', data.address)
  formData.append('region_id', data.region_id)
  formData.append('description', data.description)
  formData.append('city_id', data.city_id)
  formData.append('zip_code', data.zip_code)
  formData.append('price', data.price)
  formData.append('area', data.area)
  formData.append('bedrooms', data.bedrooms)
  formData.append('is_rental', data.is_rental)
  formData.append('agent_id', data.agent_id)
  formData.append('image', data.image)

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
  }

  instance.appContext.app
    .axios({
      method: 'post',
      url: 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
      data: formData,
      headers: { Authorization: `Bearer 9d0d90d2-e455-4c79-b702-7db764c3a6db` }
    })
    .then((response) => {
      console.log('this,', response)
    })
}

function handleFileUpload(e) {
  data.image = e.target.files[0]
}

onMounted(() => {
  instance.appContext.app
    .axios({
      method: 'get',
      baseURL: 'https://api.real-estate-manager.redberryinternship.ge/api/cities',
      headers: { Authorization: `Bearer 9d0d90d2-e455-4c79-b702-7db764c3a6db` }
    })
    .then((response) => {
      cityes.value = response.data
      console.log('this,', response)
    })

  instance.appContext.app
    .axios({
      method: 'get',
      baseURL: 'https://api.real-estate-manager.redberryinternship.ge/api/regions',
      headers: { Authorization: `Bearer 9d0d90d2-e455-4c79-b702-7db764c3a6db` }
    })
    .then((response) => {
      countries.value = response.data
      console.log('this,', response)
    })

  instance.appContext.app
    .axios({
      method: 'get',
      baseURL: 'https://api.real-estate-manager.redberryinternship.ge/api/agents',
      headers: { Authorization: `Bearer 9d0d90d2-e455-4c79-b702-7db764c3a6db` }
    })
    .then((response) => {
      agents.value = response.data
    })
})

watch(cityes, () => {
  console.log('Cart items changed', cityes.value)
})
</script>
