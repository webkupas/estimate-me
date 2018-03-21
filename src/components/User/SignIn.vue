<template>
  <v-container style="max-width: 500px">

    <v-card class="mt-4">
      <v-card-title class="primary">
        <h1 class="display-1 white--text">Sign In</h1>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" lazy-validation>
          <v-text-field
            label="E-mail"
            v-model="email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            name="input-10-1"
            label="Enter your password"
            hint="At least 8 characters"
            v-model="password"
            min="8"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            counter
          ></v-text-field>
       
      </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <a @click.prevent="goToSignUp" class="sign-up-link">Register</a>
        <v-btn @click="signIn" class="primary mr-2 mb-2">Sign In</v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
  export default{
    data () {
      return {
        password: '',
        valid: false,
        e1: true,
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      signIn () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
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
</style>
