# Réponses — TP Gargote Mobile, partie 1 : Ionic et Vue

Nom et prénom : RATOMBONTSOA Maeva
Groupe : B

Répondez en quelques phrases, avec vos mots. Quand une question demande ce que
vous avez observé, décrivez ce que vous avez réellement vu à l'écran ou dans la console.

## Fiche 00 — Diagnostic JavaScript

Score obtenu à `npm run js` : 6 / 6
  ✓ 1. Déstructuration
  ✓ 2. Spread et immutabilité
  ✓ 3. Filter et map
  ✓ 4. Reduce
  ✓ 5. find, ?. et ??
  ✓ 6. async / await

- Q0.1 : Mes predictions: A -> 6000.001000.00; B -> 6000.006000.00; C -> Inconnue, D -> aucun; E -> 0. Les resultats: A -> 6000.001000.00; B -> 12000; C -> Inconnue, D -> aucun; E -> 0. C'est la reponse B qui etaient fausses, j'ai cru que ca suivait la meme logique que A etant donne que c'est un String mais en fait non.
- Q0.2 : L'exercice 4 aurait donne un resultat faux sans `Number(...)` car il pourrait y avoir une concatenation au lieu d'un calcul numerique dans certains cas.
- Q0.3 : Pour l'exercice 6, si on oublie le mot `await` devant `chargerPlats()`, il y a cette erreur `reçu {"erreur":null}, attendu {"nombre":4,"erreur":null}` dans le terminal. A ce que je crois ca veut dire que la valeur de la variable via la fonction n'est pas recu.