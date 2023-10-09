<template>
  <v-layout>
    <v-app-bar density="compact" flat>
      <v-app-bar-title>ผลการวัดความดัน</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" class="mt-6 text-center">
            กรุณากรอกข้อมูล
          </v-col>

          <v-col cols="12">
            <v-form fast-fail @submit.prevent>
              <v-text-field v-model="form.sys" label="SYS" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>

              <v-text-field v-model="form.dia" label="DIA" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>

              <v-text-field v-model="form.pulse" label="Pulse" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>

            </v-form>
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
import { addBP } from '~/api/userRegister'

export default {
  data() {
    return {
      dialog: false,
      errorMsg: '',
      form: {
        sys: '',
        dia: '',
        pulse: '',
      }
    }
  },
  methods: {
    validate() {
      let validated = true
      const errors = []
      const validatorField = [
        'sys',
        'dia',
        'pulse'
      ]
      validatorField.forEach((field) => {
        if (this.form[field] === '') {
          validated = false
          errors.push(`${field} ยังไม่มีข้อมูล`)
        }
        if (parseInt(this.form[field]) < 40) {
          validated = false
          errors.push(`${field} ค่าน้อยไปไอสัส`)
        }
      })
      if (!validated) {
        this.errorMsg = errors.map((error) => error + '<br/>').join('')
        this.dialog = true
      }
      return validated
      
      
    },
    async submit() {
      if (this.validate()) {
        try {
          await addBP(this.form)
          this.$router.push('./bp/ok')
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
  