# TP Gargote Mobile — Partie 2 : de JavaScript à TypeScript

Votre application de la partie 1 fonctionne. Dans cette partie, vous allez :

1. **constater les limites** de JavaScript sur cinq incidents réalistes (fiche 05) ;
2. **apprendre TypeScript** sur des exercices isolés (fiche 06) ;
3. **migrer votre application** en TypeScript (fiche 07) ;
4. **écrire une nouvelle fonctionnalité** directement en TypeScript (fiche 08).

Cette archive accompagne le deck **« Partie 2 — De JavaScript à TypeScript »**.

## Installation : à décompresser DANS votre dossier de la partie 1

Cette archive contient un dossier `tp-partie2/`, qui reprend la structure de `tp-partie1/`.
**Copiez son contenu dans votre dossier `tp-partie1/`**, en acceptant la fusion des dossiers :
les nouveaux fichiers s'ajoutent à côté des vôtres, et votre dossier `app/` n'est pas touché.
Si votre système demande de remplacer `exercices/package.json` ou des fichiers de `api/`,
acceptez : ce sont des versions mises à jour pour la partie 2.

Après décompression, vous devez avoir :

```
tp-partie1/
├── README.md               (partie 1)
├── README-partie2.md       ce fichier
├── api/                    la mini-API (avec le mode --v2 utilisé en fiche 05)
├── app/                    VOTRE application de la partie 1
├── app-reference/          application de référence (fin de fiche 04), voir plus bas
└── exercices/
    ├── js/                 (partie 1)
    └── ts/                 mini-cours TypeScript (fiche 06)
```

Les fiches de la partie 2 se trouvent à part, dans `fiche-partie2/`. Chaque dossier
`fiche-partie-NN` (de 05 à 08) contient le support de cours (Word), la fiche de TP
(Markdown) et le modèle de réponses `REPONSES-NN.md` de cette fiche :

```
fiche-partie2/
├── fiche-partie-05/   Cours_fiche_05_….docx · 05-les-problemes.md · REPONSES-05.md
├── fiche-partie-06/   …
├── fiche-partie-07/   …
└── fiche-partie-08/   …
```

Vérifiez ensuite que tout est en ordre :

```bash
git status               # votre dernier commit est celui de la fiche 04
git add . && git commit -m "ajout partie 2"
```

### Vous n'avez pas terminé la partie 1 ?

Le dossier `app-reference/` contient une application qui correspond à la fin de la
fiche 04. Si la vôtre ne fonctionne pas, remplacez votre dossier `app/` par une copie
de `app-reference/`, puis faites un commit. Les fiches 05 à 08 supposent une application
complète et fonctionnelle.

## Lancer le projet

Comme en partie 1 : `npm start` dans `api/`, puis `npm run dev` dans `app/`.

Pour la fiche 06 :

```bash
cd exercices
npm install              # installe TypeScript (une seule fois)
npm run ts
```

## Les fiches

| Section du deck | Fiche | Contenu | Durée indicative |
|---|---|---|---|
| 3 · Les problèmes | 05 | Cinq incidents à reproduire | 1 h |
| 4 · TypeScript | 06 | Mini-cours TypeScript : exercices guidés | 1 h 30 |
| 5 · Migration | 07 | Migration de l'application en TypeScript | 2 h |
| 6 · Écrire du neuf | 08 | Nouvelle fonctionnalité en TypeScript (+ bonus Android) | 2 h |

Android Studio n'est nécessaire que pour le bonus de la fiche 08.

## Règles

- Chaque fiche se termine par des **questions** : répondez-y dans le fichier `REPONSES-NN.md` du dossier de la fiche.
- Un **commit à la fin de chaque fiche**. La fiche 07 se fait sur une branche dédiée.
- Les tableaux de `REPONSES-05.md` et `REPONSES-07.md` sont faits pour être comparés :
  remplissez-les avec soin.
