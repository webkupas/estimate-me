<template>
  <v-card>
    <v-card-title>Workspace</v-card-title>
    <v-card-text>
    <v-select
        :items="user.relatedWorkspaces"
        item-text="name"
        item-value="id"
        overflow
        :loading="loading"
        :value="workspace.id"
        :label="label"
        target="#dropdown-example"
        @change="onChangeWorkspace"
    ></v-select>
    </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn v-if="userAbleToEditWorkspace" depressed large color="primary mb-2 " style="margin-right: 12px;" :to="`/workspaces/${workspace.id}`">Edit</v-btn>
    <v-btn depressed large color="primary mb-2 " style="margin-right: 12px;" to="/workspaces/new">Create New</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { db } from '../../firebase'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      userAbleToEditWorkspace: false,
      label: 'Loading data',
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      workspace: 'workspace/workspace'
    })
  },
  methods: {
    onChangeWorkspace (workspaceID) {
      let workspaceObj = this.user.relatedWorkspaces.find(elem => {
        return elem.id === workspaceID
      })

      if (workspaceObj.isSuperAdmin) this.userAbleToEditWorkspace = true
      else this.userAbleToEditWorkspace = false

      this.$store.dispatch('workspace/setWorkspace', workspaceID)
      this.$store.dispatch('workspace/setWorkspaceFollowers', workspaceID) // eslint-disable-next-line

      db.collection('users')
        .doc(this.user.id)
        .update({
          'lastWorkspace': workspaceID
        })
        .then(() => { console.log('Last visited workspace updated for current user') })
        .catch(error => console.error('Error updating document', error))
    }
  },
  created () {
    this.userAbleToEditWorkspace = this.workspace.isSuperAdmin
    this.loading = (this.workspace.id !== '' && !this.user.relatedWorkspaces.length) // eslint-disable-next-line
    
    if (!this.user.id) this.$router.push('signin') // eslint-disable-next-line
    
    if (!this.user.relatedWorkspaces.length) {
      db.collection('users').doc(this.user.id).get()
        .then(docRef => {
          let workspaces = []
          if (docRef.exists) {
            if (docRef.data().workspaces && docRef.data().workspaces.length) {
              workspaces = docRef.data().workspaces
            }
          }
          return workspaces
        })
        .then(workspaces => {
          let fetchWorkspace = (workspaceID) => {
            return db.collection('workspaces').doc(workspaceID).get()
              .then(workspaceRef => {
                if (workspaceRef.exists) {
                  return ({
                    id: workspaceRef.id,
                    name: workspaceRef.data().title,
                    isSuperAdmin: this.user.id === workspaceRef.data().superadmin
                  })
                }
              })
          }

          return Promise.all(workspaces.map(workspace => fetchWorkspace(workspace)))
        })
        .then(workspaces => {
          this.$store.dispatch('user/setRelatedWorkspaces', workspaces)
          this.loading = false
          this.label = 'Select' // eslint-disable-next-line

          let workspaceObj = this.user.relatedWorkspaces.find(elem => {
            return elem.id === this.workspace.id
          }) // eslint-disable-next-line
                    
          if (workspaceObj && workspaceObj.isSuperAdmin) this.userAbleToEditWorkspace = true
          else this.userAbleToEditWorkspace = false
        })
    }
  }
}
</script>