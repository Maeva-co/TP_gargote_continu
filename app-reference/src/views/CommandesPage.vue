<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Commandes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" @ion-refresh="rafraichir">
        <ion-refresher-content />
      </ion-refresher>

      <div v-if="chargement && commandes.length === 0" class="ion-text-center ion-padding">
        <ion-spinner />
      </div>

      <div v-else-if="commandes.length === 0" class="ion-padding ion-text-center">
        <ion-text color="medium"><p>Aucune commande pour le moment.</p></ion-text>
      </div>

      <ion-list v-else>
        <ion-item v-for="c in commandes" :key="c.id">
          <ion-label>
            <h2>Commande n°{{ c.id }} · Table {{ c.table }}</h2>
            <p>{{ formatDate(c.date) }}</p>
            <p>{{ c.lignes.map((l) => `${l.quantite} × ${l.nom}`).join(', ') }}</p>
          </ion-label>
          <div slot="end" class="ion-text-end">
            <ion-note>{{ formatAriary(c.total) }}</ion-note><br />
            <ion-badge color="warning">{{ c.statut }}</ion-badge>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonNote, IonBadge, IonText, IonSpinner, IonRefresher, IonRefresherContent, onIonViewWillEnter,
} from '@ionic/vue';
import api from '@/services/api';
import { formatAriary, formatDate } from '@/utils/format';

const commandes = ref([]);
const chargement = ref(false);

async function charger() {
  chargement.value = true;
  try {
    commandes.value = await api.getCommandes();
  } finally {
    chargement.value = false;
  }
}

async function rafraichir(event) {
  await charger();
  event.target.complete();
}

// Ionic garde les pages en cache : onMounted ne se relance pas quand on revient
// sur l'onglet. onIonViewWillEnter, lui, s'exécute à CHAQUE affichage de la page.
onIonViewWillEnter(charger);
</script>
