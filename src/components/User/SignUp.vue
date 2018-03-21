<template>
  <v-container style="max-width: 500px">
      <v-card class="mt-4">
        <v-card-title class="primary">
          <h1 class="display-1 white--text">Sign Up</h1>
        </v-card-title>
        
          <v-form v-model="valid">
            <v-card-text>
              <v-text-field
                label="Name"
                v-model="name"
                :rules="nameRules"
                required
              ></v-text-field>
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
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat class="primary" @keyup.enter.native="signUp">Sign Up</v-btn>
              </v-card-actions>
            </v-card-text>
        </v-form>
        
        
      </v-card>
  </v-container>
</template>

<script>
  export default{
    data () {
      return {
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
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters'
        ]
      }
    },
    methods: {
      signUp () {
        this.$store.dispatch('signUserUp', {name: this.name, email: this.email, password: this.password})
      }
    },
    created () {
      window.addEventListener('keyup', evt => {
        if (evt.keyCode === 13 && this.valid) this.signUp()
      })
    }
  }
</script>