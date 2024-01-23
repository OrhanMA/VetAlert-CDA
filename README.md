# Vet'Alert

## Contexte du projet

Vet'Alert est un projet réalisé pendant ma formation de Concepteur et développeur d'applications web (CDA) à [Simplon Grenoble](https://simplon.co).

Ce projet était une introduction dont le but était de montrer ce qu'on savait faire en réalisant en 4 jours une mini application web ayant pour thème la gestion des vaccinations d'animaux pour un vétérinaire.

Pour réaliser ce projet, j'ai décidé d'utiliser le framework [Next.js](https://nextjs.org/), qui est la façon la plus populaire de travailler avec React ces dernières années. J'ai décidé d'utiliser l'App router, un changement drastique dans le paradigme de Next.js, pour pouvoir apprendre ses dernières fonctionnalités.

## Installation du projet

### Prérequis

Pour installer le projet, il faut:

- Un compte Clerk (gratuit et avec un free-tier de 10 000 utilisateurs actifs)
- MySQL
- Node.js
- Npm

### 1. Cloner le projet

```
git clone git@github.com:OrhanMA/VetAlert.git
```

### 2. Installer les dépendances

```
cd vetalert/
npm install
```

### 3. Renseigner vos informations MYSQL et Clerk auth

```
mv .env.example .env.local
```

Dans votre fichier .env.local, renseigner vos clés secrêtes Clerk et vos credentials MySQL

### 4. Créer la base de donnés SQL

Exécutez le script SQL du fichier tables.sql (présent dans la racine du projet) dans votre nouvelle base de données.

Vous pouvez utiliser PhpMyAdmin pour vous simplifier la tâche.

### 5. Lancer le projet

```
npm run build
npm run start
```

OU lancez le projet en mode développement avec

```
npm run dev
```

Rendez-vous sur http://localhost:3000/ pour essayer l'application.

## Stack Technique / outils

Autres outils utilisés:

- [Next.js](https://nextjs.org/)
- [MySQL](https://www.mysql.com/fr/)
- [MySQL driver pour Node.js:](https://www.npmjs.com/package/mysql)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/)
- [Clerck auth](https://clerk.com/)
- [Formik, a way to work with React forms easily](https://formik.org/docs/overview)
- [Date-fns, modern Javascript data utility](https://date-fns.org/)

Crédits:

- Photo unsplash: [Sdf Rahbar](https://unsplash.com/fr/photos/chien-brun-et-blanc-recouvert-dune-couverture-verte-et-blanche-XMla4ZtB-BU) chiots qui dort sous des vêtements
- Favicon dog: https://favicon.io/emoji-favicons/dog/
