<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu du jour</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar v-model="recherche" placeholder="Rechercher un plat" :debounce="250" />
      </ion-toolbar>
      <ion-toolbar>
        <ion-segment v-model="categorieChoisie" scrollable @ion-change="charger">
          <ion-segment-button value="toutes"><ion-label>Tout</ion-label></ion-segment-button>
          <ion-segment-button v-for="c in categories" :key="c.id" :value="String(c.id)">
            <ion-label>{{ c.nom }}</ion-label>
          </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Tirer vers le bas pour recharger -->
      <ion-refresher slot="fixed" @ion-refresh="rafraichir">
        <ion-refresher-content />
      </ion-refresher>

      <div v-if="chargement" class="ion-text-center ion-padding">
        <ion-spinner />
      </div>

      <div v-else-if="erreur" class="ion-padding">
        <ion-text color="danger"><p>{{ erreur }}</p></ion-text>
        <ion-button expand="block" @click="charger">Réessayer</ion-button>
      </div>

      <ion-list v-else>
        <ion-item
          v-for="plat in platsFiltres"
          :key="plat.id"
          :router-link="`/tabs/menu/${plat.id}`"
          detail="false"
        >
          <ion-label>
            <h2>{{ plat.nom }}</h2>
            <p>{{ plat.description }}</p>
            <p>
              <ion-text color="primary"><strong>{{ formatAriary(plat.prix) }}</strong></ion-text>
              <ion-badge v-if="!plat.disponible" color="medium" class="epuise">Épuisé</ion-badge>
            </p>
          </ion-label>
          <ion-button
            slot="end"
            fill="clear"
            :disabled="!plat.disponible"
            aria-label="Ajouter au panier"
            @click.stop.prevent="ajouterAuPanier(plat)"
          >
            <ion-icon slot="icon-only" :icon="addCircleOutline" />
          </ion-button>
        </ion-item>

        <ion-item v-if="platsFiltres.length === 0" lines="none">
          <ion-label class="ion-text-center" color="medium">Aucun plat ne correspond.</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonSpinner, IonText, IonButton, IonBadge, IonIcon, IonSearchbar, IonSegment,
  IonSegmentButton, IonRefresher, IonRefresherContent, toastController,
} from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons';
import api from '@/services/api';
import { formatAriary } from '@/utils/format';
import { usePanier } from '@/composables/usePanier';

const plats = ref([]);
const categories = ref([]);
const chargement = ref(true);
const erreur = ref(null);
const recherche = ref('');
const categorieChoisie = ref('toutes');

const { ajouter } = usePanier();

const platsFiltres = computed(() => {
  const mot = recherche.value.trim().toLowerCase();
  return plats.value.filter((p) => p.nom.toLowerCase().includes(mot));
});

async function charger() {
  chargement.value = true;
  erreur.value = null;
  try {
    const id = categorieChoisie.value === 'toutes' ? null : categorieChoisie.value;
    plats.value = await api.getPlats(id);
  } catch (e) {
    erreur.value = "Impossible de joindre l'API. Est-elle lancée ?";
    console.error(e);
  } finally {
    chargement.value = false;
  }
}

async function rafraichir(event) {
  await charger();
  event.target.complete(); // arrête l'animation du refresher
}

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

onMounted(async () => {
  categories.value = await api.getCategories().catch(() => []);
  await charger();
});
</script>

<style scoped>
.epuise {
  margin-left: 8px;
  vertical-align: middle;
}
</style>
