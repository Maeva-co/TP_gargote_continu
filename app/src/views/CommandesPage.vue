<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Commandes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Actualisation en glissant vers le bas -->
      <ion-refresher slot="fixed" @ionRefresh="chargerCommandes($event)">
        <ion-refresher-content
          pulling-text="Tirer pour actualiser"
          refreshing-spinner="circles"
          refreshing-text="Actualisation..."
        />
      </ion-refresher>

      <!-- Chargement -->
      <div v-if="chargement" class="ion-text-center">
        <ion-spinner name="crescent" />
        <p>Chargement des commandes...</p>
      </div>

      <!-- Erreur -->
      <ion-text v-else-if="erreur" color="danger">
        <p class="ion-text-center">{{ erreur }}</p>
      </ion-text>

      <!-- Aucune commande -->
      <div v-else-if="commandes.length === 0" class="ion-text-center">
        <ion-text color="medium">
          <h2>Aucune commande</h2>
          <p>Vos commandes apparaîtront ici.</p>
        </ion-text>
      </div>

      <!-- Liste des commandes -->
      <ion-list v-else>

        <ion-card v-for="commande in commandes" :key="commande.id">

          <ion-card-header>
            <ion-card-title>
              Commande n°{{ commande.id }}
            </ion-card-title>

            <ion-card-subtitle>
              Table {{ commande.table }}
              <br>
              {{ formatDate(commande.created_at) }}
            </ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>

            <!-- Détail des plats -->
            <p v-for="ligne in commande.lignes" :key="ligne.plat_id">
              {{ ligne.quantite }} × {{ ligne.plat.nom }}
            </p>

            <!-- Total -->
            <h3 class="ion-margin-top">
              Total : {{ formatAriary(commande.total) }}
            </h3>

            <!-- Statut -->
            <ion-badge color="success">
              {{ commande.statut }}
            </ion-badge>

          </ion-card-content>
        </ion-card>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';

import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText,
  IonList, IonItem, IonLabel, IonBadge, IonRefresher,
  IonRefresherContent, IonSpinner, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent
} from '@ionic/vue';

import { onIonViewWillEnter } from '@ionic/vue';

import api from '@/services/api';
import { formatAriary, formatDate } from '@/utils/format';


const commandes = ref([]);
const chargement = ref(false);
const erreur = ref('');

async function chargerCommandes(event = null) {
  chargement.value = true;
  erreur.value = '';

  try {
    const resultat = await api.getCommandes();
    console.log('Commandes reçues :', resultat);
    commandes.value = resultat;
  } catch (e) {
    erreur.value = e.message;
  } finally {
    chargement.value = false;
    if (event) {
      await event.target.complete();
    }
  }
}

onIonViewWillEnter(() => {
  chargerCommandes();
});

</script>
