<template>
        <div class="container">

            <h4 class="mt-5 text-center">ლისტინგის დამატება</h4>

            <Form id="form" @submit="onSubmit" v-slot="{ values }">
                
                <div>
                        <div>
                            <label class="form-label"><h5>გარიგების ტიპი</h5></label>
                        </div>
                    
                        <div class="form-check form-check-inline">
                        <Field class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                        <label class="form-check-label" for="inlineRadio1">იყიდება</label>
                        </div>

                        <div class="form-check form-check-inline">
                        <Field class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                        <label class="form-check-label" for="inlineRadio2">ქირავდება</label>
                        </div>

                </div>

        

                <div class="mt-3 row g-3">

                    <div>
                        <label class="form-label"><h5>მდებარეობა</h5></label>
                    </div>

                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">მისამართი</label>
                        <input type="email" class="form-control" id="inputEmail4">
                    </div>

                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">საფოსტო ინდექსი</label>
                        <input type="password" class="form-control" id="inputPassword4">
                    </div>

                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">რეგიონი</label>
                        <input type="email" class="form-control" id="inputEmail4">
                    </div>

                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">ქალაქი</label>
                        <input type="password" class="form-control" id="inputPassword4">
                    </div>

                </div>


                <div class="mt-3 row g-3">

                    <div>
                        <label class="form-label"><h5>ბინის დეტალები</h5></label>
                    </div>

                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">ფასი</label>
                        <input type="email" class="form-control" id="inputEmail4">
                    </div>

                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">ფართობი</label>
                        <input type="password" class="form-control" id="inputPassword4">
                    </div>

            

                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">საძინებლის რაოდენობა</label>
                        <input type="email" class="form-control" id="inputEmail4">
                    </div>
                
                    <label for="inputEmail4" class="form-label">აღწერა</label>
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>

                </div>


                <div class="mt-3 row g-3">
                    <div>
                        <label class="form-label"><h5>ატვირთეთ ფოტო *</h5></label>
                    </div>
                    <input class="form-control" type="file" id="formFile">
                </div>
                
                <div class="mt-5 row g-3">
                   
                    <div>
                        <label class="form-label"><h5>აგენტი</h5></label>
                    </div>

                    <select class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                </div>

                <div class="d-flex  flex-row-reverse bd-highlight mb-3 mt-3">

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
  
  
  <script setup>

    import { onMounted, getCurrentInstance  } from 'vue';
    import { Form, Field } from 'vee-validate';


    const schema = {
    drink: (value) => {
        if (value) {
        return true;
        }

        return 'You must choose a drink';
    },
    };


    function onSubmit(values) {
        console.log(JSON.stringify(values, null, 2));
    }

    onMounted(async () => {
    

    });

</script>