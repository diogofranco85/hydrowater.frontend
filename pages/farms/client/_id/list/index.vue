<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <p>
        <strong> Carregando ... </strong>
      </p>
    </v-overlay>
    <TopBar title="Gerenciamento de outorgas" />
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <!-- <v-card class="ma-3" outlined>
      <h3 class="topbar_border_bottom pa-3 blue lighten-5 text--grey">
        Dados do cliente
      </h3>
      <v-row class="mr-2 ml-2 mt-1">
        <v-col md="4">
          <p>
            <strong>Cliente: </strong><br />
            {{ clientData.name }}
          </p>
        </v-col>
        <v-col md="2">
          <p>
            <strong>CNPJ: </strong><br />
            {{ clientData.document }}
          </p>
        </v-col>

        <v-col md="2">
          <p>
            <strong>Telefone: </strong><br />
            {{ clientData.phone1 }}
          </p>
        </v-col>

        <v-col md="2">
          <p>
            <strong>Telefone: </strong><br />
            {{ clientData.phone2 }}
          </p>
        </v-col>

        <v-col md="2">
          <p>
            <strong>Cidade: </strong><br />
            {{ clientData.city }}
          </p>
        </v-col>
      </v-row>
    </v-card> -->
    <Grid
      :headers="headerGrid"
      :toolbarColor="'grey darken-1'"
      :items="datagrid"
      :titulo="'Listagem de fazendas'"
      :actions="gridActions"
      :handleBtnNovo="newData"
      :handleBtnAtualizar="loadData"
      :evento1="editData"
      :evento2="toPage"
      :evento3="viewData"
      :evento4="toOutorgas"
      :loading="loading"
    ></Grid>
    <Form
      :open="formModal"
      title="Formulário de outorgas"
      :actClose="() => (formModal = false)"
      :editable="formActionInsertOrEdit"
      :actSave="saveData"
    >
      <validation-observer ref="formRef">
        <v-form @submit.prevent="saveData">
          <v-row>
            <v-col md="2">
              <v-text-field
                label="id"
                outlined
                disabled
                v-model="formData.id"
              />
            </v-col>
            <v-col md="10">
              <validation-provider
                vid="formData.name"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Fazenda"
                  outlined
                  v-model="formData.name"
                  autofocus
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="3">
              <validation-provider
                vid="formData.latitude"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Latitude"
                  outlined
                  v-model="formData.latitude"
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="3">
              <validation-provider
                vid="formData.longitude"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Longitude"
                  outlined
                  v-model="formData.longitude"
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>

            <v-col md="6">
              <validation-provider
                vid="formData.responsible"
                v-slot="{ errors }"
                rules="required"
              >
                <v-text-field
                  label="Responsavél"
                  outlined
                  v-model="formData.responsible"
                  :disabled="!formActionInsertOrEdit"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </Form>
    <!-- autorgas -->
  </div>
</template>

<script src="~/services/farms/client/script.js"></script>
