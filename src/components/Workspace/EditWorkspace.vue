<template>
  <v-container style="max-width: 900px">
    
      <v-card class="mt-4 mb-4">
        <v-card-title class="primary">
          <h1 class="display-1 white--text">Edit Workspace</h1>
                    
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
              :label="label"
              chips
              multiple
              :items="users"
              item-text="name"
              item-value="id"
              :loading="loading"
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

            <v-tooltip top>
              <v-btn icon slot="activator" @click="confirmDeleteDialog = true">
                <v-icon color="grey">delete_forever</v-icon>
              </v-btn>
              <span>Delete</span>
            </v-tooltip>

            <v-dialog v-model="confirmDeleteDialog" persistent max-width="290">           
              <v-card>
                <v-card-title class="headline red--text">Are you sure you want to remove current workspace?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click.native="confirmDeleteDialog = false">No</v-btn>
                  <v-btn color="primary" flat @click.native="removeWorkspace">Yes I'm sure</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
                        
            <v-spacer></v-spacer>
            <div class="auth-preloader" :class="{'is-visible': (pending && valid && !dialog )}">
              <v-progress-circular indeterminate :size="30" color="primary" class="mr-2"></v-progress-circular>
            </div>
            <v-btn depressed large color="primary mb-2 " style="margin-right: 12px;" @click="update" :disabled="!valid || pending ||buttonDisalded">Update</v-btn>
          </v-card-actions>
        </v-form>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Congrats!</v-card-title>
            <v-card-text>Workspace <strong>"{{title}}"</strong> was successfully updated</v-card-text>
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
import isEqual from 'lodash/isEqual'
import difference from 'lodash/difference'
import { updateUserRelatedWorkspaces } from '../../functions/users'
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
      confirmDeleteDialog: false,
      pending: false,
      loading: true,
      oldTitle: '',
      oldDescription: '',
      oldFollowers: [],
      buttonDisalded: true,
      label: 'Loading data...',
      followers: [],
      users: this.$store.getters.usersList,
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
  methods: {
    /**
     * Update current workspace fields
     * and update related workspaces data for each added/removed user
     */
    update () {
      if (this.$refs.form.validate()) {
        this.pending = true // eslint-disable-next-line

        let updates = {} // object of updated fields
        if (this.title !== this.oldTitle) updates.title = this.title
        if (this.description !== this.oldDescription) updates.description = this.description
        if (!isEqual(this.followers, this.oldFollowers)) updates.followers = this.followers // eslint-disable-next-line
        
        if (Object.keys(updates).length) {
          db.collection('workspaces')
            .doc(this.$route.params.id)
            .update(updates)
            .then(() => {
              if (updates.followers && Array.isArray(updates.followers)) {
                let usersToRemoveFromWorkspace = difference(this.oldFollowers, updates.followers)
                let usersToAddToWorkspace = difference(updates.followers, this.oldFollowers)

                // remove current workspace for all unassigned followers
                if (usersToRemoveFromWorkspace.length) {
                  usersToRemoveFromWorkspace.forEach(user => {
                    updateUserRelatedWorkspaces(user, this.$route.params.id, false)
                  })
                }

                // add current workspace to all new assigned followers
                if (usersToAddToWorkspace.length) {
                  usersToAddToWorkspace.forEach(user => {
                    updateUserRelatedWorkspaces(user, this.$route.params.id, true)
                  })
                }
              }
            })
            .then(() => {
              this.oldTitle = this.title
              this.oldDescription = this.description
              this.oldFollowers = this.followers
              this.dialog = true
            })
          .catch(error => console.warn('Error with adding new workspace in DB: ', error))
        }
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
        this.buttonDisalded = true
      }
    },
    title (val) {
      this.buttonDisalded = (val === this.oldTitle)
    },
    description (val) {
      this.buttonDisalded = (val === this.oldDescription)
    },
    followers (val) {
      this.buttonDisalded = isEqual(val, this.oldFollowers)
    }
  },
  created () {
    this.$store.dispatch('getUsersList')
        .then(() => {
          this.users = this.$store.getters.usersList
        })
        .then(() => {
          if (Object.keys(this.$route.params).length && this.$route.params.id) {
            db.collection('workspaces').doc(this.$route.params.id).get()
              .then(doc => {
                if (doc.exists) {
                  this.title = this.oldTitle = doc.data().title
                  this.description = this.oldDescription = doc.data().description
                  this.followers = this.oldFollowers = doc.data().followers
                  this.superadmin = doc.data().superadmin
                  this.label = 'Followers'
                  this.loading = false
                }
              })
          }
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
