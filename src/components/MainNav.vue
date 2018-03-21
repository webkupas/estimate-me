<template>
  <v-toolbar clipped-left app fixed dark class="primary">
      <v-toolbar-side-icon
        v-if="showDrawer"
        @click=" $emit('drawerChanged', !drawer) ">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer" exact>
          Estimate!Me
        </router-link>  
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          v-for="(item, index) in topMenuItems"
          flat
          :key="'top-menu-'+index"  
          :to="item.link"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>

        <v-btn flat v-if="user.id" @click="logOut">
          <v-icon left>exit_to_app</v-icon>
          Log out
        </v-btn>
       
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  props: ['drawer', 'showDrawer'],
  data () {
    return {
      topMenuItemsAuthorized: [
        { icon: 'add', title: 'New', link: '/projects/new/' },
        { icon: 'folder_open', title: 'Projects', link: '/projects' },
        { icon: 'person', title: 'Profile', link: '/profile' }
      ],
      topMenuItemsUnAuthorized: [
        { icon: 'face', title: 'Sign Up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    topMenuItems () {
      return this.user.id ? this.topMenuItemsAuthorized : this.topMenuItemsUnAuthorized
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('logOut')
    }
  }
}
</script>
