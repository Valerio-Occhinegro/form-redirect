# FORM REDIRECT 
Questo sistema consente il ridirezionamento dell'utenza in due google form distinti.  
L'utente che visita il link condiviso dal laureando viene trasferito su uno dei due form in base al numero di click già effettuati da altri visitatori;
se il suo accesso corrisponde ad un numero pari l'utente verrà trasferito al Form A, se il numero è dispari al Form B.  

## Tecnologie 
Il linguaggio di programmazione utilizzato per la logica del sistema è JavaScript.  
Il sito web è gestito tramite Vercel, una piattaforma ideale per pubblicare siti web di modeste dimensioni.  
Il Database viene sorretto dalla soluzione "serverless" Upstash.  
Per quanto riguarda la peristenza del dato viene utilizzata la tecnologia Redis, ossia un tipologia di Database definita "Key-Value Storage", sufficiente per contenere il numero di visite effettuate sul sito.  

## Funzionamento 
Alla visita del link viene presentata una pagina web contenente un bottone per il reindirizzamento ai form ( [landing.js](https://github.com/Valerio-Occhinegro/form-redirect/blob/main/api/landing.js) ), questa soluzione è stata utilizzata poichè consente di escludere dal conteggio delle visite i crawler bot e i precaricamenti
effettuati dalle app di messaggistica durante la condivisione dei link.
Quando il bottone viene premuto, il codice presente all'interno del file [redirect.js](https://github.com/Valerio-Occhinegro/form-redirect/blob/main/api/redirect.js) :
1. verifica la connessione al database
2. incrementa di uno il valore del "global_counter"
3. legge il contenuto della key "global_counter"
4. reindirizza l'utente in base al valore pari o dispari

Grazie a questo metodo è possibile ottenere una suddivisione che si avvicini il più possibile a un 50 e 50.
