/*
 * 03 — FONCTIONS TYPÉES
 */
import type { Plat } from './02-interfaces.ts';

// A. Paramètre par défaut.
//    formatPrix(500) -> "500 Ar"      formatPrix(2, '€') -> "2 €"
export function formatPrix(prix: number, devise: string = 'Ar'): string {
  // TODO : ajoutez les paramètres (montant, devise valant 'Ar' par défaut)
  return `${prix} ${devise}`;
}

// B. Paramètre facultatif.
//    Renvoie les plats dont le nom contient « mot » (sans tenir compte des majuscules).
//    Si seulementDisponibles vaut true, ne garde que les plats disponibles.
export function rechercher(plats: Plat[], mot: string, seulementDisponibles?: boolean): Plat[] {
  // TODO : (plats, mot, seulementDisponibles?) -> tableau de Plat
  plats = plats.filter(plat => plat.nom.toLowerCase().includes(mot.toLowerCase()));
  if (seulementDisponibles) {
    plats = plats.filter(plat => plat.disponible);
  }
  return plats;
}

// C. Type union et rétrécissement (narrowing).
//    versNombre('6000.00') -> 6000      versNombre(12) -> 12
//    Utilisez  typeof valeur === 'string'  pour distinguer les deux cas.
export function versNombre(valeur: number | string): number {
  // TODO
  if (typeof valeur === 'string') {
    return parseFloat(valeur);
  }
  else {
    return valeur;
  }
}
