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

📦 📖 Les microservices et leur rôle
| Service            | Description                                                                                                                                                                             |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API Gateway**    | C’est l’entrée unique vers le système. Il gère les routes REST et GraphQL. Il communique avec les autres services via gRPC                                                              |
| **Player Service** | Gère les CRUD de joueurs. Stocke les joueurs dans MongoDB. Expose des méthodes gRPC : `GetPlayer`, `CreatePlayer`                                                                       |
| **Match Service**  | Gère les CRUD des matchs. Chaque match contient les noms des équipes, les logos, la date et les joueurs associés. Expose des méthodes gRPC : `GetMatch`, `CreateMatch`, `GetAllMatches` |
| **Score Service**  | Permet d’ajouter un score (goal). Lorsqu’un score est ajouté, il publie un événement Kafka (`score-events`) et stocke le score en BDD                                                   |
| **Score Consumer** | Écoute les événements Kafka (`score-events`) et affiche en live dans la console les détails du but                                                                                      |
| **Frontend**       | Une page web Bootstrap + JS qui récupère les matchs et scores via API Gateway et les affiche en live avec animation de score                                                            |

📖 📌 Relations entre services et communications
| Source                       | Vers                      | Type de communication |
| :--------------------------- | :------------------------ | :-------------------- |
| Frontend → API Gateway       | REST & GraphQL            |                       |
| API Gateway → Player Service | gRPC                      |                       |
| API Gateway → Match Service  | gRPC                      |                       |
| API Gateway → Score Service  | gRPC                      |                       |
| Score Service → Kafka        | Événements `score-events` |                       |
| Score Consumer → Kafka       | Consommation des events   |                       |
📦 📖 Les fichiers et dossiers par service
📂 API Gateway
/src/server.js → serveur principal Express + Apollo GraphQL

/src/routes/ → routes REST :

playerRoutes.js

matchRoutes.js

scoreRoutes.js

/src/grpc/ → clients gRPC :

client.js (pour Player)

matchClient.js (pour Match)

scoreClient.js (pour Score)

/proto/ → les fichiers proto

📂 Player Service
/src/grpc/server.js → serveur gRPC

/src/grpc/playerService.js → implémentation des méthodes gRPC

/src/models/playerModel.js → modèle Mongoose pour MongoDB

/proto/player.proto

📂 Match Service
/src/grpc/server.js → serveur gRPC

/src/grpc/matchService.js → méthodes gRPC

/src/models/matchModel.js → modèle Mongoose

/proto/match.proto

📂 Score Service
/src/grpc/server.js → serveur gRPC

/src/grpc/scoreService.js → méthodes gRPC + publication Kafka

/src/models/scoreModel.js → modèle Mongoose

/src/kafka/producer.js → publication Kafka

/proto/score.proto

📂 Score Consumer
/src/consumer.js → Kafka Consumer qui écoute score-events

📂 Frontend
/index.html

/css/styles.css → design des cartes et animations score

/js/app.js → fetch des matchs et scores via API Gateway, affichage dynamique, effet live

📖 📌 Kafka Topic
score-events → Topic utilisé pour transmettre les buts en live




