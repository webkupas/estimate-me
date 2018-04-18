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
    <v-btn depressed large color="primary mb-2 " style="margin-right: 12px;" to="/workspaces/1">Manage</v-btn>
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
      loading: (this.$store.getters.user.currentWorkspace !== '' && !this.$store.getters.user.relatedWorkspaces.length),
      label: 'Loading data'
    }
  },
  methods: {
    onChangeWorkspace (workspaceID) {
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
      db.collection('workspaces')
      .where('superadmin', '==', this.$store.getters.user.id)
      .get()
      .then(query => {
        let workspaces = []
        query.forEach(doc => {
          workspaces.push({
            id: doc.id,
            name: doc.data().title
          })
        })
        this.$store.dispatch('setRelatedWorkspaces', workspaces)
        this.workspaceList = workspaces
        this.loading = false
        this.label = 'Select'
        this.currentWorkspace = this.$store.getters.user.currentWorkspace
      })
    }
  }
}
</script>