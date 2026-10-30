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

        <ion-input v-model="table" type="number" label="Numéro de table"
           label-placement="floating" fill="outline"
           :class="{ 'ion-invalid ion-touched': erreurTable }"
           :error-text="erreurTable" />
        <ion-button expand="block" class="ion-margin-top" :disabled="envoi" @click="confirmer">
          Envoyer la commande
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText,
  IonButtons, IonButton, IonList, IonItem, IonLabel, IonIcon, IonInput,
  loadingController, toastController, useIonRouter, alertController
} from '@ionic/vue';

import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';

import { usePanier } from '@/composables/usePanier';
import { formatAriary } from '@/utils/format';

import api from '@/services/api';

import { ref } from 'vue';

const {
  lignes,
  changerQuantite,
  vider,
  total
} = usePanier();

const ionRouter = useIonRouter();

const table = ref('');
const erreurTable = ref('');
const envoi = ref(false);

async function confirmer() {
  const alerte = await alertController.create({
    header: 'Confirmer la commande',
    message: `Table ${table.value} : ${formatAriary(total.value)}`,
    buttons: [
      { text: 'Annuler', role: 'cancel' },
      { text: 'Envoyer', role: 'confirm' },
    ],
  });
  await alerte.present();
  const { role } = await alerte.onDidDismiss();
  if (role === 'confirm') await envoyer();
}

async function envoyer() {
  envoi.value = true;
  let chargement;
  try {
    // 1. Afficher l'indicateur de chargement
    chargement = await loadingController.create({
      message: 'Envoi de la commande...'
    });

    await chargement.present();

    // 2. Construire le corps de la commande
    const commande = {
      table: Number(table.value),
      lignes: lignes.value.map(ligne => ({
        plat_id: ligne.plat.id,
        quantite: ligne.quantite
      }))
    };

    // 3. Envoyer la commande à l'API
    const resultat = await api.creerCommande(commande);

    // 4. En cas de succès : vider le panier et le champ
    vider();
    table.value = '';
    erreurTable.value = '';

    // Afficher un toast vert
    const toast = await toastController.create({
      message: `Commande n°${resultat.id} envoyée`,
      duration: 2500,
      color: 'success',
      position: 'bottom'
    });

    await toast.present();

    // Rediriger vers l'onglet Commandes
    ionRouter.navigate('/tabs/commandes', 'forward', 'replace');

  } catch (e) {
    // 5. Gérer l'erreur 422 concernant la table
    if (e.statut === 422 && e.details?.table) {
      const message = e.details.table;
      erreurTable.value = Array.isArray(message)
        ? message.join(' ')
        : message;
    } else {
      // 6. Pour les autres erreurs : toast rouge
      const toast = await toastController.create({
        message: e.message,
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
      await toast.present();
    }
  } finally {
    // 7. Toujours fermer l'indicateur de chargement
    if (chargement) {
      await chargement.dismiss();
    }
    envoi.value = false;
  }
}


</script>

