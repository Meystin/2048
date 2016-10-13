function puissance(nmb) {
    var counter = 0;
    if (nmb != 0) {
        do {
            nmb = nmb / 2;
            counter++;
        } while (nmb != 0);
        return counter - 1075;
    }
    else return 0;
}

function makeImageSrc() {
    var pic = [];
    for (var i = 0; i < 17; i++) {
        var img = new Image();
        var n = Math.floor(Math.pow(2, i));
        if (i === 0) n = 0;
        img.src = "img/" + n + ".png";
        pic.push(img);
    }
    return pic;
}

var tampon;
var matrice = function () {
    this.deplacement = 0;
    this.affichage = function () {
        var c = document.getElementById("mcanvas");
        var ctx = c.getContext("2d");
        var pic = makeImageSrc();
	var taille=document.documentElement.clientHeight;
	taille=taille/4.7;
	var espace=taille/10;
	var centre=(document.documentElement.clientWidth/2)-(2*taille+espace);
        for (var ligne = 0; ligne < 4; ligne++) {
            for (var colonne = 0; colonne < 4; colonne++) {
                ctx.drawImage(pic[puissance(jeu.map[colonne][ligne])], taille * colonne+espace+ centre, taille * ligne, taille-espace, taille-espace);
            }
        }
    }
    this.clean =function ()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

    this.aleatoire = function () {
        var test = false;
        for (var ligne = 0; ligne < 4; ligne++) {
            for (var colonne = 0; colonne < 4; colonne++) {
                if (this.map[colonne][ligne] == 0) {
                    test = true;
                }
            }
        }
        if (test) {
            do {
                var ligne = Math.floor(Math.random() * 4);
                var colonne = Math.floor(Math.random() * 4);
            } while (this.map[colonne][ligne] != 0);
            var valeur = Math.floor((Math.random() * 2) + 1);
            this.map[colonne][ligne] = 2 * valeur;
        }
    }
}

var jeu = new matrice();
jeu.map = new Array([0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]);

window.onload = function (){
var canvas= document.getElementById("mcanvas");
canvas.width= document.documentElement.clientWidth*0.9375;
canvas.height= document.documentElement.clientHeight*0.8305;
jeu.affichage();
}

function verification() {
    var verif = false;
    var fin = false;
    for (var ligne = 0; ligne < 4; ligne++) {
        for (var colonne = 0; colonne < 4; colonne++) {
            if (colonne < 3 && ligne < 3) {
                if (jeu.map[colonne + 1][ligne] == jeu.map[colonne][ligne] || jeu.map[colonne][ligne + 1] == jeu.map[colonne][ligne]) {
                    verif = true;
                }
            }
            if (colonne > 0 && ligne > 0) {
                if (jeu.map[colonne][ligne - 1] == jeu.map[colonne][ligne] || jeu.map[colonne - 1][ligne] == jeu.map[colonne][ligne]) {
                    verif = true;
                }
            }
            if (jeu.map[colonne][ligne] == 0) {
                verif = true;
            }
            if (jeu.map[colonne][ligne] == 2048) {
                fin = true;
                alert('felicitation, vous avez gagne. Vous pouvez continuer ou appuyer sur F5');
            }
        }
    }
    if (!verif) {
        alert('Vous n avez plus de mouvement possible, vous avez le choix entre fermer la fenetre ou appuyer sur F5 pour recommencer');
    }
}

document.addEventListener('keyup', function () {
    jeu.deplacement = event.keyCode;
    if ((jeu.deplacement > 36 && jeu.deplacement < 41) || jeu.deplacement==116) {
        if (jeu.deplacement == 37) {
            for (var ligne = 0; ligne < 4; ligne++) {
                tampon = 0;
                for (var colonne = 0; colonne < 4; colonne++) {
                    if (jeu.map[colonne][ligne] != 0) {
                        jeu.map[tampon][ligne] = jeu.map[colonne][ligne];
                        if (tampon > 0) {
                            if (jeu.map[tampon - 1][ligne] == jeu.map[tampon][ligne]) {
                                jeu.map[tampon - 1][ligne] = jeu.map[tampon][ligne] * 2;
                                jeu.map[tampon][ligne] = 0;
                            }
                            else tampon++;
                        }
                        else tampon++;
                    }
                }
                for (; tampon < 4; tampon++) {
                    jeu.map[tampon][ligne] = 0;
                }
            }
        }

        if (jeu.deplacement == 38) {
            for (var colonne = 0; colonne < 4; colonne++) {
                tampon = 0;
                for (var ligne = 0; ligne < 4; ligne++) {
                    if (jeu.map[colonne][ligne] != 0) {
                        jeu.map[colonne][tampon] = jeu.map[colonne][ligne];
                        if (tampon > 0) {
                            if (jeu.map[colonne][tampon - 1] == jeu.map[colonne][tampon]) {
                                jeu.map[colonne][tampon - 1] = jeu.map[colonne][tampon] * 2;
                                jeu.map[colonne][tampon] = 0;
                            }
                            else tampon++;
                        }
                        else tampon++;
                    }
                }
                for (; tampon < 4; tampon++) {
                    jeu.map[colonne][tampon] = 0;
                }
            }
        }

        if (jeu.deplacement == 39) {
            for (var ligne = 0; ligne < 4; ligne++) {
                tampon = 3;
                for (var colonne = 3; colonne > -1; colonne--) {
                    if (jeu.map[colonne][ligne] != 0) {
                        jeu.map[tampon][ligne] = jeu.map[colonne][ligne];
                        if (tampon < 3) {
                            if (jeu.map[tampon + 1][ligne] == jeu.map[tampon][ligne]) {
                                jeu.map[tampon + 1][ligne] = jeu.map[tampon][ligne] * 2;
                                jeu.map[tampon][ligne] = 0;
                            }
                            else tampon--;
                        }
                        else tampon--;
                    }
                }
                for (; tampon > -1; tampon--) {
                    jeu.map[tampon][ligne] = 0;
                }
            }
        }

        if (jeu.deplacement == 40) {
            for (var colonne = 0; colonne < 4; colonne++) {
                tampon = 3;
                for (var ligne = 3; ligne > -1; ligne--) {
                    if (jeu.map[colonne][ligne] != 0) {
                        jeu.map[colonne][tampon] = jeu.map[colonne][ligne];
                        if (tampon < 3) {
                            if (jeu.map[colonne][tampon + 1] == jeu.map[colonne][tampon]) {
                                jeu.map[colonne][tampon + 1] = jeu.map[colonne][tampon] * 2;
                                jeu.map[colonne][tampon] = 0;
                            }
                            else tampon--;
                        }
                        else tampon--;
                    }
                }
                for (; tampon > -1; tampon--) {
                    jeu.map[colonne][tampon] = 0;
                }
            }
        }
        jeu.clean();
        jeu.aleatoire();
        jeu.affichage();
        verification();

    }

    else alert("je vous conseille d'appuyer sur les fleches du claviers");
});