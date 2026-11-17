<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Panier</ion-title>
        <ion-buttons slot="end">
          <ion-button v-if="lignes.length" @click="vider">Vider</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div v-if="lignes.length === 0" class="ion-padding ion-text-center">
        <ion-text color="medium"><p>Votre panier est vide.</p></ion-text>
        <ion-button router-link="/tabs/menu" fill="outline">Voir le menu</ion-button>
      </div>

      <template v-else>
        <ion-list>
          <ion-item v-for="ligne in lignes" :key="ligne.plat.id">
            <ion-label>
              <h2>{{ ligne.plat.nom }}</h2>
              <p>{{ formatAriary(ligne.plat.prix) }} × {{ ligne.quantite }}</p>
            </ion-label>
            <ion-buttons slot="end">
              <ion-button aria-label="Retirer un" @click="changerQuantite(ligne.plat.id, -1)">
                <ion-icon slot="icon-only" :icon="removeCircleOutline" />
              </ion-button>
              <span class="quantite">{{ ligne.quantite }}</span>
              <ion-button aria-label="Ajouter un" @click="changerQuantite(ligne.plat.id, 1)">
                <ion-icon slot="icon-only" :icon="addCircleOutline" />
              </ion-button>
            </ion-buttons>
          </ion-item>

          <ion-item lines="none">
            <ion-label><strong>Total</strong></ion-label>
            <ion-text slot="end" color="primary"><strong>{{ formatAriary(total) }}</strong></ion-text>
          </ion-item>
        </ion-list>

        <div class="ion-padding">
          <ion-input
            v-model="table"
            type="number"
            label="Numéro de table"
            label-placement="floating"
            fill="outline"
            min="1"
            max="20"
            :class="{ 'ion-invalid ion-touched': erreurTable }"
            :error-text="erreurTable"
          />
          <ion-button expand="block" class="ion-margin-top" :disabled="envoi" @click="confirmer">
            Envoyer la commande
          </ion-button>
        </div>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonButtons, IonButton, IonIcon, IonText, IonInput,
  alertController, toastController, loadingController, useIonRouter,
} from '@ionic/vue';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import api from '@/services/api';
import { formatAriary } from '@/utils/format';
import { usePanier } from '@/composables/usePanier';

const { lignes, changerQuantite, vider, total } = usePanier();
const ionRouter = useIonRouter();

const table = ref('');
const erreurTable = ref('');
const envoi = ref(false);

async function confirmer() {
  erreurTable.value = '';
  const alerte = await alertController.create({
    header: 'Confirmer la commande',
    message: `Table ${table.value || '?'} : ${formatAriary(total.value)}`,
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
  const chargement = await loadingController.create({ message: 'Envoi...' });
  await chargement.present();
  try {
    const commande = await api.creerCommande({
      table: Number(table.value),
      lignes: lignes.value.map((l) => ({ plat_id: l.plat.id, quantite: l.quantite })),
    });
    vider();
    table.value = '';
    await afficherToast(`Commande n°${commande.id} envoyée`, 'success');
    ionRouter.navigate('/tabs/commandes', 'forward', 'replace');
  } catch (e) {
    if (e.statut === 422 && e.details.table) {
      erreurTable.value = e.details.table;
    } else {
      await afficherToast(e.message, 'danger');
    }
  } finally {
    await chargement.dismiss();
    envoi.value = false;
  }
}

async function afficherToast(message, color) {
  const toast = await toastController.create({ message, color, duration: 2500, position: 'top' });
  await toast.present();
}
</script>

<style scoped>
.quantite {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}
</style>
