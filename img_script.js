function place_images(x) {
    var div = document.getElementById("pictures");

    div.innerHTML = ""; // clear images

    var list = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE',
                'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LA',
                'LAC', 'LV', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI',
                'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS']

    for (counter=0;counter<x;counter++) {
        var imagem=document.createElement("img");
        imagem.src="./logos/"+list[counter]+".png";
        imagem.width = 46
        imagem.height = 46
        div.appendChild(imagem);
    }
}

window.onload = function() {
    place_images(32);
}