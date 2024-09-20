<template>
  <content>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 mb-3 mb-sm-0" @click="returnBack">
          <img src="../assets/Icon_right.png" />
        </div>

        <div class="col-sm-6 mb-3 mb-sm-0">
          <img class="img-fluid" :src="cityes.image" style="width: 100%" />
        </div>

        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="container">
            <div>
              <h1>{{ cityes.price }} ₾</h1>
            </div>

            <div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item border-0">
                  <p class="card-text">
                    <img src="../assets/icons/location-marker.png" /> {{ cityes.address }}
                  </p>
                </li>
                <li class="list-group-item border-0">
                  <div class="col">
                    <img src="../assets/icons/area.png" />
                    <span>{{ cityes.area }} </span>
                  </div>
                </li>
                <li class="list-group-item border-0">
                  <div class="col">
                    <div>
                      <img src="../assets/icons/bed.png" />
                      <span>{{ cityes.bedrooms }}</span>
                    </div>
                  </div>
                </li>
                <li class="list-group-item border-0">
                  <div class="col">
                    <img src="../assets/icons/index.png" />
                    <span>{{ cityes.zip_code }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="mt-2">
              {{ cityes.description }}
            </div>

            <div class="row justify-content-end mt-5">
              <div class="col-auto">
                <button
                  @click="openModal"
                  type="button"
                  class="btn btn-outline-danger btn-outline-custom"
                  style="border-color: #f93b1d"
                >
                  წაშლა
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </content>
</template>

<script setup>
import { onMounted, getCurrentInstance, ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

const instance = getCurrentInstance()
const route = useRoute() // Access route information
const itemId = route.params.id

const cityes = ref([])

const openModal = () => {
  instance.appContext.app
    .axios({
      method: 'delete',
      baseURL: 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates/' + itemId,
      headers: { Authorization: `Bearer 9d0d90d2-e455-4c79-b702-7db764c3a6db` }
    })
    .then((response) => {
      cityes.value = response.data
      router.go(-1)
    })
}

const returnBack = () => {
  router.go(-1)
}

onMounted(() => {
  instance.appContext.app
    .axios({
      method: 'get',
      baseURL: 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates/' + itemId,
      headers: { Authorization: `Bearer 9d0d90d2-e455-4c79-b702-7db764c3a6db` }
    })
    .then((response) => {
      cityes.value = response.data
      console.log('this,', response)
    })
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
