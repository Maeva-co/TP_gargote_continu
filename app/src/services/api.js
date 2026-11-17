/*
 * Tous les appels à l'API passent par ce fichier.
 * Les pages n'utilisent jamais fetch() directement.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function requete(chemin, options = {}) {
  const reponse = await fetch(BASE_URL + chemin, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const donnees = reponse.status === 204 ? null : await reponse.json();

  if (!reponse.ok) {
    const erreur = new Error(donnees?.message ?? `Erreur HTTP ${reponse.status}`);
    erreur.statut = reponse.status;
    erreur.details = donnees?.erreurs ?? {};
    throw erreur;
  }
  return donnees;
}

export default {
  getCategories() {
    return requete('/categories');
  },

  getPlats(categorieId) {
    return requete(categorieId ? `/plats?categorie=${categorieId}` : '/plats');
  },

  getPlat(id) {
    return requete(`/plats/${id}`);
  },

  getCommandes() {
    return requete('/commandes');
  },

  creerCommande(commande) {
    return requete('/commandes', { method: 'POST', body: JSON.stringify(commande) });
  },
};
