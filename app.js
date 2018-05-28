/* global Vue, Vuex, axios, FileReader */
;(function () {
  Vue.use(Vuex)

  function randomId () {
    return Math.random()
      .toString()
      .substr(2, 10)
  }

  // app Vue instance
  const app = new Vue({
    store,
    data: {
      file: null
    },
    el: '.todoapp',

    created () {
      this.$store.dispatch('loadTodos')
    },

    // computed properties
    // https://vuejs.org/guide/computed.html
    computed: {
      newTodo () {
        return this.$store.getters.newTodo
      },
      todos () {
        return this.$store.getters.todos
      }
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
      setNewTodo (e) {
        this.$store.dispatch('setNewTodo', e.target.value)
      },

      addTodo (e) {
        e.target.value = ''
        this.$store.dispatch('addTodo')
        this.$store.dispatch('clearNewTodo')
      },

      removeTodo (todo) {
        this.$store.dispatch('removeTodo', todo)
      },

      uploadTodos (e) {
        // either set component data.file to test file
        // or read it off the native event
        const f = this.file || e.target.files[0]
        const reader = new FileReader()
        reader.onload = e => {
          const list = JSON.parse(e.target.result)
          list.forEach(todo => {
            this.$store.commit('ADD_TODO', todo)
          })
        }
        reader.readAsText(f)
      }
    }
  })

  window.app = app
})()
