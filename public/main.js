/*  
    /!\ importer le script socket.io.js côté html

    Cette méthode fonctionne uniquement dans le cas d'une application monolythique. 
    Si front/back découplés, utiliser socket client + socket serveur
*/

let socket = null; 

function connect() {
    if(socket && socket.connected){
        console.log('déjà connecté'); 
        return; 
    }

    socket = io('http://localhost:8000');


    socket.on('connect', () => {
        console.log('Connecté avec succès');
    });

    socket.on('disconnect', () => {
        console.log('Déconnecté');
    });

    socket.on('new_user', (data) => {
        console.log('nNw user')
        console.log(data)
    })
}


window.addEventListener('load', () => {
    connect(); 
})