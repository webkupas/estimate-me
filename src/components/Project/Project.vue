<template>
  <v-container style="max-width: 900px">
    <v-card class="mt-4">
      <v-card-title class="primary">

        <v-layout row justify-space-between>
          <v-flex sm11>
            <div>
              <h1 class="display-1 white--text mb-2">Project Title </h1>
              <div class="white--text">posted by: <span class="white--text">Pavel Kukla</span></div>
            </div>
          </v-flex>

          <v-flex sm1 style="margin-right: -15px">
            <v-tooltip top>
              <v-btn icon dark slot="activator">
                <v-icon >edit</v-icon>
              </v-btn>
              <span>Edit</span>
            </v-tooltip>

          </v-flex>
          
        </v-layout>
      </v-card-title>
      <v-card-text>
        <div class="elipse-expand pt-2" :class="{'is-expanded': descriptionIsExpanded}" v-html="projDescription">
        </div>
        <a href="#" @click.prevent="qwe">Read More</a>  
        <div class="mb-4"></div>
        <v-chip v-for="(user, index) in assignedUsers" :key="'user-'+index">
          <v-avatar class="accent white--text">{{user.slice(0, 1).toUpperCase()}}</v-avatar>
          {{user}}
        </v-chip>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed large color="primary mb-2 " style="margin-right: 12px;">Publish</v-btn>
      </v-card-actions>
    </v-card>
       
  </v-container>
</template>

<script>

export default{
  data () {
    return {
      descriptionIsExpanded: false,
      projDescription: `<p>Project description. Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
        <p>Sit rerum consectetur iste dolores dicta impedit eum eligendi aliquid, ratione quae voluptates ducimus. Excepturi est animi similique maiores quam obcaecati nulla deleniti, recusandae, debitis reprehenderit ex adipisci iure, esse magnam neque commodi praesentium hic in aliquid dolorem doloribus.</p>
        <p>Totam, itaque mollitia.</p>
        <p>Project description. Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
        <p>Sit rerum consectetur iste dolores dicta impedit eum eligendi aliquid, ratione quae voluptates ducimus. Excepturi est animi similique maiores quam obcaecati nulla deleniti, recusandae, debitis reprehenderit ex adipisci iure, esse magnam neque commodi praesentium hic in aliquid dolorem doloribus.</p>
        <p>Totam, itaque mollitia.</p>`,
      assignedUsers: [
        'Pavel Kukla',
        'Alex Bill',
        'Aleh Zibulka',
        'Vladimir Kozir'
      ]
    }
  },
  methods: {
    qwe () {
      this.descriptionIsExpanded = !this.descriptionIsExpanded
      console.log(this.descriptionIsExpanded)
    }
  }
}
</script>

<style>
  .elipse-expand{
    transition: all .3s;
    max-height: 120px;
    overflow: hidden;
    position: relative;
    font-size: 16px;
  }
  .elipse-expand:after{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20px;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,ffffff+48,ffffff+100&0+0,1+68 */
    background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.71) 48%, rgba(255,255,255,1) 68%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,0.71) 48%,rgba(255,255,255,1) 68%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0.71) 48%,rgba(255,255,255,1) 68%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
  }
  .elipse-expand p{
    font-size: 16px;
  }
  .elipse-expand:not(.is-expanded) p{
    text-overflow: ellipsis;
    
  }
  .elipse-expand.is-expanded{
    max-height: 3000px;
  }
</style>
