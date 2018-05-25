<template>
  <v-container style="max-width: 500px">
      <v-card class="mt-4">
        <v-card-title class="primary">
          <h1 class="display-1 white--text">Sign Up</h1>
        </v-card-title>
        
          <v-form v-model="valid" ref="signInform">
            <v-card-text>
              <v-text-field
                label="Name"
                v-model="name"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                name="input-10-2"
                label="E-mail"
                v-model="email"
                :rules="emailRules"
                required
                validate-on-blur
              ></v-text-field>
              <v-text-field
                name="input-10-1"
                label="Enter your password"
                hint="At least 6 characters"
                v-model="password"
                :rules="passwordRules"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                required
              ></v-text-field>
              <v-card-actions>
                <div class="auth-preloader" :class="{'is-visible': (preloaderShow && valid)}">
                  <v-progress-circular indeterminate :size="30" color="primary"></v-progress-circular>
                </div>
                <v-spacer></v-spacer>
                  <v-btn @click="signUp" :disabled="!valid" class="primary">Sign Up</v-btn>
              </v-card-actions>
            </v-card-text>
        </v-form>
      </v-card>
      <v-alert
        type="error"
        :value="alert"
        transition="scale-transition"
      >
        {{alertErrorMsg}}
      </v-alert>
  </v-container>
</template>

<script>
  export default{
    data () {
      return {
        preloaderShow: false,
        name: '',
        email: '',
        password: '',
        valid: false,
        e1: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        nameRules: [
          v => !!v || 'Name is required'
          // v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        passwordRules: [
          v => !!v || 'Enter password',
          v => (v && v.length >= 6) || 'Password must contain at least 6 characters'
        ],
        alert: false,
        alertErrorMsg: ''
      }
    },
    methods: {
      signUp () {
        if (this.$refs.signInform.validate() && this.valid) {
          this.preloaderShow = true // eslint-disable-next-line
          
          this.$store.dispatch('auth/registerNewUser', {name: this.name, email: this.email, password: this.password})
            .then(response => {
              this.preloaderShow = false
              return response
            })
            .then((response) => {
              this.$store.dispatch('auth/signUserIn', {email: this.email, password: this.password})
              return response
            })
            .catch(error => {
              this.alertErrorMsg = error.message
              this.preloaderShow = false
              this.alert = true
              setTimeout(() => {
                this.alert = false
              }, 5000)
            })
        }
      }
    },
    created () {
      window.addEventListener('keyup', evt => {
        if (evt.keyCode === 13 && this.valid) this.signUp()
      })
    }
  }
</script>
<style scoped>
  .auth-preloader{
    margin: 0 0 5px 10px;
    opacity: 0;
    transition: opacity .3s;
  }
  .auth-preloader.is-visible{
    opacity: 1;
  }
</style>
