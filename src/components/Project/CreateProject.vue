<template>
  <v-container style="max-width: 900px">
    <v-card class="mt-4 mb-4">
      <v-card-title class="primary">
        <h1 class="display-1 white--text">New Project</h1>
      </v-card-title>
      <v-card-text>
        <v-text-field
            name="title"
            label="Title"
            class="title-new"
            v-model="title"
        ></v-text-field>
        <div class="grey--text text--darken-1 headline mb-2">Private Info</div>
        <est-vue-editor 
            id="private-info" 
            :editorToolbar="customToolbar" 
            class="private-info-new mb-4" 
            v-model="privateInfo"
            placeholder="Current notes will be visible only for you"></est-vue-editor>
        
        <div class="grey--text text--darken-1 headline mb-2" >Public Info</div>
        <est-vue-editor 
            id="public-info" 
            :editorToolbar="customToolbar" 
            class="mb-1" 
            v-model="publicInfo"
            placeholder="Current notes will be visible for everybody"
            ></est-vue-editor>

      </v-card-text>
      <v-card-text>
         <v-select
          v-model="select"
          label="Users"
          chips
          tags
          :items="items"
        >
          <template slot="selection" slot-scope="data">
            <v-chip
              @input="data.parent.selectItem(data.item)"
              class="chip--select-multi"
              :selected="data.selected"
              :disabled="data.disabled"
              :key="JSON.stringify(data.item)"
            >
              <v-avatar class="accent white--text">{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed large color="primary mb-2 " style="margin-right: 12px;" @click="publish">Publish</v-btn>
      </v-card-actions>
    </v-card>
       
  </v-container>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  export default{
    data () {
      return {
        title: '',
        privateInfo: '',
        publicInfo: '',
        select: [],
        items: [
          'Pavel Kukla',
          'Alex Bill',
          'Aleh Zibulka',
          'Vladimir Kozir'
        ],
        customToolbar: [
          [{ 'header': [ false, 1, 2, 3, 4, 5, 6 ] }],
          ['bold', 'italic', 'underline'],        // toggled buttons
          [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          ['link', 'image', 'video']
        ]
      }
    },
    methods: {
      publish () {
        let data = {
          title: this.title,
          privateInfo: this.privateInfo,
          publicInfo: this.publicInfo,
          select: this.select
        }
        console.log(data)
      }
    },
    components: {
      'est-vue-editor': VueEditor
    }
  }
</script>
<style>
  .title-new [name="title"]{
    height: 42px;
    font-size: 30px !important;
  }

  .title-new label{
    font-size: 30px !important;
  }

  .input-group--text-field:not(.input-group--single-line).input-group--focused:not(.input-group--textarea).title-new label,
  .input-group--text-field.input-group--dirty:not(.input-group--textarea).title-new label{
    transform: translateY(-16px) scale(.6);
  }

  .private-info-new .ql-editor{
    min-height: 120px;
  }
</style>


