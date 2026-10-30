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


## Fiche 01 — Prise en main

- Q1.1 : `ion-router-outlet` sert a afficher la page courante, c'est une zone d'affichage dynamique. On en trouve deux dans le projet : dans App.vue et dans TabsPage.vue car dns App.vue on trouve la racine obligatoire de toute application Ionic et dans TabsPage.vue on trouve le bar/menu qu'on voit en bas de l'ecran.
- Q1.2 : Quand IonNote n'etait plus importe, j'ai juste remarque 'hot updated' dans la console.
- Q1.3 : `platsFiltres` est une propriété calculée plutôt qu'une fonction appelée dans le template ou une seconde variable `ref` puisque c'est une valeur calculee qui depend d'une valeur reactive d'ou l'utilisation adapte de computed.
- Q1.4 : le slot `fixed` sur `ion-refresher permet de positionner de maniere correcte (par Ionic) le rafraichissement.


## Fiche 02 — Navigation

- Q2.1 : La suite des messages observes:
    - MENU ionViewWillEnter MenuPage.vue:119:34
    - MENU onMounted MenuPage.vue:117:25
    - MENU ionViewDidLeave MenuPage.vue:120:33
    - MENU ionViewWillEnter MenuPage.vue:119:34
    - MENU ionViewDidLeave MenuPage.vue:120:33
    - MENU ionViewWillEnter MenuPage.vue:119:34
    `onMounted` est exécuté une seule fois.
- Q2.2 : Il faudra charger les donnees dans un hook onIonViewWillEnter car ce hook est execute a chaque fois que l'user ouvre la page Commandes pour afficher une liste a jour. On n'utilise pas onMounted car il ne s'execute qu'une seule fois, les donnees ne seront pas a jour.
- Q2.3 : Différence entre `router-link` sur un `ion-item` et un simple lien `<a href>` : cote visuel -> `router-link` permet de mettre un lien sur le contenu de `ion-item` sans changement css mais `<a href>` change directement la couleur et souligne le contenu, comme on connait des liens; cote back -> `router-link` sur un `ion-item` utilise Vue Router tandis que `<a href>` est une balise classique html.


## Fiche 03 — Le panier

- Q3.1 : Si `const lignes = ref([])` était écrit **à l'intérieur** de `usePanier()`, a chaque fois qu'on appelle cette fonction, ca cree un nouveau tableau vide. Donc quand j'appelle usePanier() dans le menu, le panier est vide, et c'est la meme chose si je l'appelle dans Panier. 
- Q3.2 : Sans `.stop.prevent`, j'ai vu qu'au lieu de juste ajouter le plat au panier quand on clique sur +, c'est comme si on cliquait aussi sur le lien vers la page detail du plat en question parce qu'on va dans cette page apres le clic: 2 actions en meme temps. D'apres mes recherches, la propagation d'evenement c'est quand un evenement remonte vers ses elements parents et c'est ce qui s'est passe ici vu que le clic est remonte vers ion-item ou il y a le lien router-link.
- Q3.3 : Oui, le calcul du `total` fonctionne avec `l.plat.prix * l.quantite`. Et avec `t + l.plat.prix` pour des quantités de 1 ca ne fonctionne pas vu qu'il peut y avoir une concatenation au lieu d'une addition.


## Fiche 04 — La commande

- Q4.1 : On a besoin de convertir avec `Number(table.value)` avant l'envoi pour s'assurer que la valeur soit un nombre. `ion-input` de type `number` renvoie un String.
- Q4.2 : Dans `envoyer()`, `finally` permet de fermer l'indicateur de chargement quoi qu'il arrive (que l'envoi reussisse ou non) puisque `finally` en soi-meme s'execute toujours.
- Q4.3 : L'API vérifie-t-elle la table alors que l'application pourrait le faire pour assurer la securite des donnees. Il faut aussi verifier cote application pour mieux gerer les erreurs.