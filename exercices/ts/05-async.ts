/*
 * 05 — ASYNCHRONE, unknown ET GARDES DE TYPE
 * Les données qui arrivent du réseau ne sont pas garanties : on les reçoit
 * en « unknown » et on VÉRIFIE avant de les utiliser.
 */
import type { Plat } from './02-interfaces.ts';

// A. Garde de type : renvoie true si x a un id (nombre), un nom (texte) et un prix (texte).
//    Le type de retour  « x is Plat »  dit au compilateur : « si je renvoie true, x est un Plat ».
export function estPlat(x: unknown): x is Plat {
  // TODO   indice : typeof x === 'object' && x !== null && 'id' in x && ...
}

// B. Dans un catch, l'erreur est de type unknown. Renvoyez son message si c'est une Error,
//    sinon 'Erreur inconnue'.
export function messageErreur(e: unknown): string {
  // TODO
}

// C. source() renvoie des données non vérifiées.
//    Renvoyez uniquement les éléments qui sont de vrais plats,
//    ou [] si source() ne renvoie pas un tableau.
export async function chargerPlats(source: () => Promise<unknown>): Promise<Plat[]> {
  // TODO
}
