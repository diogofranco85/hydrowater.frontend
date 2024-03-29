import { mapGetters } from "vuex";

export default {
  middleware: ['auth'],
  data: () => ({
    datagrid: [],
    formRef: null,
    formValid: null,
    formActionInsertOrEdit: true,
    formAction: 'new',
    formModal: false,
    clientData: {
      name: '',
      id: '',
      document: '',
      phone1: '',
      city: '',
    },
    formData: {
      id: null,
      idClient: '',
      name: '',
      responsible: '',
      latitude: '',
      longitude: ''
    },

    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Clientes', to: "/clients", disabled: false },
      { text: 'Fazendas', to: '/farms', disabled: true },
    ],

    itemsGrid: [],
    headerGrid: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Fazenda', value: 'name', class: 'blue-grey lighten-4' },
      { text: 'Latitude', value: 'latitude', class: 'blue-grey lighten-4' },
      { text: 'Longitude', value: 'longitude', class: 'blue-grey lighten-4' },
      { text: 'responsible', value: 'responsible', class: 'blue-grey lighten-4' },
      { text: 'Ações', value: "acoes", class: "blue-grey lighten-4", sortable: false }
    ],
    gridActions: [
      {
        id: 1,
        icon: 'mdi-magnify',
        evento: 3,
        tooltip: 'Visualizar Registro',
        color: "blue-grey darken-80"
      },
      {
        id: 2,
        icon: 'mdi-pencil',
        evento: 1,
        tooltip: 'Editar Registro',
        color: "blue darken-40"
      },
      {
        id: 4,
        icon: 'mdi-format-list-checkbox',
        evento: 4,
        tooltip: 'Cadastro de outorgas',
        color: "blue-grey darken-80"
      },
      {
        id: 3,
        icon: 'mdi-arrow-right',
        evento: 2,
        tooltip: 'Gerenciar Fazendas',
        color: "blue-grey darken-80"
      }
    ]
  }),

  computed: {
    ...mapGetters({
      itemClient: 'Farm/getClient',
      dataStore: 'Farm/getData',
      itemStore: 'Farm/getItem',
      message: 'Farm/getMessage',
      error: 'Farm/getError',
      loading: 'Farm/getLoading',
    })
  },

  watch: {
    itemClient(value) {
      if (value !== {}) {
        this.clientData = { ...value };
        this.loadDataGrid();
      }
    },

    itemStore(value) {
      if (value !== {}) {
        this.formData.id = value.id;
        this.formData.idClient = value.idClient;
        this.formData.name = value.name;
        this.formData.responsible = value.responsible;
        this.formData.latitude = value.latitude;
        this.formData.longitude = value.longitude;
        this.formModal = true
      }
    },

    dataStore(value) {
      if (value !== []) {
        this.datagrid = value;
      }
    },

    message(value) {
      if (value !== '') {
        if (this.error === true) {
          this.$swal.fire({
            type: 'error',
            title: 'Notificação do sistema',
            text: value
          })
        } else {
          this.$swal.fire({
            type: 'success',
            title: 'Notificação do sistema',
            text: value
          });
          this.formModal = false;
        }

        this.loadData();
      }

      this.$store.dispatch('Farm/LIMPAR_MENSAGEM');
      this.loadDataGrid();
    },
  },

  async mounted() {
    this.loadData();
  },

  methods: {

    clearForm() {
      this.formData.id = null;
      this.formData.idClient = null;
      this.formData.name = null;
      this.formData.responsible = null;
      this.formData.latitude = null;
      this.formData.longitude = null;

      if (this.$refs.formRef)
        this.$refs.formRef.reset();
    },

    loadData() {
      const { id } = this.$route.params;
      if (!id) {
        this.$router.push('/clients');
      }
      this.$store.dispatch('Farm/GET_CLIENT', id);
    },

    loadDataGrid() {
      const { id } = this.$route.params;
      this.$store.dispatch('Farm/GET_LIST', { id });
    },

    newData() {
      this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-type-meter' });
      this.formActionInsertOrEdit = true;
      this.clearForm();
      this.formModal = true;
    },

    editData(params) {
      try {
        this.formAction = 'edit'
        this.formActionInsertOrEdit = true;
        this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-type-meter' });
        this.$store.dispatch('Farm/GET_ITEM', params.id);
      } catch (err) {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao processar requisição',
          text: err.message
        })
      }

    },

    viewData(params) {
      this.formActionInsertOrEdit = false;
      this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-type-meter' });
      this.$store.dispatch('Farm/GET_ITEM', params.id);
    },

    async saveData() {

      this.$refs.formRef.validate()
        .then(success => {
          if (success) {
            this.formData.idClient = this.clientData.id;
            this.$store.dispatch('Farm/SET_DATA', {
              typeOperation: this.formAction,
              data: this.formData
            })
          } else {
            this.$swal.fire({
              type: 'error',
              title: 'Validação de formulário',
              text: 'É necessário preencher todos os campos destacados em vermelho'
            })
          }
        })

    },

    toPage(params) {
      this.$router.push(`/farms/${params.id}/manager`)
    },

    toOutorgas(params) {
      this.$router.push(`/farms/${params.id}/outorgas`, {
        clientId: this.$route.params.id
      })
    }
  }
}
