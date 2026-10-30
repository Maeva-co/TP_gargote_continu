<template>
  <!-- ion-page : l'enveloppe obligatoire de chaque page -->
  <ion-page>
    <!-- En-tête fixe en haut de l'écran -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu du jour</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Zone qui défile -->
    <ion-content>
      <ion-refresher slot="fixed" @ion-refresh="rafraichir">
        <ion-refresher-content />
      </ion-refresher>

      <!-- 1. Chargement en cours -->
      <div v-if="chargement" class="ion-text-center ion-padding">
        <ion-spinner />
      </div>

      <!-- 2. Erreur -->
      <div v-else-if="erreur" class="ion-padding">
        <ion-text color="danger">
          <p>{{ erreur }}</p>
        </ion-text>
        <ion-button expand="block" @click="charger">Réessayer</ion-button>
      </div>

      <!-- Recherche -->
      <ion-toolbar>
        <ion-searchbar v-model="recherche" placeholder="Rechercher un plat" :debounce="250" />
      </ion-toolbar>

      <ion-segment v-model="categorieChoisie" scrollable @ion-change="charger">
        <ion-segment-button value="toutes"><ion-label>Tout</ion-label></ion-segment-button>
        <ion-segment-button v-for="c in categories" :key="c.id" :value="String(c.id)">
          <ion-label>{{ c.nom }}</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- 3. La liste des plats -->
      <ion-list v-if="platsFiltres.length > 0">
        <ion-item v-for="plat in platsFiltres" :key="plat.id" :router-link="`/tabs/menu/${plat.id}`">
          <ion-label>
            <h2>{{ plat.nom }}</h2>
            <!-- <p>{{ plat.categorie.nom }}</p> -->
            <p>{{ plat.description }}</p>
            <ion-text color="primary">
              <p>
                {{ formatAriary(plat.prix) }} 
                <ion-badge v-if="!plat.disponible" color="medium">Épuisé</ion-badge>
              </p>
            </ion-text>
          </ion-label>
          <ion-button
            slot="end"
            fill="clear"
            :disabled="!plat.disponible"
            @click.stop.prevent="ajouterAuPanier(plat)"
          >
            <ion-icon slot="icon-only" :icon="addCircleOutline" />
          </ion-button>
          <!-- <ion-note slot="end">{{ formatAriary(plat.prix) }}</ion-note> -->
        </ion-item>
      </ion-list>
      <ion-list v-else>
          <p>Aucun plat ne correspond.</p>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonSpinner, IonText, IonButton, 
  IonBadge, IonSearchbar, IonSegment, IonSegmentButton, IonRefresher, IonRefresherContent,
  IonIcon, toastController
} from '@ionic/vue';
import api from '@/services/api';
import { formatAriary } from '@/utils/format';

import { onUnmounted } from 'vue';
import { onIonViewWillEnter, onIonViewDidLeave } from '@ionic/vue';

import { addCircleOutline } from 'ionicons/icons';
import { usePanier } from '@/composables/usePanier';

const plats = ref([]);
const chargement = ref(true);
const erreur = ref(null);

const recherche = ref('');

const categories = ref([]);
const categorieChoisie = ref('toutes');

const { ajouter } = usePanier();

const platsFiltres = computed(() =>
  plats.value.filter(p =>
    p.nom.toLowerCase().includes(recherche.value.toLowerCase())
  )
)

async function ajouterAuPanier(plat) {
  ajouter(plat);

  const toast = await toastController.create({
    message: `${plat.nom} ajouté au panier`,
    duration: 1500,
    position: 'top',
    color: 'secondary',
  });

  await toast.present();
}


async function charger() {
  chargement.value = true;
  erreur.value = null;
  try {
    categories.value = await api.getCategories();
    plats.value = await api.getPlats(
      categorieChoisie.value === 'toutes' ? undefined : categorieChoisie.value
    );
  } catch (e) {
    erreur.value = "Impossible de joindre l'API. Est-elle lancée ?";
    console.error(e);
  } finally {
    chargement.value = false;
  }
}

async function rafraichir(event) {
  await charger();
  event.target.complete(); // arrête l'animation
}

onMounted(charger);

onMounted(() => console.log('MENU onMounted'));
onUnmounted(() => console.log('MENU onUnmounted'));
onIonViewWillEnter(() => console.log('MENU ionViewWillEnter'));
onIonViewDidLeave(() => console.log('MENU ionViewDidLeave'));

</script>
