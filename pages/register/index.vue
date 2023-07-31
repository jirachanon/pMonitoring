<template>
  <v-layout>
    <v-app-bar density="compact" flat>
      <v-app-bar-title>สมัครสมาชิค</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" class="mt-6 text-center">
            กรุณากรอกข้อมูล
          </v-col>

          <v-col cols="12">
            <v-form fast-fail @submit.prevent>
              <v-text-field v-model="form.firstName" label="ชื่อ" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>

              <v-text-field v-model="form.lastName" label="สกุล" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>

              <v-text-field v-model="form.hn" label="Hospital Number" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>

              <v-text-field v-model="form.tel" label="เบอร์โทรศัพท์" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>
            </v-form>
          </v-col>

          <v-col cols="12" class="gender-group d-flex">
            <p>Gender</p>
            <div class="circle" :class="form.gender == 1 ? 'active' : ''" @click="chooseGender(1)">
              <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="35" height="46" fill="currentColor"
                class="bi bi-gender-female" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
                  fill="white"></path>
              </svg>
            </div>
            <p>เพศหญิง</p>
            <div class="circle" :class="form.gender == 2 ? 'active' : ''" @click="chooseGender(2)">
              <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="35" height="46" fill="currentColor"
                class="bi bi-gender-male" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                  fill="white"></path>
              </svg>
            </div>
            <p>เพศชาย</p>
          </v-col>

          <v-col cols="12">
            <v-btn flat block rounded="xl" size="large" @click="submit">ตกลง</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-title>กรุณากรอกข้อมูลให้ครบถ้วน</v-card-title>
          <v-card-text v-html="errorMsg"></v-card-text>
        </v-card>
      </v-dialog>
    </v-main>
  </v-layout>
</template>

<script>
import {addUsers} from '~/api/userRegister'

export default {
  data() {
    return {
      dialog: false,
      errorMsg: '',
      form: {
        firstName: '',
        lastName: '',
        hn: '',
        tel: '',
        gender: 1
      }
    }
  },
  methods: {
    chooseGender(gender) {
      this.form.gender = gender
    },
    validate() {
      let validated = true
      const errors = []
      const validatorField = [
        'firstName',
        'lastName',
        'hn',
        'tel'
      ]
      validatorField.forEach((field) => {
        if (this.form[field] === '') {
          validated = false
          errors.push(`${field} canot be null`)
        }
      })
      if (!validated) {
        this.errorMsg = errors.map((error) => error + '<br/>').join('')
        this.dialog = true
      }
      return validated
    },
    async submit() {
      if(this.validate()){
        try {
          await addUsers(this.form)
          this.$router.push('/register/step2')
        } catch (error) {
          
        }
      }
    }
  }
}
</script>

<style lang="scss">
.v-form {
  padding: 0 10px;
}

.gender-group {
  p {
    margin-bottom: 0;
    align-self: center;
    margin-right: 20px;
  }

  .circle {
    width: 45px;
    height: 45px;
    color: white;
    border-radius: 50%;
    position: relative;
    background-color: rgba($color: #000000, $alpha: 0.3);
    margin-right: 7px;

    &.active {
      background: #1ABC9C;
    }
  }

  svg {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.v-btn {
  color: white;
  background-color: #1ABC9C;
  margin-top: 25px;
  font-size: 20px;
}
</style>
