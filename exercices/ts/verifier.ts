/* Vérification à l'exécution des exercices TypeScript.  Lancer : npm run ts */
import { prixAvecService } from './01-types.ts';
import { romazava, libelleStatut } from './02-interfaces.ts';
import type { Plat } from './02-interfaces.ts';
import { formatPrix, rechercher, versNombre } from './03-fonctions.ts';
import { premier, Depot } from './04-generiques.ts';
import { estPlat, messageErreur, chargerPlats } from './05-async.ts';

const plats: Plat[] = [
  romazava,
  { id: 4, nom: 'Akoho sy voanio', prix: '7500.00', disponible: false, categorie: null },
  { id: 6, nom: 'Lasopy', prix: '3000.00', disponible: true, categorie: null },
];

let reussis = 0;
let total = 0;
async function verifier(nom: string, test: () => boolean | Promise<boolean>): Promise<void> {
  total++;
  let ok = false;
  try { ok = await test(); } catch { ok = false; }
  console.log(`  ${ok ? '✓' : '✗'} ${nom}`);
  if (ok) reussis++;
}

await verifier('01 prixAvecService', () => Math.round(prixAvecService(6000, 0.1)) === 6600);
await verifier('02 libelleStatut', () => libelleStatut('payee') === 'Payée' && libelleStatut('en_attente') === 'En attente');
await verifier('03 formatPrix', () => formatPrix(500) === '500 Ar' && formatPrix(2, '€') === '2 €');
await verifier('03 rechercher', () =>
  rechercher(plats, 'O').length === 3 && rechercher(plats, 'o', true).length === 2);
await verifier('03 versNombre', () => versNombre('6000.00') === 6000 && versNombre(12) === 12);
await verifier('04 premier', () => premier(plats)?.nom === 'Romazava' && premier([]) === undefined);
await verifier('04 Depot', () => {
  const depot = new Depot<Plat>();
  plats.forEach((p) => depot.ajouter(p));
  const copie = depot.tous();
  copie.pop();
  return depot.trouver(6)?.nom === 'Lasopy' && depot.trouver(99) === undefined && depot.tous().length === 3;
});
await verifier('05 estPlat', () => estPlat(romazava) && !estPlat({ id: '1', nom: 'X', prix: '1' }) && !estPlat(null));
await verifier('05 messageErreur', () => messageErreur(new Error('boum')) === 'boum' && messageErreur(42) === 'Erreur inconnue');
await verifier('05 chargerPlats', async () => {
  const liste = await chargerPlats(async () => [romazava, { nom: 'cassé' }, 12]);
  const vide = await chargerPlats(async () => ({ message: 'pas un tableau' }));
  return liste.length === 1 && vide.length === 0;
});

console.log(`\n${reussis} / ${total} vérifications réussies`);
