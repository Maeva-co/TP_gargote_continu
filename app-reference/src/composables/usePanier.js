import { ref, computed } from 'vue';

// L'état est déclaré EN DEHORS de la fonction :
// toutes les pages qui appellent usePanier() partagent le même panier.
const lignes = ref([]); // [{ plat, quantite }]

export function usePanier() {
  function ajouter(plat) {
    const ligne = lignes.value.find((l) => l.plat.id === plat.id);
    if (ligne) {
      ligne.quantite++;
    } else {
      lignes.value.push({ plat, quantite: 1 });
    }
  }

  function changerQuantite(platId, delta) {
    const ligne = lignes.value.find((l) => l.plat.id === platId);
    if (!ligne) return;
    ligne.quantite += delta;
    if (ligne.quantite <= 0) {
      lignes.value = lignes.value.filter((l) => l.plat.id !== platId);
    }
  }

  function vider() {
    lignes.value = [];
  }

  const nombreArticles = computed(() => lignes.value.reduce((n, l) => n + l.quantite, 0));
  const total = computed(() => lignes.value.reduce((t, l) => t + l.plat.prix * l.quantite, 0));

  return { lignes, ajouter, changerQuantite, vider, nombreArticles, total };
}
