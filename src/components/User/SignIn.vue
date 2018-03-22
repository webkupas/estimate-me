<template>
  <v-container style="max-width: 500px">

    <v-card class="mt-4">
      <v-card-title class="primary">
        <h1 class="display-1 white--text">Sign In</h1>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
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
       
      </v-form>
      </v-card-text>
      <v-card-actions>
        <div class="auth-preloader" :class="{'is-visible': (preloaderShow && valid)}">
          <v-progress-circular indeterminate :size="30" color="primary"></v-progress-circular>
        </div>
        <v-spacer></v-spacer>
        <a @click.prevent="goToSignUp" class="sign-up-link">Register</a>
        <v-btn @click="signIn" :disabled="!valid" class="primary mr-2 mb-2">Sign In</v-btn>
      </v-card-actions>
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
        password: '',
        valid: false,
        e1: true,
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
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
      signIn () {
        if (this.$refs.form.validate() && this.valid) {
          this.preloaderShow = true
          this.$store.dispatch('auth', {email: this.email, password: this.password})
          .then(response => {
            this.preloaderShow = false
            this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
          }, error => {
            this.alertErrorMsg = error.message
            this.preloaderShow = false
            this.alert = true
            setTimeout(() => {
              this.alert = false
            }, 5000)
          })
        }
      },
      goToSignUp () {
        this.$router.push('signup')
      }
    },
    created () {
      window.addEventListener('keyup', evt => {
        if (evt.keyCode === 13 && this.valid) this.signIn()
      })
    }
  }
</script>

<style scoped>
  .sign-up-link{
    display: inline;
    margin-right: 20px;
  }
  .auth-preloader{
    margin: 0 0 5px 10px;
    opacity: 0;
    transition: opacity .3s;
  }
  .auth-preloader.is-visible{
    opacity: 1;
  }
</style>
