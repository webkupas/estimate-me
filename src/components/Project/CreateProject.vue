<template>
  <v-container style="max-width: 900px">
    <v-card class="mt-4 mb-4">
      <v-card-title class="primary">
        <h1 class="display-1 white--text">New Project</h1>
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
            v-model="projectFollowers"
            :label="label"
            :loading="usersLoading"
            chips
            multiple
            :items="workspaceFollowers"
            item-text="name"
            item-value="id"
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
                <v-avatar class="accent white--text">{{ data.item.name.slice(0, 1).toUpperCase() }}</v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
          </v-select>
        </v-card-text>
        <v-card-actions>
            <div class="auth-preloader" :class="{'is-visible': (pending && valid && !dialog )}">
              <v-progress-circular indeterminate :size="30" color="primary" class="mr-2"></v-progress-circular>
            </div>
          <v-spacer></v-spacer>
          <v-btn depressed large color="primary mb-2 " style="margin-right: 12px;" @click="publish" :disabled="!valid || pending">Publish</v-btn>
        </v-card-actions>
      </v-form>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Congrats!</v-card-title>
          <v-card-text>New project <strong>"{{title}}"</strong> was successfully created</v-card-text>
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
  import { mapGetters } from 'vuex'
  export default{
    data () {
      return {
        valid: false,
        pending: false,
        dialog: false,
        title: '',
        titleRules: [
          v => !!v || 'Title is required'
        ],
        privateInfo: '',
        publicInfo: '',
        projectFollowers: [],
        usersLoading: true,
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
    computed: {
      ...mapGetters({
        workspace: 'workspace/workspace',
        appIsLoaded: 'appIsLoaded',
        workspaceFollowers: 'workspace/workspaceFollowers'
      }),
      label () {
        return this.usersLoading ? 'Loading...' : 'Assigned users'
      }
    },
    methods: {
      publish () {
        if (this.$refs.form.validate()) {
          this.pending = true // eslint-disable-next-line

          const data = {
            title: this.title,
            privateInfo: this.privateInfo,
            publicInfo: this.publicInfo,
            followers: this.projectFollowers
          } // eslint-disable-next-line
          
          if (data.title) {
            this.$store.dispatch('project/createProject', data)
              .then(() => { this.dialog = true })
          }
        }
      }
    },
    watch: {
      dialog (val) {
        if (!val) {
          this.pending = false
          this.$router.push('/')
        }
      },
      appIsLoaded (val) {
        if (val) {
          console.log('app is loaded', this.workspace.id)
          if (this.workspace.followers.length === 0 && this.workspace.id) {
            this.$store.dispatch('workspace/setWorkspaceFollowers', this.workspace.id)
              .then(() => { this.usersLoading = false })
          } else {
            this.usersLoading = false
          }
        }
      }
    },
    components: {
      'est-vue-editor': VueEditor
    },
    created () {
      if (this.workspace.followers.length === 0) {
        if (this.workspace.id && this.appIsLoaded) {
          this.$store.dispatch('workspace/setWorkspaceFollowers', this.workspace.id)
          .then(() => { this.usersLoading = false })
        }
      } else {
        this.usersLoading = false
      }
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
  .auth-preloader{
    margin: 0 0 5px 10px;
    opacity: 0;
    transition: opacity .3s;
  }
  .auth-preloader.is-visible{
    opacity: 1;
  }
</style>


