/*
 * 04 — GÉNÉRIQUES
 */

// A. premier : renvoie le premier élément d'un tableau, ou undefined s'il est vide.
//    Elle doit marcher pour un tableau de Plat, de nombres, de textes...
//    premier([3, 4]) a le type  number | undefined
//    premier(plats)  a le type  Plat | undefined
export function premier<T>(liste: T[]): T | undefined {
  // TODO : remplacez les any par un paramètre de type <T>
  return liste[0];
}

// B. Depot<T> : stocke des éléments qui ont TOUS un id numérique.
//    - ajouter(element)  : ajoute l'élément
//    - trouver(id)       : renvoie l'élément ou undefined
//    - tous()            : renvoie une COPIE du tableau (modifier la copie ne change pas le dépôt)
//    Contrainte : new Depot<number>() doit provoquer une erreur de compilation.
//    Indice : <T extends { id: number }>
export class Depot<T extends { id: number }> {
  // TODO
  private elements: T[] = [];

  ajouter(element: T) {
    this.elements.push(element);
  }

  trouver(id: number): T | undefined {
    return this.elements.find(el => el.id === id);
  }

  tous(): T[] {
    return [...this.elements];
  }
}