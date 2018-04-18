<template>
  <v-container grid-list-lg style="max-width: 900px">
      <h1 class="display-3 mt-4 mb-3"> Active Projects </h1>
      <v-layout raw wrap>

       <v-flex sm12 v-for="i in 7" :key="'project-'+i">
          <v-card hover to="/projects/1">
            <v-card-title class="primary">
              <v-layout row justify-space-between align-center>
                <v-flex sm11>
                  <div class="title" style="color: #fff;">Unlimited music now Unlimited music now Unlimited music now Unlimited music now</div>
                </v-flex>

                <v-flex sm1 style="margin-right: -15px">
                  <v-tooltip top>
                    <v-btn icon dark slot="activator">
                      <v-icon >remove_red_eye</v-icon>
                    </v-btn>
                    <span>View</span>
                  </v-tooltip>

                </v-flex>
                
              </v-layout>
               
            </v-card-title>
           
            <v-card-text>
              <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <div class="pl-2 grey--text">posted by: <span class="primary--text text--darken-2">Pavel Kukla</span></div>

              <v-spacer></v-spacer>

              <v-tooltip top>
                <v-btn icon slot="activator">
                  <v-icon color="grey">delete_forever</v-icon>
                </v-btn>
                <span>Delete</span>
              </v-tooltip>

              <v-tooltip top>
                <v-btn icon slot="activator">
                  <v-icon color="grey">mode_edit</v-icon>
                </v-btn>
                <span>Edit</span>
              </v-tooltip>

              <v-tooltip top>
                <v-btn icon slot="activator">
                  <v-icon color="grey">archive</v-icon>
                </v-btn>
                <span>Move to Archive</span>
              </v-tooltip>
              
            </v-card-actions>
          </v-card>
       </v-flex>

     </v-layout>
  </v-container>
</template>
