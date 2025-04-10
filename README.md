# ibis-project

L'entreprise KekebonKekepabon, spécialisée en conseil en nutrition, souhaite ajouter à son site une
fonctionnalité permettant aux utilisateurs de consulter des recettes via une API. 

Votre agence a été retenue pour développer un POC intégrant cette fonctionnalité sur leur site. L'API choisie est
"TheMealBD", qui permet de rechercher des recettes par catégorie, pays, ingrédients ou de manière
aléatoire. L’appel proprement dit est réalisé à partir de l’URL :

www.themealdb.com/api/json/v1/1/<<action>>

où <<action>> est l’une des fonctionnalités disponibles de l’API, éventuellement accompagnée d’un
paramètre (voir ressource : notice de l’API theMealDB)

USER STORIES :

1-L’utilisateur pourra choisir indifféremment depuis la page d’accueil

• Une catégorie de recette (par liste déroulante)

• Un ingrédient (par son nom)

• Un pays (par liste déroulante)

2-A l’issu de ce choix, une liste de recettes sera affichée. L’utilisateur pourra sélectionner une recette
en particulier.

3- A l’issu de ce choix, on affiche la liste des ingrédients, les liste d’instruction, l’image du plat
correspondant à la recette choisie.

4-Une zone donnant les informations/photo sur l’un des ingrédients s’affiche au survol de la souris
sur l’ingrédient.

CONTRAINTES TECHNIQUES :

Vous vous s’inspirerez de la charte graphique de l’entreprise pour la réalisation du POC. (voir
ressource : charte graphique)

L’API sera consommée par des requêtes HTTP/GET par la méthode (API) fetch. (voir ressource :
Ressources : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
https://fr.javascript.info/async-await )

Chaque fonctionnalité (recherche par catégories, recherche par ingrédients, etc.)sera isolée dans des
fonctions spécifiques.

Les appels à l’API sont asynchrones (await/async) pour les fonctions d’appelet (promises/then) pour
les fonctions non-asynchrones qui incluent des fonctions d’appel asynchrones.

Vous identifierez et traiterez tous les cas d’erreur.
Il n’est pas demandé de traduire les textes en français pour le POC.

L’application est pensée SPA, responsive, dans une approche mobile first. La présentation d’une
maquette sera un plus.

BONUS :
Pour chaque recette : afficher le drapeau du pays en consommant une API pays/drapeau
(flagapi.com par exemple ou une autre à votre convenance)
