<template>
  <v-container style="max-width: 900px">
    
      <v-card class="mt-4 mb-4">
        <v-card-title class="primary">
          <h1 class="display-1 white--text">New Workspace</h1>
        </v-card-title>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-card-text>
            <v-text-field
                name="title"
                label="Title"
                class="title-new"
                v-model="title"
                :rules= 'titleRules'
                required
            ></v-text-field>
            <div class="grey--text text--darken-1 headline mb-2">Workspace description</div>
            <vue-editor 
                id="description" 
                :editorToolbar="customToolbar" 
                class="private-info-new mb-4" 
                v-model="description"
                placeholder="Description"></vue-editor>
          </v-card-text>

          <v-card-text>
            <v-select
              v-model="followers"
              label="Assigned users"
              chips
              multiple
              :items="users"
              item-text="name"
              item-value="id"
            >
              <template slot="selection" slot-scope="data">
                <v-chip
                  @input="data.parent.selectItem(data.item.id)"
                  class="chip--select-multi"
                  :selected="data.selected"
                  :disabled="data.disabled"
                  :key="JSON.stringify(data.item.id)"
                  close
                >
                  <v-avatar class="accent">{{ data.item.name.slice(0, 1).toUpperCase() }}</v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
            </v-select>
          </v-card-text>
          <v-card-actions>
            <v-tooltip top>
              <v-btn icon slot="activator" to="/">
                <v-icon color="grey">arrow_back</v-icon>
              </v-btn>
              <span>Back</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <div class="auth-preloader" :class="{'is-visible': (pending && valid && !dialog )}">
              <v-progress-circular indeterminate :size="30" color="primary" class="mr-2"></v-progress-circular>
            </div>
            <v-btn depressed large color="primary mb-2 " style="margin-right: 12px;" @click="publish" :disabled="!valid || pending">Publish</v-btn>
          </v-card-actions>
        </v-form>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Congrats!</v-card-title>
            <v-card-text>New Workspace <strong>"{{title}}"</strong> was successfully added</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" flat @click.native="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
  </v-container>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { db } from '../../firebase'
import { updateUserRelatedWorkspaces, updateLastVisitedWorkspace } from '../../functions/users'
import concat from 'lodash/concat'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      title: '',
      titleRules: [
        v => !!v || 'Title is required'
      ],
      description: '',
      valid: false,
      dialog: false,
      pending: false,
      followers: [],
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ['bold', 'italic', 'underline'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ]
      ]
    }
  },
  computed: {
    ...mapGetters({
      users: 'usersList/usersList',
      user: 'user/user'
    })
  },
  methods: {
    publish () {
      if (this.$refs.form.validate()) {
        this.pending = true // eslint-disable-next-line

        db.collection('workspaces').add({
          title: this.title,
          description: this.description,
          superadmin: this.user.id,
          followers: this.followers,
          projects: []
        })
        .then(docRef => {
          let allSharedUsers = concat(this.followers, this.user.id)
          allSharedUsers.forEach(userID => {
            updateUserRelatedWorkspaces(userID, docRef.id, true)
          })
          return docRef.id
        })
        .then(worspaceID => {
          updateLastVisitedWorkspace(this.user.id, worspaceID)
          return worspaceID
        })
        .then(worspaceID => {
          this.$store.dispatch('workspace/setWorkspace', worspaceID)
          this.$store.dispatch('user/resetRelatedWorkspaces')
          this.dialog = true
        })
        .catch(error => console.error('Error with adding new workspace in DB: ', error))
      }
    }
  },
  components: {
    'vue-editor': VueEditor
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.pending = false
        this.$router.push('/')
      }
    }
  },
  created () {
    this.$store.dispatch('usersList/getUsersList')
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
