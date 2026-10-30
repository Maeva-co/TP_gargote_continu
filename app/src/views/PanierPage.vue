<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Panier</ion-title>
        <!-- Bouton Vider -->
        <ion-buttons slot="end" v-if="lignes.length > 0">
          <ion-button @click="vider">
            Vider
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Panier vide -->
      <div v-if="lignes.length === 0" class="ion-text-center">
        <ion-text color="medium">
          <h2>Votre panier est vide</h2>
          <p>Ajoutez des plats depuis le menu.</p>
        </ion-text>
        <ion-button router-link="/tabs/menu" expand="block">
          Voir le menu
        </ion-button>
      </div>

      <!-- Panier avec des articles -->
      <div v-else>
        <ion-list>
          <ion-item v-for="ligne in lignes" :key="ligne.plat.id">
            <ion-label>
              <h2>{{ ligne.plat.nom }}</h2>
              <p>
                {{ formatAriary(ligne.plat.prix) }} × {{ ligne.quantite }}
              </p>
              <p>
                Sous-total :
                {{ formatAriary(Number(ligne.plat.prix) * ligne.quantite) }}
              </p>
            </ion-label>

            <!-- Diminuer la quantité -->
            <ion-button
              slot="end"
              fill="clear"
              @click="changerQuantite(ligne.plat.id, -1)"
            >
              <ion-icon :icon="removeCircleOutline" />
            </ion-button>

            <!-- Augmenter la quantité -->
            <ion-button
              slot="end"
              fill="clear"
              @click="changerQuantite(ligne.plat.id, 1)"
            >
              <ion-icon :icon="addCircleOutline" />
            </ion-button>
          </ion-item>
        </ion-list>

        <!-- Total -->
        <ion-item>
          <ion-label>
            <h2><strong>Total</strong></h2>
          </ion-label>
          <ion-text color="primary">
            <h2>
              <strong>{{ formatAriary(total) }}</strong>
            </h2>
          </ion-text>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText,
  IonButtons, IonButton, IonList, IonItem, IonLabel, IonIcon
} from '@ionic/vue';

import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';

import { usePanier } from '@/composables/usePanier';
import { formatAriary } from '@/utils/format';


const {
  lignes,
  changerQuantite,
  vider,
  total
} = usePanier();

</script>

