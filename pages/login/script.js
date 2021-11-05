import {mapGetters} from 'vuex';

export default {
  layout: 'blank',
  data: () => ({
    formData : {
      email: process.env.NODE_ENV == 'development' ? 'diogo.franco85@gmail.com' : '',
      password: process.env.NODE_ENV == 'development' ? '150398' : ''
    },
    valid: true,
    e1: true,
    loading: false,
    passwordRules: [
      (v) => !!v || 'Campo Senha é obrigatório',
    ],
    emailRules: [
      (v) => !!v || 'Campo E-mail é obrigatório',
      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Endereço de e-mail não é válido'
    ]
  }),

  computed: {
    ...mapGetters({
      'auth': 'Auth/getAuth',
      'user': 'Auth/getUser',
    })
  },

  watch: {
    auth(value){
      if(value === true){
        this.$router.push({name: 'home'});
      }
    },

    // user(value){
    //   console.log('user', value);
    // }
  },

  methods: {
    loginRequest(){
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store.dispatch('Auth/GET_AUTHENTICATE', this.formData)
          .then( () => {
            this.loading = false;
            this.$router.push('/home');
          });
      }else{
        this.loading = false;
      }
    }
  }
}
