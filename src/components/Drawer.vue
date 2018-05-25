<template>
  <v-navigation-drawer app fixed clipped :value="drawer">
      <v-list>

      <v-list-tile tag="v-list-tile"
          v-for="(item, index) in menuItems"
          :to="item.link"
          :key="'draw-menu-'+index"
        >
          
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{item.title}}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  props: ['drawer'],
  data () {
    return {
      authDrawerMenuItems: [
        { icon: 'folder_open', title: 'Projects', link: '/projects' },
        { icon: 'account_box', title: 'Archive', link: '/archive' }
      ],
      nonAuthDrawerMenuItems: [
        { icon: 'folder_open', title: 'Projects', link: '/projects' }
      ]
    }
  },
  computed: {
    menuItems () {
      return this.$store.getters['user/user'].id ? this.authDrawerMenuItems : this.nonAuthDrawerMenuItems
    }
  }
}
</script>
