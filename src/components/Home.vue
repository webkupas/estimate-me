<template>
  <div>
      <v-container grid-list-md class="main-container">
        <v-layout row wrap>
          <v-flex md7>
            <v-card>
              <v-card-title>
                <h3>Projects List</h3>
                <v-spacer></v-spacer>
                <v-text-field
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  v-model="search"
                ></v-text-field>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="items"
                  :search="search"
                  hide-headers
                  class="projects-list-table"
                >
                  <template slot="items" slot-scope="props">
                    <td class="pl-2">{{ props.item.name }}</td>
                    <td class="text-xs-right pr-0">
                      
                      <v-tooltip top>
                        <v-btn icon slot="activator">
                          <v-icon color="grey">remove_red_eye</v-icon>
                        </v-btn>
                        <span>View</span>
                      </v-tooltip>
                    </td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex md5>
            <est-workspaces-widget />
          </v-flex>

          
        </v-layout>

      </v-container>
  </div>
</template>


<script>
import WorkspacesWidget from './HomeWidgets/WorkspaceWidget'
export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Project Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'View' }
      ],
      items: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  components: {
    'est-workspaces-widget': WorkspacesWidget
  }
}
</script>

<style scoped>
  .main-container {
    padding-top: 80px;
    padding-bottom: 50px;
  }

  .projects-list-table{
    border-top: 1px solid rgba(0,0,0,.12);
  }
</style>
