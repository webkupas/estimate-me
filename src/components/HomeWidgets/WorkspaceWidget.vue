<template>
  <v-card>
    <v-card-title>Workspace</v-card-title>
    <v-card-text>
    <v-select
        :items="workspaceList"
        item-text="name"
        item-value="id"
        overflow
        :loading="loading"
        :value="currentWorkspace"
        :label="label"
        target="#dropdown-example"
        @change="onChangeWorkspace"
    ></v-select>
    </v-card-text>
    <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn v-if="userAbleToEditWorkspace" depressed large color="primary mb-2 " style="margin-right: 12px;" :to="`/workspaces/${currentWorkspace}`">Edit</v-btn>
    <v-btn depressed large color="primary mb-2 " style="margin-right: 12px;" to="/workspaces/new">Create New</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { db } from '../../firebase'
export default {
  data () {
    return {
      workspaceList: this.$store.getters.user.relatedWorkspaces,
      currentWorkspace: this.$store.getters.user.currentWorkspace,
      userAbleToEditWorkspace: false,
      loading: (this.$store.getters.user.currentWorkspace !== '' && !this.$store.getters.user.relatedWorkspaces.length),
      label: 'Loading data'
    }
  },
  methods: {
    onChangeWorkspace (workspaceID) {
      this.currentWorkspace = workspaceID
      let workspaceObj = this.workspaceList.find(elem => {
        return elem.id === workspaceID
      })

      if (workspaceObj.isSuperAdmin) this.userAbleToEditWorkspace = true
      else this.userAbleToEditWorkspace = false

      this.$store.dispatch('setWorkspace', workspaceID) // eslint-disable-next-line

      db.collection('users')
        .doc(this.$store.getters.user.id)
        .update({
          'lastWorkspace': workspaceID
        })
        .then(() => { console.log('Last visited workspace updated for current user') })
        .catch(error => console.error('Error updating document', error))
    }
  },
  created () {
    if (!this.$store.getters.user.id) this.$router.push('signin') // eslint-disable-next-line
        
    if (!this.$store.getters.user.relatedWorkspaces.length) {
      db.collection('users').doc(this.$store.getters.user.id).get()
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
          let selectWorkspaceList = []

          let fetchWorkspace = (workspaceID) => {
            return db.collection('workspaces').doc(workspaceID).get()
              .then(workspaceRef => {
                if (workspaceRef.exists) {
                  return ({
                    id: workspaceRef.id,
                    name: workspaceRef.data().title,
                    isSuperAdmin: this.$store.getters.user.id === workspaceRef.data().superadmin
                  })
                }
              })
          }
          workspaces.forEach(workspace => {
            selectWorkspaceList.push(fetchWorkspace(workspace))
          })
          return Promise.all(selectWorkspaceList)
        })
        .then(workspaces => {
          this.$store.dispatch('setRelatedWorkspaces', workspaces)
          this.workspaceList = workspaces
          this.loading = false
          this.label = 'Select'
          this.currentWorkspace = this.$store.getters.user.currentWorkspace // eslint-disable-next-line

          let workspaceObj = this.workspaceList.find(elem => {
            return elem.id === this.currentWorkspace
          }) // eslint-disable-next-line
                    
          if (workspaceObj.isSuperAdmin) this.userAbleToEditWorkspace = true
          else this.userAbleToEditWorkspace = false
        })
    }
  }
}
</script>