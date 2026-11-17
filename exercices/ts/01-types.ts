/*
 * 01 — TYPES DE BASE
 * Lancez  npm run ts:types  : le compilateur signale les erreurs de ce fichier.
 * Règle du jeu : on corrige les VALEURS ou on AJOUTE des types.
 * Interdit : any, @ts-ignore, et supprimer une annotation.
 */

// A. Survolez nomGargote dans VS Code : quel type TypeScript a-t-il deviné ?
//    Écrivez ensuite l'annotation explicitement.
export const nomGargote = 'Chez Rado';

// B. Trois erreurs à corriger (en changeant la valeur, pas le type)
export const prix: number = '6000';
export const disponible: boolean = 1;
export const quantites: number[] = [1, '2', 3];

// C. Les paramètres sont implicitement « any » : typez-les, ainsi que le retour.
//    prixAvecService(6000, 0.1)  ->  6600
export function prixAvecService(prix, taux) {
  return prix * (1 + taux);
}
