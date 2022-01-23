![image](https://user-images.githubusercontent.com/73162047/148680206-712e5b56-5b93-4ad8-9bc1-e73331cede0f.png)

PARCOURS DEVELOPPEUR WEB - PROJECT 7  BACK-END:

_________________________________________

Créer un  réseau social d'entreprise 

_________________________________________

![image](https://user-images.githubusercontent.com/73162047/148641641-072d3c6b-a574-430f-b18f-a6ffef40eac6.png)

La mission :

Réaliser un MVP ( Produit Minimal Viable ) pour la création d’un réseau social interne, moderne et ludique, qui permettra aux employés de se connaître dans un cadre plus informel.

Les Spécifications :

https://github.com/Chris-Delarue/groupomania-app/blob/b1f8e4ddde5b2601116c4e059020c04a1b3318e0/Groupomania_Specs_FR_DWJ_VF.pdf

__________________________________________

INSTRUCTIONS
__________________________________________

* Cloner ce repositary Github git clone
	* https://github.com/Chris-Delarue/backend.git

* Database :
	* démarer votre Mysql server
	* ensuite impoter la base de donnée :
	
			/backend/groupomania.sql
	
	* créer un fichier .env dans le backend root, copier coller les informations suivantes avec vos informations dans les guillemets vides!! :
	
			TOKEN_SECRET="" ( token pour le login)
			SECRET_PHRASE="" ( crypto.js pour l'émail)
			DB_HOST="localhost"
			DB_USER="groupomania"
			DB_PASSWORD=""
			DB_DATABASE=""
			DB_PORT="3306"

* Pour créer un administrateur :

	* Allez sur la base de donnée et manuelle ajouter le chiffre 1 dans la colonne IsAdmin et cliquez sur Apply.

* Pour démarer le back :
			
			npm install
	* ensuite :
	
		* pour le developpement :
			
				nodemon server 
			
		* pour la production :
		
				node server.js 

* Bien vérifier que vous êtes connecté à la base de donnée.
			
			
		


