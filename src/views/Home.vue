<template>
  <div class="home">
    <h3>Search!</h3>
    <b-container>
      <b-form-input v-model="searchTerm" v-on:keyup.enter="search(searchTerm)"></b-form-input>
      <b-input-group-append><b-button variant="outline-success" type="submit" v-on:click="search(searchTerm)">Search</b-button></b-input-group-append>
    </b-container>
    <div class="text-center">
      <b-spinner v-if="loading"></b-spinner>
    </div>
    <b-container>
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          class="justify-content-center"
          style="margin-top: 15px"
          first-text="First"
          last-text="Last">
      </b-pagination>
    </b-container>
    <b-container>
<!--      <pre>{{this.search_results}}</pre>-->
      <b-table
          hover
          bordered
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
          :items="search_results"
          :fields="fields"
          :key="search_results.id"
          @row-clicked="info">
      </b-table>
    </b-container>
    <b-modal :id="modalInfo.id" :title="modalInfo.title" ok-only @hide="resetModal()" ref="modal" data-target="myModal" rel="preload">
      <template>
        <div>
          <p v-if="this.modalInfo.content.desc">{{this.modalInfo.content.desc}}</p>
          <p v-else>No information provided :( </p>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
// import {Octokit} from '@octokit/core'
//
// const octokit = new Octokit({auth: ''})

export default {
  name: 'Home',
  data() {
    return{
      searchTerm: '',
      search_results: [],
      loading: false,
      fields: [{
        key: 'name',
        label: 'Name'
      }, {
        key: 'race',
        label: 'Strain'
      }],
      currentPage: 1,
      perPage: 5,
      modalInfo: {
        id: '',
        title: '',
        content: ''
      },
      apiKey: '',
      SECRETS: ''
    }
  },
  methods: {
    // async getKey() { //on mount
    //   try{
    //     this.SECRETS = await octokit.request('GET /repos/owen95t/strains_bv/actions/secrets/KEY').then(response => {
    //       console.log("Response: "+response)
    //     }).catch(apiErr => {
    //       console.log("getKey Error: " + apiErr)
    //     })
    //   }catch (e1){
    //     console.log("Octokit Request Error: " + e1)
    //   }
    // },
    async search(term) {
      this.loading = true;
      try{
        await axios.get('http://strainapi.evanbusse.com/hoxE2wV/strains/search/name/'+term).then(response => {
          if (response.data) {
            this.search_results = response.data
            console.log(this.search_results)
            this.loading = false;
          }
        }).catch(error => {
          console.log(error)
        })
      }catch (e2) {
        console.log("Request Error: " + e2)
      }
    },
    info(item) {
      this.modalInfo.content = item
      this.modalInfo.id = item.id
      this.modalInfo.title = item.name + " - " + item.race
      this.$root.$emit('bv::show::modal', this.modalInfo.id)
    },
    resetModal() {
      this.modalInfo = {id: '', title: '', content: ''}
    }
  },
  mounted() {
    //this.getKey()
  },
  computed: {
    rows() {
      return this.search_results.length
    }
  }
}
</script>
