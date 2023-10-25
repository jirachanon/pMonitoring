<template>
  <v-layout>
    <v-app-bar density="compact" flat>
      <v-app-bar-title>สมัครสมาชิก</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" class="mt-6 text-center">
            กรุณากรอกข้อมูล
          </v-col>

          <v-col cols="12">
            <v-form @submit.prevent="submit">
              <v-text-field v-model="firstName.value.value" :error-messages="firstName.errorMessage.value" label="ชื่อ" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>

              <v-text-field v-model="lastName.value.value" :error-messages="lastName.errorMessage.value" label="สกุล" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>

              <v-text-field v-model="hn.value.value" :error-messages="hn.errorMessage.value" label="Hospital Number" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>

              <v-text-field v-model="tel.value.value" :error-messages="tel.errorMessage.value" label="เบอร์โทรศัพท์" aria-required="true" class="pt-0 pb-0"
                variant="underlined"></v-text-field>
            </v-form>
          </v-col>

          <!-- <v-col cols="12" class="gender-group d-flex">
            <p>Gender</p>
            <div class="circle" :class="form.gender == 1 ? 'active' : ''" @click="chooseGender(1)">
              <icons-female />
            </div>
            <p>เพศหญิง</p>
            <div class="circle" :class="form.gender == 2 ? 'active' : ''" @click="chooseGender(2)">
                <icons-male />
            </div>
            <p>เพศชาย</p>
          </v-col> -->

          <v-col cols="12">
            <v-btn flat block rounded="xl" size="large">ตกลง</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- <v-dialog v-model="dialog" width="auto">
        <v-card>
          <v-card-title>กรุณากรอกข้อมูลให้ครบถ้วน</v-card-title>
          <v-card-text v-html="errorMsg"></v-card-text>
        </v-card>
      </v-dialog> -->
      
    </v-main>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'
  import { useField, useForm } from 'vee-validate'

  const { handleSubmit } = useForm({
    validationSchema: {
      firstName (value) {
        if (value) return true

        return 'กรุณากรอกข้อมูล'
      },
      lastName (value) {
        if (value) return true

        return 'กรุณากรอกข้อมูล'
      },
      hn (value) {
        if (value) return true

        return 'กรุณากรอกข้อมูล'
      },
      tel (value) {
        if (value) return true

        return 'กรุณากรอกข้อมูล'
      }
    }
  })
  const firstName = useField('firstName')
  const lastName = useField('lastName')
  const hn = useField('hn')
  const tel = useField('tel')

  const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
  })
</script>

<style lang="scss" src="@/assets/scss/register.scss"></style>
