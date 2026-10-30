<template>
  <ion-page>
    <ion-header>
      <!-- ca c'est la barre dont Mr parle -->
      <ion-toolbar color="primary">
        <ion-title>Plat Detail</ion-title>
        <ion-buttons slot="start">
            <ion-back-button default-href="/tabs/menu" text="Menu" />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card v-if="plat">
        <ion-card-header>
          <ion-card-subtitle>
            {{ plat.categorie.nom }}
          </ion-card-subtitle>

          <ion-card-title>
            {{ plat.nom }}
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
            {{ plat.description }}
        </ion-card-content>

        <ion-button
            expand="block"
            :disabled="!plat?.disponible"
            @click="ajouterAuPanier"
            >
            Ajouter au panier
            </ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { 
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText,
    IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent 
} from '@ionic/vue';

import { useRoute } from 'vue-router';
import { ref, onMounted} from 'vue';

import api from '@/services/api';

import { usePanier } from '@/composables/usePanier';
import { useIonRouter } from '@ionic/vue';

const route = useRoute();
const id = route.params.id;
const plat = ref(null);

const { ajouter } = usePanier();
const ionRouter = useIonRouter();

console.log('Identifiant du plat :', id);

async function chargerPlat() {
  try {
    plat.value = await api.getPlat(id);
  } catch (e) {
    console.error('Erreur lors du chargement du plat :', e);
  }
}

function ajouterAuPanier() {
  ajouter(plat.value);
  ionRouter.back();
}

onMounted(chargerPlat);

</script>