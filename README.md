# ⚽ Microservices Football Platform

Une plateforme de gestion de matchs de football en architecture microservices, permettant de gérer :
- des joueurs
- des matchs (avec logos et joueurs associés)
- des scores en live avec affichage dynamique

Le tout avec **Node.js**, **gRPC**, **REST**, **GraphQL**, **Kafka** et **MongoDB**.

---

## 📌 📋 Fonctionnalités

✅ Création et consultation de joueurs via REST et gRPC  
✅ Création et consultation de matchs (avec logos et joueurs) via REST et gRPC  
✅ Ajout de scores liés à un match et un joueur via REST et gRPC  
✅ Communication événementielle avec Kafka sur les buts marqués  
✅ Kafka Consumer en live pour les scores  
✅ Frontend Bootstrap responsive avec affichage en live des scores et buteurs  
✅ GraphQL pour récupérer les joueurs et matchs (API Gateway)

---

## 📦 📋 Architecture technique

- **API Gateway** : centralise les routes REST et GraphQL  
- **Player Service** : gère les joueurs  
- **Match Service** : gère les matchs  
- **Score Service** : gère les scores + Kafka  
- **Kafka** : bus d'événements pour les goals  
- **Score Consumer** : écoute les événements Kafka `score-events`  
- **MongoDB** : base de données pour chaque service  
- **Frontend** : Bootstrap + Vanilla JS avec scores live

---

## 📌 📋 Technologies utilisées

- Node.js  
- Express  
- Apollo Server (GraphQL)  
- gRPC via `@grpc/grpc-js`  
- KafkaJS  
- MongoDB + Mongoose  
- Bootstrap  
- Vanilla JS

---

## 📌 📋 Installation et lancement

### 🔧 Prérequis
- Node.js
- MongoDB
- Kafka + Zookeeper

### 📥 Installer les dépendances
Dans chaque dossier de service et API Gateway :
```bash
npm install


Démarrer Zookeeper :
bin/windows/zookeeper-server-start.bat config/zookeeper.properties
Démarrer Kafka :
bin/windows/kafka-server-start.bat config/server.properties

# API Gateway
node src/server.js

# Player Service
node src/grpc/server.js

# Match Service
node src/grpc/server.js

# Score Service
node src/grpc/server.js

Lancer le frontend :
Depuis le dossier frontend :
serve .

| Méthode | URL              | Description                           |
| :------ | :--------------- | :------------------------------------ |
| GET     | /api/player/\:id | Récupérer un joueur                   |
| POST    | /api/player      | Ajouter un joueur                     |
| GET     | /api/match/\:id  | Récupérer un match                    |
| POST    | /api/match       | Ajouter un match                      |
| POST    | /api/score       | Ajouter un score                      |
| GET     | /api/all-matches | Récupérer tous les matchs avec scores |
| GET     | /api/all-scores  | Récupérer tous les scores             |


